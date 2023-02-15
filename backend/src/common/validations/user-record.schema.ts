import * as yup from 'yup';
import { ValidationErrorMessage } from 'common/enums';

const userRecordSchema = yup
  .object()
  .shape({
    record: yup.number().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { userRecordSchema };
