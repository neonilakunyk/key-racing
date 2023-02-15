import * as yup from 'yup';
import {
  MIN_SECONDS_FOR_GAME,
  MAX_SECONDS_FOR_GAME,
  MIN_SECONDS_BEFORE_GAME,
  MAX_SECONDS_BEFORE_GAME,
} from 'constants';
import { ValidationErrorMessage } from 'enums';

export const gameSettingsSchema = yup
  .object()
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
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
