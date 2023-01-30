import * as yup from 'yup';

export const roomSchema = yup.object().shape({
  name: yup.string().trim().min(2).max(50).required(),
});
