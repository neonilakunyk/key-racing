import { IRoomAction } from './room-action.interface';
import { IUserAction } from './user-action.interface';

interface IUserRoomAction extends IRoomAction, IUserAction {}

export { IUserRoomAction };
