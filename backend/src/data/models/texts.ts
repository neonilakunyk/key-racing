import mongoose, { Schema } from 'mongoose';
import { ITextEntity } from '../entities';
import { TextField } from '../fields';

export const textSchema = new Schema<ITextEntity>({
  [TextField.TEXT]: String,
}, { versionKey: false });

export const Texts = mongoose.model<ITextEntity>('Texts', textSchema, 'texts');