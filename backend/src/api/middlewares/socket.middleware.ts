import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';

export const socket = (io: Server) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    req.io = io;
    next();
  };
};
