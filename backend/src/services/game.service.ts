import { Server } from 'socket.io';
import { HttpError } from 'common/exceptions';
import { MAX_USERS_IN_ROOM } from 'common/constants';
import {
  HttpCode,
  HttpErrorMessage,
  RoomType,
  SocketEvents,
} from 'common/enums';
import {
  IGameLink,
  IRoomUser,
  IGameText,
  IUser,
  IJoke,
} from 'common/interfaces';
import { roomsRepository, usersRepository } from 'data/repositories';
import { env } from 'env';
import { getRandomDescription, getRandomJoke } from 'common/utils';

export const getText = async (roomId: number): Promise<IGameText> => {
  const room = await roomsRepository.getById(roomId);
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  if (room.text) {
    return { text: room.text };
  } else {
    const text = await getRandomDescription();
    await roomsRepository.patchById(roomId, text);
    return text;
  }
};

export const getShareLink = async (roomId: number): Promise<IGameLink> => {
  const room = await roomsRepository.getById(roomId);
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  const link = `${env.app.url}/game/${roomId}`;
  return { link };
};

export const getRoomUsers = async (roomId: number): Promise<IUser[]> => {
  return usersRepository.getUsersByRoomId(roomId);
};

export const deleteText = async (roomId: number): Promise<void> => {
  const room = await roomsRepository.getById(roomId);
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  if (room.text) {
    await roomsRepository.patchById(roomId, { text: null });
  }
};

export const addUser = async (
  { roomId, userId }: IRoomUser,
  io: Server,
): Promise<void> => {
  const room = await roomsRepository.getWithUsersById(roomId);
  if (!room) {
    return;
  }
  const user = await usersRepository.getById(userId);
  if (!user) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  if (room.type === RoomType.PERSONAL && roomId !== user.personalRoomId) {
    throw new HttpError({
      status: HttpCode.FORBIDDEN,
      message: HttpErrorMessage.JOIN_PERSONAL_ROOM,
    });
  } else if (room.users.length >= MAX_USERS_IN_ROOM) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.MAX_COUNT_OF_USERS,
    });
  }
  await usersRepository.patchById(userId, { currentRoomId: roomId });
  io.to(String(roomId)).emit(SocketEvents.ADD_PARTICIPANT, user);
};

export const deleteUser = async (
  { roomId, userId }: IRoomUser,
  io: Server,
): Promise<void> => {
  const room = await roomsRepository.getWithUsersById(roomId);
  if (!room) {
    return;
  }
  await usersRepository.patchById(userId, { currentRoomId: null });
  io.to(String(roomId)).emit(SocketEvents.REMOVE_PARTICIPANT, { userId });
  if (!room.users.length && room.type !== RoomType.PERSONAL) {
    await roomsRepository.removeById(roomId);
    io.emit(SocketEvents.DELETE_ROOM, { roomId });
  }
};

export const getJoke = async (): Promise<IJoke> => {
  return getRandomJoke();
};
