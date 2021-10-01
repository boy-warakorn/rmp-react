import {
  HomeOutlined,
  ContactsOutlined,
  SettingFilled,
  LogoutOutlined,
  InboxOutlined,
  BankOutlined,
  ApartmentOutlined,
  UserOutlined,
  CommentOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import HomePage from "@pages/HomePage";
import RoomPage from "@pages/rooms/RoomPage";
import RoomDetailPage from "@pages/rooms/RoomDetailPage";
import AddRoomPage from "@pages/rooms/crud/AddRoomPage";
import AddOwnerPage from "@pages/rooms/crud/AddOwnerPage";
import PaymentPage from "@pages/payments/PaymentPage";
import AddPaymentPage from "@pages/payments/crud/AddPaymentPage";
import PackagePage from "@pages/packages/PackagePage";
import AddPackagePage from "@pages/packages/crud/AddPackagePage";
import ReportPage from "@pages/complaints/ComplaintPage";
import ComplaintDetailPage from "@pages/complaints/ComplaintDetailPage";
import ContactPage from "@pages/contacts/ContactPage";
import ContactDetailPage from "@pages/contacts/ContactDetailPage";
import AddContactPage from "@pages/contacts/crud/AddContactPage";
import AccountPage from "@pages/accounts/AccountPage";
import AddAccountPage from "@pages/accounts/crud/AddAccountPage";
import AccountDetailPage from "@pages/accounts/AccountDetailPage";
import BuildingPage from "@pages/buildings/BuildingPage";

const PERSONNEL = ["personnel"];
const ADMIN = ["admin"];
const ALL = [...PERSONNEL, ...ADMIN];

export const generalRoutes = [
  {
    title: "Home",
    path: "/home",
    icon: <BarChartOutlined />,
    permissions: ALL,
  },
  {
    title: "Building Management",
    path: "/buildings",
    icon: <HomeOutlined />,
    permissions: ALL,
  },
  {
    title: "Room Management",
    path: "/rooms",
    icon: <ApartmentOutlined />,
    permissions: ALL,
  },
  {
    title: "Resident’s packages",
    path: "/packages",
    icon: <InboxOutlined />,
    permissions: ALL,
  },
  {
    title: "Complaints",
    path: "/complaints",
    icon: <CommentOutlined />,
    permissions: ALL,
  },
  {
    title: "Bills/Payments",
    path: "/payments",
    icon: <BankOutlined />,
    permissions: ALL,
  },

  {
    title: "Manage Accounts",
    path: "/manage-accounts",
    icon: <UserOutlined />,
    disabled: false,
    permissions: ADMIN,
  },
  {
    title: "Contact List",
    path: "/contacts",
    icon: <ContactsOutlined />,
    permissions: ALL,
  },
];

export const settingsRoutes = [
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingFilled />,
    disabled: true,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <LogoutOutlined />,
  },
];

export const routes = [
  { path: "/home", component: HomePage, permissions: ALL },
  { path: "/rooms", component: RoomPage, permissions: ALL },
  { path: "/rooms/add", component: AddRoomPage, permissions: ALL },
  { path: "/rooms/:id/edit", component: AddRoomPage, permissions: ALL },
  { path: "/rooms/:id/owner/add", component: AddOwnerPage, permissions: ALL },
  {
    path: "/rooms/:id/owner/edit",
    component: AddOwnerPage,
    permissions: ALL,
  },
  { path: "/rooms/:id", component: RoomDetailPage, permissions: ALL },
  { path: "/payments", component: PaymentPage, permissions: ALL },
  { path: "/payments/add", component: AddPaymentPage, permissions: ALL },
  { path: "/packages", component: PackagePage, permissions: ALL },
  { path: "/packages/add", component: AddPackagePage, permissions: ALL },
  {
    path: "/packages/:id/edit",
    component: AddPackagePage,
    permissions: ALL,
  },
  { path: "/complaints", component: ReportPage, permissions: ALL },
  {
    path: "/complaints/:id",
    component: ComplaintDetailPage,
    permissions: ALL,
  },
  { path: "/contacts", component: ContactPage, permissions: ALL },
  { path: "/contacts/add", component: AddContactPage, permissions: ALL },
  { path: "/contacts/:id", component: ContactDetailPage, permissions: ALL },
  { path: "/contacts/:id/edit", component: AddContactPage, permissions: ALL },
  { path: "/manage-accounts", component: AccountPage, permissions: ADMIN },
  {
    path: "/manage-accounts/add",
    component: AddAccountPage,
    permissions: ADMIN,
  },
  {
    path: "/manage-accounts/:id",
    component: AccountDetailPage,
    permissions: ADMIN,
  },
  {
    path: "/manage-accounts/:id/edit",
    component: AddAccountPage,
    permissions: ADMIN,
  },
  {
    path: "/buildings",
    component: BuildingPage,
    permissions: ALL,
  },
];
