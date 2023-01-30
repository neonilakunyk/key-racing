import mongoose from 'mongoose';

import { Settings } from '../models';
import { ISettingEntity } from '../entities';
import { CommonField, SettingField } from '../fields';

interface ISettings {
  [CommonField.ID]?: ISettingEntity[CommonField.ID];
  [SettingField.USER_ID]: ISettingEntity[SettingField.USER_ID];
  [SettingField.IS_USER_VISIBLE_IN_RATING]?: ISettingEntity[SettingField.IS_USER_VISIBLE_IN_RATING];
  [SettingField.SECONDS_BEFORE_GAME]?: ISettingEntity[SettingField.SECONDS_BEFORE_GAME];
  [SettingField.SECONDS_FOR_GAME]?: ISettingEntity[SettingField.SECONDS_FOR_GAME];
}

class SettingsRepository {
  async getOne(params: Partial<ISettings>): Promise<ISettings> {
    return await Settings.findOne(params);
  }

  async create(params: ISettings): Promise<ISettings> {
    const id = new mongoose.Types.ObjectId();
    return await Settings.create({
      _id: id,
      ...params,
    });
  }

  async updateOne(
    params: Partial<ISettings>,
    newInfo: Partial<ISettings>,
  ): Promise<void> {
    await Settings.updateOne(params, newInfo);
  }
}

export const settingsRepository = new SettingsRepository();
