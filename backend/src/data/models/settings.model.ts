import { TableName, SettingsKey } from 'common/enums';
import { ISettingsRecord } from 'common/interfaces';

import { BaseModel } from './base.model';

class SettingsModel extends BaseModel implements ISettingsRecord {
  public [SettingsKey.USER_ID]!: ISettingsRecord[SettingsKey.USER_ID];

  public [SettingsKey.SECONDS_BEFORE_GAME]!: ISettingsRecord[SettingsKey.SECONDS_BEFORE_GAME];

  public [SettingsKey.SECONDS_FOR_GAME]!: ISettingsRecord[SettingsKey.SECONDS_FOR_GAME];

  public [SettingsKey.IS_USER_VISIBLE_IN_RATING]!: ISettingsRecord[SettingsKey.IS_USER_VISIBLE_IN_RATING];

  public static get tableName(): string {
    return TableName.SETTINGS;
  }
}

export { SettingsModel };
