import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';
import { IRequestWithSocket } from 'common/interfaces';

export const socket = (io: Server) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    req = { ...req, io } as IRequestWithSocket;
    next();
  };
};
