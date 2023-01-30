import mongoose, { Schema } from 'mongoose';
import { IRefreshTokenEntity } from '../entities';
import { RefreshTokenField } from '../fields';

const { ObjectId } = Schema.Types;

const refreshTokenSchema = new Schema({
  [RefreshTokenField.USER_ID]: ObjectId,
  [RefreshTokenField.TOKEN]: String,
}, { versionKey: false });

export const RefreshTokens = mongoose.model<IRefreshTokenEntity>('RefreshTokens', refreshTokenSchema, 'refresh-tokens');