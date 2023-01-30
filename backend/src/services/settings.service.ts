import {
  IGameSettings,
  ISecuritySettings,
  ISettings,
} from '../common/interfaces';
import { settingsRepository } from '../data/repositories';

export const getSettings = async (userId: string): Promise<ISettings> => {
  const settings = await settingsRepository.getOne({ userId });
  const { isUserVisibleInRating, secondsBeforeGame, secondsForGame, _id } =
    settings;
  return {
    isUserVisibleInRating,
    secondsBeforeGame: secondsBeforeGame,
    secondsForGame: secondsForGame,
    id: _id,
  };
};

export const setGameSettings = async (
  userId: string,
  data: IGameSettings,
): Promise<IGameSettings> => {
  await settingsRepository.updateOne({ userId }, data);
  const settings = await settingsRepository.getOne({ userId });
  const { secondsBeforeGame, secondsForGame } = settings;
  return {
    secondsBeforeGame: secondsBeforeGame,
    secondsForGame: secondsForGame,
  };
};

export const setSecuritySettings = async (
  userId: string,
  data: ISecuritySettings,
): Promise<ISecuritySettings> => {
  await settingsRepository.updateOne({ userId }, data);
  const settings = await settingsRepository.getOne({ userId });
  const { isUserVisibleInRating } = settings;
  return {
    isUserVisibleInRating,
  };
};
