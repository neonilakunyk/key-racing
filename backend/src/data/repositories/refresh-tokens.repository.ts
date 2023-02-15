import { RefreshTokenModel } from 'data/models';
import { IRefreshTokenRecord } from 'common/interfaces';
import { RecordWithoutCommonKeys } from 'common/types';
import { RefreshTokenKey } from 'common/enums';

const create = async (
  data: RecordWithoutCommonKeys<IRefreshTokenRecord>,
): Promise<IRefreshTokenRecord> => {
  return RefreshTokenModel.query().insert(data);
};

const getByToken = async (
  token: string,
): Promise<IRefreshTokenRecord | undefined> => {
  return RefreshTokenModel.query()
    .where({ [RefreshTokenKey.TOKEN]: token })
    .first();
};

const removeByUserId = async (userId: number): Promise<number> => {
  return RefreshTokenModel.query()
    .where({ [RefreshTokenKey.USER_ID]: userId })
    .delete();
};

export { create, getByToken, removeByUserId };
