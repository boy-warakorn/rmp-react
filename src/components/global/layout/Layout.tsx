import React from "react";
import SiderButton from "@components/global/navigation/SiderButton";
import { HeadingText3 } from "@components/global/typography/Typography";
import Logo from "../../../assets/images/rmp_logo.png";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { Redirect, Route, Switch } from "react-router";
import HomePage from "@pages/HomePage";
import HeaderBar from "@components/global/navigation/HeaderBar";
import RoomPage from "@pages/rooms/RoomPage";
import { generalRoutes, settingsRoutes } from "@configs/routes";
import RoomDetailPage from "@pages/rooms/RoomDetailPage";
import AddRoomPage from "@pages/rooms/crud/AddRoomPage";
import AddOwnerPage from "@pages/rooms/crud/AddOwnerPage";

const Sider = styled.div`
  ${tw`bg-background-dark max-h-screen min-h-screen fixed`}
`;

const Layout = () => {
  return (
    <div className="min-h-screen flex">
      <Sider className="w-sider">
        <div className="flex py-9 px-8 items-center">
          <img src={Logo} width="32px" alt="logo" />
          <HeadingText3 className="text-grey ml-3 text">RMPSystem</HeadingText3>
        </div>
        {generalRoutes.map(({ title, path, icon, notiCounts }, index) => (
          <SiderButton
            title={title}
            path={path}
            icon={icon}
            active={window.location.pathname.includes(path)}
            notiCounts={notiCounts}
            key={`routes${index}`}
          />
        ))}
        <div
          style={{ height: "0.25px", background: "#4B4C54" }}
          className="mb-3"
        ></div>
        {settingsRoutes.map(({ title, path, icon }, index) => (
          <SiderButton
            title={title}
            icon={icon}
            path={path}
            active={window.location.pathname.includes(path)}
            key={`settings${index}`}
          />
        ))}
      </Sider>
      <div
        className="py-9 px-14 bg-background flex-1 min-h-screen"
        style={{ marginLeft: "275px" }}
      >
        <div className="grid grid-cols-12 gap-x-6">
          <HeaderBar />
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Route path="/home" component={HomePage} exact />
            <Route path="/rooms" component={RoomPage} exact />
            <Route path="/rooms/add" component={AddRoomPage} exact />
            <Route path="/rooms/:id/owner/add" component={AddOwnerPage} exact />
            <Route
              path="/rooms/:id/owner/edit"
              component={AddOwnerPage}
              exact
            />
            <Route path="/rooms/:id" component={RoomDetailPage} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Layout;
