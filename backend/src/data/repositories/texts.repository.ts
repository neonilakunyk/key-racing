import { Texts } from '../models';
import { ITextEntity } from '../entities';
import { CommonField, TextField } from '../fields';

interface IText {
  [CommonField.ID]?: ITextEntity[CommonField.ID];
  [TextField.TEXT]: ITextEntity[TextField.TEXT];
}

class TextsRepository {
  async getOne(params: Partial<IText>): Promise<ITextEntity> {
    return await Texts.findOne(params);
  }

  async getOneRandom(): Promise<ITextEntity> {
    const countOfTexts = await Texts.count();
    const rand = Math.floor(Math.random() * countOfTexts);
    return await Texts.findOne().skip(rand);
  }

}

export const textsRepository = new TextsRepository();
