import { IUser } from '../user/user';

interface IParticipant extends Omit<IUser, 'email'> {
  position: number;
  isReady: boolean;
  spentSeconds: number;
}

export type { IParticipant };
