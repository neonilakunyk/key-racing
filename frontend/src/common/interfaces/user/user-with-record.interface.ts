import { IUser } from './user.interface';

interface IUserWithRecord extends Omit<IUser, 'email'> {
  record: number;
}

export type { IUserWithRecord };