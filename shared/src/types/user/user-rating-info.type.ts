import { IUser } from '../../interfaces';

type UserRatingInfo = Pick<IUser, 'fullName' | 'photoUrl' | 'record'>;

export type { UserRatingInfo };
