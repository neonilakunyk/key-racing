import { RoomType } from 'common/enums/enums';

interface IRoom {
  id: string;
  name: string;
  type?: RoomType;
}

export type { IRoom };
