import mongoose from 'mongoose';

import { RefreshTokens } from '../models';
import { IRefreshTokenEntity } from '../entities';
import { CommonField, RefreshTokenField } from '../fields';

interface IRefreshToken {
  [CommonField.ID]?: IRefreshTokenEntity[CommonField.ID];
  [RefreshTokenField.TOKEN]: IRefreshTokenEntity[RefreshTokenField.TOKEN];
  [RefreshTokenField.USER_ID]: IRefreshTokenEntity[RefreshTokenField.USER_ID];
}

class RefreshTokensRepository {
  async getOne(
    params: Partial<IRefreshToken>,
  ): Promise<IRefreshTokenEntity> {
    return await RefreshTokens.findOne(params);
  }

  async create(params: IRefreshToken): Promise<IRefreshTokenEntity> {
    const id = new mongoose.Types.ObjectId();
    return await RefreshTokens.create({
      id,
      ...params,
    });
  }

  async updateOne(
    params: Partial<IRefreshToken>,
    newInfo: Partial<IRefreshToken>,
  ): Promise<void> {
    await RefreshTokens.updateOne(params, newInfo);
  }

  async removeOne(params: Partial<IRefreshToken>): Promise<void> {
    await RefreshTokens.deleteOne(params);
  }

}

export const refreshTokensRepository = new RefreshTokensRepository();
