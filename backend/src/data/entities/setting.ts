import mongoose from 'mongoose';
import { IUserEntity } from '.';
import { CommonField, SettingField } from '../fields';

export interface ISettingEntity extends mongoose.Document {
  [SettingField.USER_ID]: IUserEntity[CommonField.ID];
  [SettingField.IS_USER_VISIBLE_IN_RATING]: boolean;
  [SettingField.SECONDS_BEFORE_GAME]: number;
  [SettingField.SECONDS_FOR_GAME]: number;
}
