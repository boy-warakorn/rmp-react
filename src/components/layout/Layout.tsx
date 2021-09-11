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
import styled from "@emotion/styled";
import tw from "twin.macro";
import { Redirect, Route, Switch } from "react-router";
import HomePage from "@pages/HomePage";

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
    title: "Reports",
    path: "/reports",
    icon: <HomeOutlined />,
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

const Sider = styled.div`
  ${tw`bg-background-dark max-h-screen min-h-screen`}
`;

const Layout = () => {
  return (
    <div className="min-h-screen flex">
      <Sider className="w-sider">
        <div className="flex py-9 px-8 items-center">
          <img src={Logo} width="32px" alt="logo" />
          <HeadingText2 className="text-grey ml-3 text">RMPSystem</HeadingText2>
        </div>
        {mockupRoutes.map(({ title, path, icon, notiCounts }, index) => (
          <SiderButton
            title={title}
            path={path}
            icon={icon}
            active={window.location.pathname === path}
            notiCounts={notiCounts}
            key={`routes${index}`}
          />
        ))}
        <div
          style={{ height: "0.25px", background: "#4B4C54" }}
          className="mb-3"
        ></div>
        {settingMockupRoutes.map(({ title, path, icon }, index) => (
          <SiderButton
            title={title}
            icon={icon}
            path={path}
            active={window.location.pathname === path}
            key={`settings${index}`}
          />
        ))}
      </Sider>
      <div className="py-9 px-14 bg-background flex-1">
        <div className="grid grid-cols-12 gap-2">
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Route path="/home" component={HomePage} exact />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Layout;
