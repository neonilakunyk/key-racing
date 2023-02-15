import * as yup from 'yup';
import { ValidationErrorMessage } from 'common/enums';

const roomUserSchema = yup
  .object()
  .shape({
    roomId: yup.number().required(),
    userId: yup.number().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { roomUserSchema };
