import * as yup from 'yup';
import { userNameRegex } from './regex/regex';

export const profileInfoSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(5, 'full name must be at least 5 characters')
    .max(30, 'full name must be at most 30 characters')
    .matches(
      userNameRegex,
      'full name must consist of latin or cyrillic letters (upper and lower case), numbers, and symbols',
    )
    .required(),
});
