import { RoomModel } from 'data/models';
import { IRoom, IRoomRecord, IRoomWithUsers } from 'common/interfaces';
import {
  UserKey,
  RoomRelationMappings,
  RoomKey,
  CommonKey,
} from 'common/enums';
import { RecordWithoutCommonKeys } from 'common/types';
import { MAX_USERS_IN_ROOM } from 'common/constants';

const create = async (
  data: Omit<RecordWithoutCommonKeys<IRoomRecord>, RoomKey.TEXT>,
): Promise<IRoom> => {
  return (await RoomModel.query().insert(data)) as IRoom;
};

const getById = async (roomId: number): Promise<IRoom | undefined> => {
  return RoomModel.query().findById(roomId).castTo<IRoom>();
};

const getByName = async (name: string): Promise<IRoom | undefined> => {
  return RoomModel.query()
    .where({ [RoomKey.NAME]: name })
    .castTo<IRoom>();
};

const getWithUsersById = async (roomId: number): Promise<IRoomWithUsers> => {
  return RoomModel.query()
    .findById(roomId)
    .withGraphFetched([RoomRelationMappings.USERS])
    .castTo<IRoomWithUsers>();
};

const getAvailable = async (): Promise<IRoom[]> => {
  return RoomModel.query()
    .select([
      RoomKey.NAME,
      RoomKey.TEXT,
      RoomKey.TYPE,
      RoomModel.relatedQuery(RoomRelationMappings.USERS)
        .count()
        .where({
          [UserKey.CURRENT_ROOM_ID]: CommonKey.ID,
        })
        .as(RoomRelationMappings.USERS),
    ])
    .where(RoomRelationMappings.USERS, '<', MAX_USERS_IN_ROOM)
    .castTo<IRoom[]>();
};

const patchById = async (
  userId: number,
  data: Partial<IRoomRecord>,
): Promise<IRoom> => {
  return RoomModel.query().patchAndFetchById(userId, data).castTo<IRoom>();
};

const removeById = async (roomId: number): Promise<number> => {
  return RoomModel.query().findById(roomId).delete();
};

export {
  create,
  getById,
  getByName,
  getWithUsersById,
  getAvailable,
  patchById,
  removeById,
};
