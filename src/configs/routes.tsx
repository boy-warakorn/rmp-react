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

export const generalRoutes = [
  {
    title: "Home",
    path: "/home",
    icon: <HomeOutlined />,
  },
  {
    title: "Room Management",
    path: "/rooms",
    icon: <ApartmentOutlined />,
  },
  {
    title: "Resident’s packages",
    path: "/packages",
    icon: <CodeSandboxOutlined />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <BellOutlined />,
    notiCounts: 7,
  },
  {
    title: "Contact List",
    path: "/contacts",
    icon: <ContactsOutlined />,
  },
  {
    title: "Bills/Payments",
    path: "/payments",
    icon: <PayCircleOutlined />,
  },
  {
    title: "Manage Accounts",
    path: "/manage-accounts",
    icon: <KeyOutlined />,
    disabled: true,
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
  { path: "/home", component: HomePage },
  { path: "/rooms", component: RoomPage },
  { path: "/rooms/add", component: AddRoomPage },
  { path: "/rooms/:id/edit", component: AddRoomPage },
  { path: "/rooms/:id/owner/add", component: AddOwnerPage },
  { path: "/rooms/:id/owner/edit", component: AddOwnerPage },
  { path: "/rooms/:id", component: RoomDetailPage },
  { path: "/payments", component: RoomPage },
  { path: "/payments/add", component: AddPaymentPage },
  { path: "/packages", component: PackagePage },
  { path: "/packages/add", component: AddPackagePage },
  { path: "/packages/:id/edit", component: AddPackagePage },
  { path: "/reports", component: ReportPage },
  { path: "/reports/:id", component: ReportDetailPage },
  { path: "/contacts", component: ContactPage },
  { path: "/contacts/add", component: AddContactPage },
  { path: "/contacts/:id", component: ContactDetailPage },
  { path: "/contacts/:id/edit", component: AddContactPage },
];
