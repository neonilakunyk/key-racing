/* eslint-disable no-console */
import mongoose from 'mongoose';

import { Users } from '../models';
import { IUserEntity } from '../entities';
import { CommonField, SettingField, UserField } from '../fields';
import { ISecuritySettings } from '../../common/interfaces';

type UserWithSecuritySettings = IUser & { settings: ISecuritySettings };

interface IUser {
  [CommonField.ID]?: IUserEntity[CommonField.ID];
  [UserField.EMAIL]: IUserEntity[UserField.EMAIL];
  [UserField.FULL_NAME]: IUserEntity[UserField.FULL_NAME];
  [UserField.PASSWORD]?: IUserEntity[UserField.PASSWORD];
  [UserField.AVATAR]?: IUserEntity[UserField.AVATAR];
  [UserField.RECORD]?: IUserEntity[UserField.RECORD];
}

class UsersRepository {
  async getOne(params: Partial<IUser>): Promise<IUserEntity> {
    return await Users.findOne(params);
  }

  async getAllWithSettings(): Promise<UserWithSecuritySettings[]> {
    return await Users.aggregate([
      {
        $lookup: {
          from: 'settings',
          as: 'settings',
          localField: CommonField.ID,
          foreignField: SettingField.USER_ID,
        },
      },
      {
        $project: {
          email: 1,
          fullName: 1,
          avatar: 1,
          record: 1,
          settings: {
            isUserVisibleInRating: 1,
          },
        },
      },
      {
        $match: {
          settings: {
            isUserVisibleInRating: true,
          },
        },
      },
    ]).sort({ record: 'desc' });
  }

  async create(params: IUser): Promise<IUserEntity> {
    const id = new mongoose.Types.ObjectId();
    return await Users.create({
      _id: id,
      ...params,
    });
  }

  async updateOne(
    params: Partial<IUser>,
    newInfo: Partial<IUser>,
  ): Promise<void> {
    await Users.updateOne(params, newInfo);
  }
}

export const usersRepository = new UsersRepository();
