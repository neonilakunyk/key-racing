import { IParticipant } from './participant.interface';

interface IParticipantsResult
  extends Pick<IParticipant, 'fullName' | 'avatar' | 'id'> {
  speed: number;
}

export type { IParticipantsResult };
