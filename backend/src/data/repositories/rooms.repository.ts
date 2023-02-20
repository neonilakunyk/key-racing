import { RoomModel } from 'data/models';
import { IRoom, IRoomRecord, IRoomWithUsers } from 'common/interfaces';
import {
  RoomRelationMappings,
  RoomKey,
  RoomType,
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
    .findOne({ [RoomKey.NAME]: name })
    .castTo<IRoom>();
};

const getWithUsersById = async (roomId: number): Promise<IRoomWithUsers> => {
  return RoomModel.query()
    .findById(roomId)
    .withGraphFetched(RoomRelationMappings.USERS)
    .castTo<IRoomWithUsers>();
};

const getAvailable = async (): Promise<IRoom[]> => {
  return RoomModel.query()
    .select([RoomKey.NAME, RoomKey.TEXT, RoomKey.TYPE, CommonKey.ID])
    .from(
      RoomModel.query()
        .select('*', [
          RoomModel.relatedQuery(RoomRelationMappings.USERS)
            .count()
            .as('usersCount'),
        ])
        .as('sub_query'),
    )
    .where('usersCount', '<', MAX_USERS_IN_ROOM)
    .andWhere({ [RoomKey.TYPE]: RoomType.PUBLIC })
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
