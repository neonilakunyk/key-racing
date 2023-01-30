import * as yup from 'yup';
import {
  MIN_SECONDS_FOR_GAME,
  MAX_SECONDS_FOR_GAME,
  MIN_SECONDS_BEFORE_GAME,
  MAX_SECONDS_BEFORE_GAME,
} from '../constants';

export const gameSettingsSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    secondsForGame: yup
      .number()
      .integer()
      .min(MIN_SECONDS_FOR_GAME)
      .max(MAX_SECONDS_FOR_GAME)
      .required(),
    secondsBeforeGame: yup
      .number()
      .integer()
      .min(MIN_SECONDS_BEFORE_GAME)
      .max(MAX_SECONDS_BEFORE_GAME)
      .required(),
  });
