import {
  BaseBuilding,
  GetBuildingResponse,
} from "@repository/BuildingRepository";
import { BaseContact, ContactResponse } from "@repository/ContactRepository";
import { GetPackages, Package } from "@repository/PackageRepository";
import { Account, AccountDetail } from "./accounts/slice";
import { FormattedRoomInBuilding } from "./buildings/slice";
import { Contact } from "./contacts/slice";
import { Payment } from "./payments/slice";
import { Report, ReportDetail } from "./reports/slice";
import { Room, RoomDetail } from "./rooms/slice";

export type UserState = {
  name: string;
  businessName: string;
  role: string;
};

export type BuildingState = {
  buildings: BaseBuilding[];
  currentBuilding: GetBuildingResponse;
  currentFloorRooms: FormattedRoomInBuilding[];
  currentFloor: string;
  currentBuildingId: string;
  buildingIds: { id: string; buildingName: string }[];
};

export type RoomState = {
  rooms: Room[];
  currentRoom: RoomDetail;
  roomIdList: string[];
};

export type AccountState = {
  accounts: Account[];
  currentAccount: AccountDetail;
};

export type ReportState = {
  reports: Report[];
  currentReport: ReportDetail;
};

export type PackageState = {
  packages: GetPackages;
  currentPackage: Package;
};

export type PaymentState = {
  payments: Payment[];
};

export type ContactState = {
  contacts: Contact[];
  currentContact: ContactResponse;
};

export type FilterState = {
  filterRoomNumber?: string;
  filterBuildingId?: string;
};

export type RootState = {
  user: UserState;
  room: RoomState;
  account: AccountState;
  report: ReportState;
  postal: PackageState;
  payment: PaymentState;
  contact: ContactState;
  filter: FilterState;
  building: BuildingState;
};
