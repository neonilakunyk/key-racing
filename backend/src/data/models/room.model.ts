import { Model, RelationMappings } from 'objection';

import { CommonKey, TableName, RoomKey, UserKey, RoomRelationMappings } from 'common/enums';
import { IRoomRecord } from 'common/interfaces';

import { BaseModel } from './base.model';
import { UserModel } from './user.model';

class RoomModel extends BaseModel implements IRoomRecord {
  public [RoomKey.NAME]!: IRoomRecord[RoomKey.NAME];

  public [RoomKey.TYPE]!: IRoomRecord[RoomKey.TYPE];

  public [RoomKey.TEXT]!: IRoomRecord[RoomKey.TEXT] | null;

  public static get relationMappings(): RelationMappings {
    return {
      [RoomRelationMappings.USERS]: {
        relation: Model.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: `${TableName.ROOMS}.${CommonKey.ID}`,
          to: `${TableName.USERS}.${UserKey.CURRENT_ROOM_ID}`,
        },
      },
    };
  }

  public static get tableName(): string {
    return TableName.ROOMS;
  }
}

export { RoomModel };
