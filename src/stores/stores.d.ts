import { Room } from "./rooms/slice";

export type UserState = {
  name: string;
  businessName: string;
};

export type RoomState = {
  rooms: Room[];
};

export type RootState = {
  user: UserState;
  room: RoomState;
};
