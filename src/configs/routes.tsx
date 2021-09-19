import {
  HomeOutlined,
  ContactsOutlined,
  SettingFilled,
  LogoutOutlined,
  CodeSandboxOutlined,
  PayCircleOutlined,
  ApartmentOutlined,
  KeyOutlined,
  BellOutlined,
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
import ReportPage from "@pages/reports/ReportPage";
import ReportDetailPage from "@pages/reports/ReportDetailPage";
import ContactPage from "@pages/contacts/ContactPage";
import ContactDetailPage from "@pages/contacts/ContactDetailPage";
import AddContactPage from "@pages/contacts/crud/AddContactPage";
import AccountPage from "@pages/accounts/AccountPage";
import AddAccountPage from "@pages/accounts/crud/AddAccountPage";
import AccountDetailPage from "@pages/accounts/AccountDetailPage";

const PERSONNEL = ["personnel"];
const ADMIN = ["admin"];
const ALL = [...PERSONNEL, ...ADMIN];

export const generalRoutes = [
  {
    title: "Home",
    path: "/home",
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
    icon: <CodeSandboxOutlined />,
    permissions: PERSONNEL,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <BellOutlined />,
    notiCounts: 7,
    permissions: PERSONNEL,
  },
  {
    title: "Contact List",
    path: "/contacts",
    icon: <ContactsOutlined />,
    permissions: ALL,
  },
  {
    title: "Bills/Payments",
    path: "/payments",
    icon: <PayCircleOutlined />,
    permissions: PERSONNEL,
  },
  {
    title: "Manage Accounts",
    path: "/manage-accounts",
    icon: <KeyOutlined />,
    disabled: false,
    permissions: ADMIN,
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
  { path: "/payments", component: PaymentPage, permissions: PERSONNEL },
  { path: "/payments/add", component: AddPaymentPage, permissions: PERSONNEL },
  { path: "/packages", component: PackagePage, permissions: PERSONNEL },
  { path: "/packages/add", component: AddPackagePage, permissions: PERSONNEL },
  {
    path: "/packages/:id/edit",
    component: AddPackagePage,
    permissions: PERSONNEL,
  },
  { path: "/reports", component: ReportPage, permissions: PERSONNEL },
  { path: "/reports/:id", component: ReportDetailPage, permissions: PERSONNEL },
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
];
