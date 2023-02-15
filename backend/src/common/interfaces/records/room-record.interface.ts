import { RoomKey } from 'common/enums';
import { ICommonRecord } from 'common/interfaces';

interface IRoomRecord extends ICommonRecord {
  [RoomKey.NAME]: string;
  [RoomKey.TYPE]: string;
  [RoomKey.TEXT]: string | null;
}

export type { IRoomRecord };
