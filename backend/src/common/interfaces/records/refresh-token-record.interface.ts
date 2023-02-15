import { RefreshTokenKey } from 'common/enums';
import { ICommonRecord } from 'common/interfaces';

interface IRefreshTokenRecord extends ICommonRecord {
  [RefreshTokenKey.USER_ID]: number;
  [RefreshTokenKey.TOKEN]: string;
}

export type { IRefreshTokenRecord };
