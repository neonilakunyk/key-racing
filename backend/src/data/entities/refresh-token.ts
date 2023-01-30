import mongoose from 'mongoose';
import { IUserEntity } from '.';
import { CommonField, RefreshTokenField } from '../fields';

export interface IRefreshTokenEntity extends mongoose.Document{
  [RefreshTokenField.USER_ID]: IUserEntity[CommonField.ID];
  [RefreshTokenField.TOKEN]: string;
}