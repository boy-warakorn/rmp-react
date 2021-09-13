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
