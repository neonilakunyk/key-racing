import { IParticipant, IUser } from 'common/interfaces/interfaces';
import { DEFAULT_PARTICIPANT } from 'common/constants/constants';

export const userToParticipant = (user: Omit<IUser, 'email'>): IParticipant => ({
  ...user,
  ...DEFAULT_PARTICIPANT,
});
