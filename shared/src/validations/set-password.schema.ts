import * as yup from 'yup';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from 'constants';
import { ValidationErrorMessage } from 'enums';
import { passwordRegex } from './regex/regex';

export const setPasswordSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .min(MIN_PASSWORD_LENGTH, ValidationErrorMessage.PASSWORD_MIN_LENGTH)
      .max(MAX_PASSWORD_LENGTH, ValidationErrorMessage.PASSWORD_MAX_LENGTH)
      .matches(passwordRegex, ValidationErrorMessage.PASSWORD_INCLUSIONS)
      .required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
