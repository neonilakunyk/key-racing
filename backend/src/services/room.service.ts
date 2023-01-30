import { Server } from 'socket.io';
import { RoomType, SocketEvents } from '../common/enums';
import { IRoom, IRoomCreation, IRoomShare } from '../common/interfaces';
import { roomsRepository, usersRepository } from '../data/repositories';
import { HttpErrorMessage, HttpCode } from '../common/enums';
import { HttpError } from '../exceptions';
import { sendMail } from '../common/utils';

export const getRoom = async (roomId: string): Promise<IRoom> => {
  const room = await roomsRepository.getOne({ _id: roomId });
  if (!room) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_ROOM_WITH_SUCH_ID,
    });
  }
  const { name, type, _id } = room;
  return { name, type: type as RoomType, id: _id };
};

export const getRooms = async (): Promise<IRoom[]> => {
  const rooms = await roomsRepository.getAvailable();
  return rooms.map(({ name, type, _id }) => ({
    name,
    type: type as RoomType,
    id: _id,
  }));
};

export const create = async (
  data: IRoomCreation,
  io: Server,
): Promise<IRoom> => {
  const isNameUsed = await roomsRepository.getOne({ name: data.name });
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

  const { name, type, _id } = room;

  if (type === RoomType.PUBLIC) {
    io.emit(SocketEvents.CREATE_ROOM, { name, id: _id });
  }

  return { name, id: _id };
};

export const shareLinkByEmails = async (
  body: IRoomShare,
  userId: string,
): Promise<void> => {
  const user = await usersRepository.getOne({ _id: userId });
  await sendMail({
    to: body.emails,
    subject: `${user.fullName} shared an Key Racing room with you`,
    text: body.link,
  });
};
