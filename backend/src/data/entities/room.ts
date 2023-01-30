import mongoose from 'mongoose';
import { CommonField, RoomField } from '../fields';
import { ITextEntity } from './text';
import { IUserEntity } from './user';

export interface IRoomEntity extends mongoose.Document{
  [RoomField.NAME]: string;
  [RoomField.TYPE]: string;
  [RoomField.TEXT_ID]: ITextEntity[CommonField.ID];
  [RoomField.USERS]: IUserEntity[CommonField.ID][];
}
