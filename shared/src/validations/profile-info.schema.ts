import * as yup from 'yup';
import { MAX_FULL_NAME_LENGTH, MIN_FULL_NAME_LENGTH } from 'constants';
import { ValidationErrorMessage } from 'enums';
import { userNameRegex } from './regex/regex';

export const profileInfoSchema = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .trim()
      .min(MIN_FULL_NAME_LENGTH, ValidationErrorMessage.FULL_MIN_LENGTH)
      .max(MAX_FULL_NAME_LENGTH, ValidationErrorMessage.FULL_MAX_LENGTH)
      .matches(userNameRegex, ValidationErrorMessage.FULL_NAME_INCLUSIONS)
      .required()
      .when('$notRequired', { is: true, then: (s) => s.notRequired() }),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
