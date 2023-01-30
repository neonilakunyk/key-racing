import {
  IParticipant,
  IParticipantsResult,
} from '../../../common/interfaces/interfaces';

const getParticipantsRating = (
  participants: IParticipant[],
): IParticipantsResult[] => {
  return participants
    .map(({ fullName, avatar, spentSeconds, position, id }) => ({
      id,
      fullName,
      avatar,
      speed: position / spentSeconds,
    }))
    .sort((firstParticipant, secondParticipant) => {
      return secondParticipant.speed - firstParticipant.speed;
    });
};

export { getParticipantsRating };
