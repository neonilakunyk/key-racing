import { IRoomAction, IUserAction } from 'key-racing-shared/interfaces';

interface IUserRoomAction extends IRoomAction, IUserAction {}

export type { IUserRoomAction };
