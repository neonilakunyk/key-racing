import { SettingsKey, UserKey, UserRelationMappings } from 'common/enums';
import { IUser, IUserRecord } from 'common/interfaces';
import { RecordWithoutCommonKeys, UserRatingInfo } from 'common/types';
import { UserModel } from 'data/models';

const create = async (
  data: Omit<
    RecordWithoutCommonKeys<IUserRecord>,
    UserKey.RECORD | UserKey.CURRENT_ROOM_ID
  >,
): Promise<IUser> => {
  return (await UserModel.query().insert({
    ...data,
    [UserKey.EMAIL]: data.email.toLowerCase(),
  })) as IUser;
};

const getByEmail = async (email: string): Promise<IUser | undefined> => {
  return UserModel.query()
    .where({ [UserKey.EMAIL]: email.toLowerCase() })
    .first();
};

const getById = async (userId: number): Promise<IUser | undefined> => {
  return UserModel.query().findById(userId);
};

const getAllWithPublicRecords = async (): Promise<UserRatingInfo[]> => {
  return UserModel.query()
    .withGraphFetched(UserRelationMappings.SETTINGS)
    .where({ [SettingsKey.IS_USER_VISIBLE_IN_RATING]: true })
    .returning([UserKey.FULL_NAME, UserKey.PHOTO_URL, UserKey.RECORD]);
};

const getUsersByRoomId = async (roomId: number): Promise<IUser[]> => {
  return UserModel.query().where({ [UserKey.CURRENT_ROOM_ID]: roomId });
};

const patchById = async (
  userId: number,
  data: Partial<IUserRecord>,
): Promise<IUser> => {
  return UserModel.query().patchAndFetchById(userId, data);
};

export {
  create,
  getByEmail,
  getById,
  getAllWithPublicRecords,
  getUsersByRoomId,
  patchById,
};
