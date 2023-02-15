import { IRoom } from 'key-racing-shared/interfaces';
import { IUser } from '../user';

interface IRoomWithUsers extends IRoom {
  users: IUser[];
}

export type { IRoomWithUsers };
