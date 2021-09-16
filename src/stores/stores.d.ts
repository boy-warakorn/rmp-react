import { Room, RoomDetail } from "./rooms/slice";

export type UserState = {
  name: string;
  businessName: string;
};

export type RoomState = {
  rooms: Room[];
  currentRoom: RoomDetail;
};

export type RootState = {
  user: UserState;
  room: RoomState;
};
