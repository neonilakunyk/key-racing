import * as yup from 'yup';
import { ValidationErrorMessage } from 'enums';

export const resetPasswordSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
