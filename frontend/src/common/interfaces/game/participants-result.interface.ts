import { IParticipant } from './participant.interface';

interface IParticipantsResult
  extends Pick<IParticipant, 'fullName' | 'photoUrl' | 'id'> {
  speed: number;
}

export type { IParticipantsResult };
