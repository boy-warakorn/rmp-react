import React from "react";
import SiderButton from "@components/navigation/SiderButton";
import { HeadingText2 } from "@components/typography/Typography";
import {
  HomeOutlined,
  ContactsOutlined,
  SettingFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/images/rmp_logo.png";
import { Divider } from "antd";

const mockupRoutes = [
  {
    title: "Home",
    path: "/home",
    icon: <HomeOutlined />,
  },
  {
    title: "Room Management",
    path: "/rooms",
    icon: <HomeOutlined />,
  },
  {
    title: "Resident’s packages",
    path: "/packages",
    icon: <HomeOutlined />,
  },
  {
    title: "Reports/Complaints",
    path: "/reports",
    icon: <HomeOutlined />,
  },
  {
    title: "Contact List",
    path: "/contacts",
    icon: <ContactsOutlined />,
  },
  {
    title: "Bills/Payments",
    path: "/payments",
    icon: <HomeOutlined />,
  },
];

const settingMockupRoutes = [
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingFilled />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <LogoutOutlined />,
  },
];

const Layout = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-sider bg-background-dark max-h-screen min-h-screen">
        <div className="flex py-9 px-8 items-center">
          <img src={Logo} width="32px" />
          <HeadingText2 className="text-grey ml-3 text">RMPSystem</HeadingText2>
        </div>
        {mockupRoutes.map(({ title, path, icon }) => (
          <SiderButton
            title={title}
            onClick={() => (window.location.pathname = path)}
            icon={icon}
            active={window.location.pathname === path}
          />
        ))}
        <div
          style={{ height: "0.25px", background: "#4B4C54" }}
          className="mb-3"
        ></div>
        {settingMockupRoutes.map(({ title, path, icon }) => (
          <SiderButton
            title={title}
            onClick={() => (window.location.pathname = path)}
            icon={icon}
            active={window.location.pathname === path}
          />
        ))}
      </div>
      <div className="py-9 px-14 bg-background flex-1">
        <div className="grid grid-cols-12 gap-2">Reserved for UI</div>
      </div>
    </div>
  );
};

export default Layout;
