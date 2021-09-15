import React, { useEffect } from "react";
import SiderButton from "@components/global/navigation/SiderButton";
import { HeadingText3 } from "@components/global/typography/Typography";
import Logo from "../../assets/images/rmp_logo.png";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { Redirect, Switch } from "react-router";
import HeaderBar from "@components/global/navigation/HeaderBar";
import { generalRoutes, routes, settingsRoutes } from "@configs/routes";

import PrivateRoute from "@components/global/PrivateRoute";
import { useHistory } from "react-router-dom";
import { clearUser, setUser } from "@stores/user/slice";
import { useDispatch } from "react-redux";
import RepositoryFactory from "@repository/RepositoryFactory";
import { UserRepository } from "@repository/UserRepository";

const Sider = styled.div`
  ${tw`bg-background-dark max-h-screen min-h-screen fixed`}
`;

const Layout = () => {
  const usersRepository = RepositoryFactory.get("user") as UserRepository;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user = await usersRepository.getCurrentUser();
    if (user) {
      dispatch(
        setUser({ businessName: user?.businessName, name: user?.profile.name })
      );
    }
  };

  const logout = async () => {
    dispatch(clearUser());
    localStorage.setItem("token", "");
    history.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      <Sider className="w-sider">
        <div className="flex p-5 lg:py-9 lg:px-8 items-center">
          <img src={Logo} width="32px" alt="logo" />
          <HeadingText3 className="text-grey ml-3 text hidden lg:inline-block ">
            RMPSystem
          </HeadingText3>
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
            onClick={path === "/logout" ? logout : undefined}
          />
        ))}
      </Sider>
      <div
        className="py-4 px-6 lg:py-9 lg:px-14 bg-background flex-1 min-h-screen"
        id="content"
      >
        <div className="grid grid-cols-12 gap-x-6">
          <HeaderBar />
          <Switch>
            {routes.map((route, index) => (
              <PrivateRoute
                key={`routes${index}`}
                path={route.path}
                component={route.component}
                exact
              />
            ))}
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Layout;
