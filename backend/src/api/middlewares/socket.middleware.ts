import { NextFunction, Response } from 'express';
import { Server } from 'socket.io';
import { IRequestWithSocket } from '../../common/interfaces/socket';

export const socket =
  (io: Server) =>
    (req: IRequestWithSocket, _: Response, next: NextFunction): void => {
      req.io = io;
      next();
    };
