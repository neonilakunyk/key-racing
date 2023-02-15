import * as yup from 'yup';
import { ValidationErrorMessage } from 'common/enums';

export const securitySettingsSchema = yup
  .object()
  .shape({
    isUserVisibleInRating: yup.boolean().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);
