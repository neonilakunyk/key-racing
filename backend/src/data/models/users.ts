import mongoose, { Schema } from 'mongoose';
import { IUserEntity } from '../entities';
import { UserField } from '../fields';

const userSchema = new Schema<IUserEntity>({
  [UserField.FULL_NAME]: String,
  [UserField.EMAIL]: String,
  [UserField.AVATAR]: String,
  [UserField.PASSWORD]: String,
  [UserField.RECORD]: { type: Number, default: 0 },
}, { versionKey: false });

export const Users = mongoose.model<IUserEntity>('Users', userSchema, 'users');