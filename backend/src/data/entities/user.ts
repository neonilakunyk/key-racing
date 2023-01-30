import mongoose from 'mongoose';
import { UserField } from '../fields';

export interface IUserEntity extends mongoose.Document {
  [UserField.FULL_NAME]: string;
  [UserField.EMAIL]: string;
  [UserField.PASSWORD]?: string;
  [UserField.AVATAR]?: string;
  [UserField.RECORD]?: number;
}
