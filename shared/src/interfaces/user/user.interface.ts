interface IUser {
  id: number;
  fullName: string;
  email: string;
  photoUrl: string | null;
  password: string | null;
  record: number;
  personalRoomId: number;
}

export type { IUser };
