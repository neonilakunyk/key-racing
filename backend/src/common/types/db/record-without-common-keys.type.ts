import { CommonKey } from 'common/enums';
import { ICommonRecord } from 'common/interfaces';

type RecordWithoutCommonKeys<T extends ICommonRecord> = Omit<
  T,
  CommonKey.ID | CommonKey.CREATED_AT | CommonKey.UPDATED_AT
>;

export type { RecordWithoutCommonKeys };
