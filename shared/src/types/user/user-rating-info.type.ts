import { IUser } from '../../interfaces';

type UserRatingInfo = Pick<IUser, 'fullName' | 'photoUrl' | 'record' | 'id'>;

export type { UserRatingInfo };
