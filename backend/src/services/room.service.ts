import { Server } from 'socket.io';
import { RoomType, SocketEvents } from 'common/enums';
import { IRoom, IRoomCreation, IRoomShare, IUser } from 'common/interfaces';
import { roomsRepository, usersRepository } from 'data/repositories';
import { HttpErrorMessage, HttpCode } from 'common/enums';
import { HttpError } from 'common/exceptions';
import { sendMail } from 'common/utils';

export const getRooms = async (): Promise<IRoom[]> => {
  return roomsRepository.getAvailable();
};

export const getRoom = async (roomId: number): Promise<IRoom> => {
  const room = await roomsRepository.getById(roomId);
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  return room;
};

export const create = async (
  data: IRoomCreation,
  io: Server,
): Promise<IRoom> => {
  const isNameUsed = await roomsRepository.getByName(data.name);
  if (isNameUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.ROOM_ALREADY_EXISTS,
    });
  }

  const room = await roomsRepository.create({
    name: data.name,
    type: data.type,
  });

  if (room.type === RoomType.PUBLIC) {
    io.emit(SocketEvents.CREATE_ROOM, room);
  }

  return room;
};

export const shareLinkByEmails = async (
  body: IRoomShare,
  userId: number,
): Promise<void> => {
  const user = await usersRepository.getById(userId);
  if (!user) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  const { emails, link } = body;
  await sendMail({
    to: emails,
    subject: `${user.fullName} shared an Key Racing room with you`,
    text: link,
  });
};

export const getRoomUsers = async (roomId: number): Promise<IUser[]> => {
  return usersRepository.getUsersByRoomId(roomId);
};
