import { Socket, Server } from 'socket.io';
import { IRoomAction, IUserRoomAction } from '../common/interfaces';
import { SocketEvents } from '../common/enums';

export const getSocketHandlers =
  (io: Server) =>
    (socket: Socket): void => {
      socket.on(SocketEvents.JOIN_ROOM, async ({ roomId }: IRoomAction) => {
        await socket.join(roomId);
      });

      socket.on(SocketEvents.LEAVE_ROOM, async ({ roomId }: IRoomAction) => {
        await socket.leave(roomId);
      });

      socket.on(
        SocketEvents.TOGGLE_ME_IS_READY,
        async ({ roomId, userId }: IUserRoomAction) => {
          io.to(roomId).emit(SocketEvents.TOGGLE_PARTICIPANT_IS_READY, {
            userId,
          });
        },
      );

      socket.on(
        SocketEvents.INCREASE_ME_POSITION,
        async ({ userId, roomId }: IUserRoomAction) => {
          io.to(roomId).emit(SocketEvents.INCREASE_PARTICIPANT_POSITION, {
            userId,
          });
        },
      );
    };
