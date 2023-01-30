import { RoomType } from '../../enums';

interface IRoom {
  id: string;
  name: string;
  type?: RoomType;
}

export type { IRoom };
