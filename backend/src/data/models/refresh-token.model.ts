import { TableName, RefreshTokenKey } from 'common/enums';
import { IRefreshTokenRecord } from 'common/interfaces';

import { BaseModel } from './base.model';

class RefreshTokenModel extends BaseModel implements IRefreshTokenRecord {
  public [RefreshTokenKey.TOKEN]!: IRefreshTokenRecord[RefreshTokenKey.TOKEN];

  public [RefreshTokenKey.USER_ID]!: IRefreshTokenRecord[RefreshTokenKey.USER_ID];

  public static get tableName(): string {
    return TableName.REFRESH_TOKENS;
  }
}

export { RefreshTokenModel };
