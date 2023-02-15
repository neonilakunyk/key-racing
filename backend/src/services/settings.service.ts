import { HttpCode, HttpErrorMessage } from 'common/enums';
import { HttpError } from 'common/exceptions';
import { IGameSettings, ISecuritySettings, ISettings } from 'common/interfaces';
import { settingsRepository } from 'data/repositories';

export const getSettings = async (userId: number): Promise<ISettings> => {
  const settings = await settingsRepository.getByUserId(userId);
  if (!settings) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  return settings;
};

export const setGameSettings = async (
  userId: number,
  data: IGameSettings,
): Promise<IGameSettings> => {
  const settings = await settingsRepository.patchByUserId(userId, data);
  if (!settings) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  const { secondsBeforeGame, secondsForGame } = settings;
  return {
    secondsBeforeGame,
    secondsForGame,
  };
};

export const setSecuritySettings = async (
  userId: number,
  data: ISecuritySettings,
): Promise<ISecuritySettings> => {
  const settings = await settingsRepository.patchByUserId(userId, data);
  if (!settings) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  const { isUserVisibleInRating } = settings;
  return {
    isUserVisibleInRating,
  };
};
