import { UserRepository, userRepository } from "./UserRepository";
import { AuthRepository, authRepository } from "./AuthRepository";
import { roomRepository, RoomRepository } from "./RoomRepository";
import { accountRepository, AccountRepository } from "./AccountRepository";
import { ReportRepository, reportRepository } from "./ReportRepository";
import { packageRepository, PackageRepository } from "./PackageRepository";
import { paymentRepository, PaymentRepository } from "./PaymentRepository";
import { ContactRepository, contactRepository } from "./ContactRepository";
import { buildingRepository, BuildingRepository } from "./BuildingRepository";

interface Repositories {
  user: UserRepository;
  auth: AuthRepository;
  room: RoomRepository;
  building: BuildingRepository;
  account: AccountRepository;
  // report = complaint
  report: ReportRepository;
  // add new generateReport
  package: PackageRepository;
  payment: PaymentRepository;
  contact: ContactRepository;
}

const repositories = {
  user: userRepository,
  auth: authRepository,
  room: roomRepository,
  account: accountRepository,
  report: reportRepository,
  package: packageRepository,
  payment: paymentRepository,
  contact: contactRepository,
  building: buildingRepository,
};

const RepositoriesFactory = {
  get: (name: keyof Repositories) => repositories[name],
};

export default RepositoriesFactory;
