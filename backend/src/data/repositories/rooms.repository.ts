import mongoose, { Types } from 'mongoose';

import { RoomType } from '../../common/enums';
import { MAX_USERS_IN_ROOM } from '../../common/constants';
import { Rooms } from '../models';
import { IRoomEntity, IUserEntity } from '../entities';
import { CommonField, RoomField, UserField } from '../fields';

interface IRoom {
  [CommonField.ID]?: IRoomEntity[CommonField.ID];
  [RoomField.NAME]: IRoomEntity[RoomField.NAME];
  [RoomField.TYPE]: IRoomEntity[RoomField.TYPE];
  [RoomField.TEXT_ID]?: IRoomEntity[RoomField.TEXT_ID];
  [RoomField.USERS]?: IRoomEntity[RoomField.USERS];
}

interface IUser {
  [CommonField.ID]?: IUserEntity[CommonField.ID];
  [UserField.FULL_NAME]: IUserEntity[UserField.FULL_NAME];
  [UserField.AVATAR]: IUserEntity[UserField.AVATAR];
}

type RoomWithUsers = IRoom & {
  usersInfo: IUser[];
};

class RoomsRepository {
  async getOne(params: Partial<IRoom>): Promise<IRoomEntity> {
    return await Rooms.findOne(params);
  }

  async create(params: IRoom, id?: string): Promise<IRoomEntity> {
    const roomId = id ?? new mongoose.Types.ObjectId();
    return await Rooms.create({
      _id: roomId,
      ...params,
    });
  }

  async updateOne(
    params: Partial<IRoom>,
    newInfo: Partial<IRoom>,
  ): Promise<void> {
    await Rooms.updateOne(params, newInfo);
  }

  async removeOne(params: Partial<IRoom>): Promise<void> {
    await Rooms.deleteOne(params);
  }

  async getOneWithUsers(id: Types.ObjectId): Promise<RoomWithUsers> {
    const [room] = await Rooms.aggregate([
      {
        $lookup: {
          from: 'users',
          as: 'usersInfo',
          localField: RoomField.USERS,
          foreignField: CommonField.ID,
        },
      },
      {
        $project: {
          usersInfo: {
            fullName: 1,
            avatar: 1,
            _id: 1,
          },
          _id: 1,
        },
      },
      {
        $match: {
          _id: id,
        },
      },
    ]);
    return room;
  }

  async getAvailable(): Promise<IRoomEntity[]> {
    return await Rooms.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          type: 1,
          numberOfUsers: {
            $cond: {
              if: { $isArray: '$users' },
              then: { $size: '$users' },
              else: 'NA',
            },
          },
        },
      },
      {
        $match: {
          numberOfUsers: { $lt: MAX_USERS_IN_ROOM },
          type: RoomType.PUBLIC,
        },
      },
    ]);
  }
}

export const roomsRepository = new RoomsRepository();
