import mongoose, { Schema } from 'mongoose';
import { IRoomEntity } from '../entities';
import { RoomField } from '../fields';

const { ObjectId } = Schema.Types;

const roomSchema = new Schema(
  {
    [RoomField.NAME]: String,
    [RoomField.TYPE]: String,
    [RoomField.TEXT_ID]: ObjectId,
    [RoomField.USERS]: { type: [ObjectId], default: [] },
  },
  { versionKey: false },
);

export const Rooms = mongoose.model<IRoomEntity>('Rooms', roomSchema, 'rooms');
