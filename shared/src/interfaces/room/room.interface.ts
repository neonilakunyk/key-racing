import { RoomType } from '../../enums';

interface IRoom {
  id: number;
  name: string;
  type: RoomType;
  text: string | null;
}

export type { IRoom };
