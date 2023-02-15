import * as yup from 'yup';
import { setPasswordSchema as baseSetPasswordSchema } from 'key-racing-shared/validations';
import { ValidationErrorMessage } from 'common/enums';

const setPasswordSchema = baseSetPasswordSchema
  .shape({
    token: yup.string().required(),
  })
  .noUnknown(true, ValidationErrorMessage.INVALID_KEYS_RECEIVED);

export { setPasswordSchema };
