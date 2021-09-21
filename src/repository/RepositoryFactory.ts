import { UserRepository, userRepository } from "./UserRepository";
import { AuthRepository, authRepository } from "./AuthRepository";
import { roomRepository, RoomRepository } from "./RoomRepository";
import { accountRepository, AccountRepository } from "./AccountRepository";
import { ReportRepository, reportRepository } from "./ReportRepository";
import { packageRepository, PackageRepository } from "./PackageRepository";
import { paymentRepository, PaymentRepository } from "./PaymentRepository";
import { ContactRepository, contactRepository } from "./ContactRepository";

interface Repositories {
  user: UserRepository;
  auth: AuthRepository;
  room: RoomRepository;
  account: AccountRepository;
  report: ReportRepository;
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
};

const RepositoriesFactory = {
  get: (name: keyof Repositories) => repositories[name],
};

export default RepositoriesFactory;
