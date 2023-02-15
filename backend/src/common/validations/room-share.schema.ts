import * as yup from 'yup';
import { ValidationErrorMessage } from 'common/enums';

const roomShareSchema = yup
  .object()
  .shape({
    link: yup.string().required(),
    emails: yup.array().of(yup.string().required()),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { roomShareSchema };
