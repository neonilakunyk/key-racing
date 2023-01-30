import { Request } from 'express';
import { Server } from 'socket.io';

export interface IRequestWithSocket extends Request {
  io?: Server;
}
