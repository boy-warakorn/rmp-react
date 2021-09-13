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
import PaymentPage from "@pages/payments/PaymentPage";
import AddPaymentPage from "@pages/payments/crud/AddPaymentPage";
import PackagePage from "@pages/packages/PackagePage";
import AddPackagePage from "@pages/packages/crud/AddPackagePage";
import ReportPage from "@pages/reports/ReportPage";
import ReportDetailPage from "@pages/reports/ReportDetailPage";
import ContactPage from "@pages/contacts/ContactPage";
import ContactDetailPage from "@pages/contacts/ContactDetailPage";
import AddContactPage from "@pages/contacts/crud/AddContactPage";

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
        {generalRoutes.map(
          ({ title, path, icon, notiCounts, disabled }, index) => (
            <SiderButton
              title={title}
              path={path}
              icon={icon}
              active={window.location.pathname.includes(path)}
              notiCounts={notiCounts}
              key={`routes${index}`}
              disabled={disabled}
            />
          )
        )}
        <div
          style={{ height: "0.25px", background: "#4B4C54" }}
          className="mb-3"
        ></div>
        {settingsRoutes.map(({ title, path, icon, disabled }, index) => (
          <SiderButton
            title={title}
            icon={icon}
            path={path}
            active={window.location.pathname.includes(path)}
            key={`settings${index}`}
            disabled={disabled}
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
            <Route path="/rooms/:id/edit" component={AddRoomPage} exact />
            <Route path="/rooms/:id/owner/add" component={AddOwnerPage} exact />
            <Route
              path="/rooms/:id/owner/edit"
              component={AddOwnerPage}
              exact
            />
            <Route path="/rooms/:id" component={RoomDetailPage} exact />
            <Route path="/payments" component={PaymentPage} exact />
            <Route path="/payments/add" component={AddPaymentPage} exact />
            <Route path="/packages" component={PackagePage} exact />
            <Route path="/packages/add" component={AddPackagePage} exact />
            <Route path="/reports" component={ReportPage} exact />
            <Route path="/reports/:id" component={ReportDetailPage} exact />
            <Route path="/contacts" component={ContactPage} exact />
            <Route path="/contacts/add" component={AddContactPage} exact />
            <Route path="/contacts/:id" component={ContactDetailPage} exact />
            <Route path="/contacts/:id/edit" component={AddContactPage} exact />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Layout;
