import { Types } from 'mongoose';
import { Server } from 'socket.io';
import { HttpError } from '../exceptions';
import { MAX_USERS_IN_ROOM } from '../common/constants';
import {
  HttpCode,
  HttpErrorMessage,
  RoomType,
  SocketEvents,
} from '../common/enums';
import { ILink, IRoomUser, IText, IUser } from '../common/interfaces';
import {
  roomsRepository,
  textsRepository,
  usersRepository,
} from '../data/repositories';
import { env } from '../env';

export const getText = async (roomId: string): Promise<IText> => {
  const room = await roomsRepository.getOne({ _id: roomId });
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  if (!room.textId) {
    const text = await textsRepository.getOneRandom();
    await roomsRepository.updateOne({ _id: roomId }, { textId: text._id });
    return text;
  }
  return await textsRepository.getOne({ _id: room.textId });
};

export const getShareLink = async (roomId: string): Promise<ILink> => {
  const room = await roomsRepository.getOne({ _id: roomId });
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  return { link: `${env.app.url}/game/${roomId}` };
};

export const deleteText = async (roomId: string): Promise<void> => {
  const room = await roomsRepository.getOne({ _id: roomId });
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  if (room.textId) {
    await roomsRepository.updateOne({ _id: roomId }, { textId: null });
  }
};

export const addUser = async (
  { roomId, userId }: IRoomUser,
  io: Server,
): Promise<Omit<IUser, 'email'>> => {
  const room = await roomsRepository.getOne({ _id: roomId });
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  if (room.type === RoomType.PERSONAL && roomId !== userId) {
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
  await roomsRepository.updateOne(
    { _id: roomId },
    { users: [...room.users, new Types.ObjectId(userId)] },
  );
  const user = await usersRepository.getOne({ _id: userId });
  const { _id, fullName, avatar } = user;
  const userInfo = {
    id: _id,
    fullName,
    avatar,
  };
  io.to(roomId).emit(SocketEvents.ADD_PARTICIPANT, userInfo);
  return userInfo;
};

export const deleteUser = async (
  { roomId, userId }: IRoomUser,
  io: Server,
): Promise<void> => {
  const room = await roomsRepository.getOne({ _id: roomId });
  if (!room) {
    return;
  }
  const users = room.users.filter((user) => {
    return user.toString() !== userId;
  });
  if (users.length || room.type === RoomType.PERSONAL) {
    await roomsRepository.updateOne({ _id: roomId }, { users });
    io.to(roomId).emit(SocketEvents.REMOVE_PARTICIPANT, { userId });
  } else if (room.type !== RoomType.PERSONAL) {
    await roomsRepository.removeOne({ _id: roomId });
    io.emit(SocketEvents.DELETE_ROOM, { roomId });
  }
};

export const getRoomUsers = async (
  id: string,
): Promise<Omit<IUser, 'email'>[]> => {
  const roomId = new Types.ObjectId(id);
  const room = await roomsRepository.getOneWithUsers(roomId);
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  return room.usersInfo.map(({ _id, ...info }) => ({ id: _id, ...info }));
};
