import { SettingsKey } from 'common/enums';
import { ICommonRecord } from 'common/interfaces';

interface ISettingsRecord extends ICommonRecord {
  [SettingsKey.USER_ID]: number;
  [SettingsKey.IS_USER_VISIBLE_IN_RATING]: boolean;
  [SettingsKey.SECONDS_BEFORE_GAME]: number;
  [SettingsKey.SECONDS_FOR_GAME]: number;
}

export type { ISettingsRecord };
