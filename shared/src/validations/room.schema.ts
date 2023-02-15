import * as yup from 'yup';
import { ValidationErrorMessage } from 'enums';

export const roomSchema = yup
  .object()
  .shape({
    name: yup.string().trim().min(2).max(50).required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
