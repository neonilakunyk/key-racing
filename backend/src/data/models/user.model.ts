import { Model, RelationMappings } from 'objection';

import {
  TableName,
  UserKey,
  CommonKey,
  RefreshTokenKey,
  SettingsKey,
  UserRelationMappings,
} from 'common/enums';
import { IUserRecord } from 'common/interfaces';

import { BaseModel } from './base.model';
import { RefreshTokenModel } from './refresh-token.model';
import { SettingsModel } from './settings.model';

class UserModel extends BaseModel implements IUserRecord {
  public [UserKey.FULL_NAME]!: IUserRecord[UserKey.FULL_NAME];

  public [UserKey.EMAIL]!: IUserRecord[UserKey.EMAIL];

  public [UserKey.PASSWORD]!: IUserRecord[UserKey.PASSWORD];

  public [UserKey.PHOTO_URL]!: IUserRecord[UserKey.PHOTO_URL];

  public [UserKey.RECORD]!: IUserRecord[UserKey.RECORD];

  public [UserKey.CURRENT_ROOM_ID]!: IUserRecord[UserKey.CURRENT_ROOM_ID];

  public [UserKey.PERSONAL_ROOM_ID]!: IUserRecord[UserKey.PERSONAL_ROOM_ID];

  public static get relationMappings(): RelationMappings {
    return {
      [UserRelationMappings.REFRESH_TOKEN]: {
        relation: Model.HasOneRelation,
        modelClass: RefreshTokenModel,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          to: `${TableName.REFRESH_TOKENS}.${RefreshTokenKey.USER_ID}`,
        },
      },
      [UserRelationMappings.SETTINGS]: {
        relation: Model.HasOneRelation,
        modelClass: SettingsModel,
        join: {
          from: `${TableName.USERS}.${CommonKey.ID}`,
          to: `${TableName.SETTINGS}.${SettingsKey.USER_ID}`,
        },
      },
      [UserRelationMappings.PERSONAL_ROOM]: {
        relation: Model.BelongsToOneRelation,
        modelClass: SettingsModel,
        join: {
          from: `${TableName.USERS}.${UserKey.PERSONAL_ROOM_ID}`,
          to: `${TableName.ROOMS}.${CommonKey.ID}`,
        },
      },
    };
  }

  public static get tableName(): string {
    return TableName.USERS;
  }
}

export { UserModel };
