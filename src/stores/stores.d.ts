import { Account, AccountDetail } from "./accounts/slice";
import { Room, RoomDetail } from "./rooms/slice";

export type UserState = {
  name: string;
  businessName: string;
};

export type RoomState = {
  rooms: Room[];
  currentRoom: RoomDetail;
};

export type AccountState = {
  accounts: Account[];
  currentAccount: AccountDetail;
};

export type RootState = {
  user: UserState;
  room: RoomState;
  account: AccountState;
};
