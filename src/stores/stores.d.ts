import { Account, AccountDetail } from "./accounts/slice";
import { Report } from "./reports/slice";
import { Room, RoomDetail } from "./rooms/slice";

export type UserState = {
  name: string;
  businessName: string;
  role: string;
};

export type RoomState = {
  rooms: Room[];
  currentRoom: RoomDetail;
};

export type AccountState = {
  accounts: Account[];
  currentAccount: AccountDetail;
};

export type ReportState = {
  reports: Report[];
};

export type RootState = {
  user: UserState;
  room: RoomState;
  account: AccountState;
  report: ReportState;
};
