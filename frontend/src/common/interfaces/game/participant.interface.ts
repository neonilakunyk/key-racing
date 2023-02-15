import { IUser } from '../user';

interface IParticipant extends Pick<IUser, 'id' | 'fullName' | 'photoUrl'> {
  position: number;
  isReady: boolean;
  spentSeconds: number;
}

export type { IParticipant };
