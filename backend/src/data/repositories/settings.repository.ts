import { SettingsModel } from 'data/models';
import { ISettings, ISettingsRecord } from 'common/interfaces';
import { SettingsKey } from 'common/enums';

const createEmptyUserRecord = async (
  userId: number,
): Promise<ISettingsRecord> => {
  return SettingsModel.query().insert({ [SettingsKey.USER_ID]: userId });
};

const getByUserId = async (userId: number): Promise<ISettings | undefined> => {
  return SettingsModel.query().findOne({ [SettingsKey.USER_ID]: userId });
};

const patchByUserId = async (
  userId: number,
  data: Partial<ISettings>,
): Promise<ISettings | undefined> => {
  return SettingsModel.query()
    .where({ [SettingsKey.USER_ID]: userId })
    .patch(data)
    .returning('*')
    .first();
};

export { createEmptyUserRecord, getByUserId, patchByUserId };
