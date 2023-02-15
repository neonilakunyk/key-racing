import * as yup from 'yup';
import {
  MAX_FULL_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_FULL_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from 'constants';
import { ValidationErrorMessage } from 'enums';
import { userNameRegex, passwordRegex } from './regex/regex';

export const signUpSchema = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .trim()
      .min(MIN_FULL_NAME_LENGTH, ValidationErrorMessage.FULL_MIN_LENGTH)
      .max(MAX_FULL_NAME_LENGTH, ValidationErrorMessage.FULL_MAX_LENGTH)
      .matches(userNameRegex, ValidationErrorMessage.FULL_NAME_INCLUSIONS)
      .required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(MIN_PASSWORD_LENGTH, ValidationErrorMessage.PASSWORD_MIN_LENGTH)
      .max(MAX_PASSWORD_LENGTH, ValidationErrorMessage.PASSWORD_MAX_LENGTH)
      .matches(passwordRegex, ValidationErrorMessage.PASSWORD_INCLUSIONS)
      .required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
