import { IParticipant, IUser } from 'common/interfaces';
import { DEFAULT_PARTICIPANT } from 'common/constants';

export const userToParticipant = (user: IUser): IParticipant => {
  const { id, fullName, photoUrl } = user;
  return {
    id,
    fullName,
    photoUrl,
    ...DEFAULT_PARTICIPANT,
  };
};
