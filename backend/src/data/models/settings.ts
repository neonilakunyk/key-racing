import mongoose, { Schema } from 'mongoose';
import { DEFAULT_SECONDS_BEFORE_GAME, DEFAULT_SECONDS_FOR_GAME, IS_USER_VISIBLE_IN_RATING } from '../../common/constants';
import { ISettingEntity } from '../entities';
import { SettingField } from '../fields';

const { ObjectId } = Schema.Types;

const settingSchema = new Schema(
  {
    [SettingField.USER_ID]: ObjectId,
    [SettingField.IS_USER_VISIBLE_IN_RATING]: { type: Boolean, default: IS_USER_VISIBLE_IN_RATING },
    [SettingField.SECONDS_BEFORE_GAME]: { type: Number, default: DEFAULT_SECONDS_BEFORE_GAME },
    [SettingField.SECONDS_FOR_GAME]: { type: Number, default: DEFAULT_SECONDS_FOR_GAME },
  },
  { versionKey: false },
);

export const Settings = mongoose.model<ISettingEntity>(
  'Settings',
  settingSchema,
  'settings',
);
