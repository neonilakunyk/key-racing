import { UserKey } from 'common/enums';
import { ICommonRecord } from 'common/interfaces';

interface IUserRecord extends ICommonRecord {
  [UserKey.FULL_NAME]: string;
  [UserKey.EMAIL]: string;
  [UserKey.PASSWORD]: string | null;
  [UserKey.PHOTO_URL]: string | null;
  [UserKey.RECORD]: number;
  [UserKey.CURRENT_ROOM_ID]: number | null;
  [UserKey.PERSONAL_ROOM_ID]: number;
}

export type { IUserRecord };
