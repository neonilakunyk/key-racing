import mongoose from 'mongoose';
import { TextField } from '../fields';

export interface ITextEntity extends mongoose.Document{
  [TextField.TEXT]: string;
}