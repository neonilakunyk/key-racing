import { Request } from 'express';
import { Server } from 'socket.io';

interface IRequestWithSocket extends Request {
  io: Server;
}

export type { IRequestWithSocket };
