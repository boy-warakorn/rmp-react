import { AccountStatusCount } from "@repository/AccountRepository";
import {
  BaseBuilding,
  GetBuildingResponse,
} from "@repository/BuildingRepository";
import { BaseContact, ContactResponse } from "@repository/ContactRepository";
import {
  GetPackages,
  Package,
  PackageStatusCount,
} from "@repository/PackageRepository";
import { PaymentStatusCount } from "@repository/PaymentRepository";
import { ReportStatusCount } from "@repository/ReportRepository";
import { StatusCount } from "@repository/RoomRepository";
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
  userId: string;
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
  statusCount: StatusCount;
};

export type AccountState = {
  accounts: Account[];
  currentAccount: AccountDetail;
  statusCount: AccountStatusCount;
};

export type ReportState = {
  reports: Report[];
  currentReport: ReportDetail;
  statusCount: ReportStatusCount;
};

export type PackageState = {
  packages: GetPackages;
  currentPackage: Package;
  statusCount: PackageStatusCount;
};

export type PaymentState = {
  payments: Payment[];
  statusCount: PaymentStatusCount;
};

export type ContactState = {
  contacts: Contact[];
  currentContact: ContactResponse;
};

export type FilterState = {
  filterRoomNumber?: string;
  filterBuildingId?: string;
  filterReportType?: string;
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
