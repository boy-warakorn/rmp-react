import React, { useEffect, useState } from "react";
import SiderButton from "@components/global/navigation/SiderButton";
import { HeadingText3 } from "@components/global/typography/Typography";
import Logo from "../../assets/images/rmp_logo.png";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { Switch, Redirect, useHistory } from "react-router";
import HeaderBar from "@components/global/navigation/HeaderBar";
import { generalRoutes, routes, settingsRoutes } from "@configs/routes";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRoute from "@components/global/PrivateRoute";
import { clearUser, setUser } from "@stores/user/slice";
import { useDispatch } from "react-redux";
import RepositoryFactory from "@repository/RepositoryFactory";
import { UserRepository } from "@repository/UserRepository";
import Loading from "@components/global/Loading";
import ErrorPage from "@pages/ErrorPage";
import { BackTop } from "antd";
import { ReportRepository } from "@repository/ReportRepository";

const Sider = styled.div`
  ${tw`bg-background-dark max-h-screen min-h-screen fixed`}
`;

const Layout = () => {
  const usersRepository = RepositoryFactory.get("user") as UserRepository;
  const reportsRepository = RepositoryFactory.get("report") as ReportRepository;
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchPendingCount();
    // eslint-disable-next-line
  }, [window.location.pathname]);

  const fetchPendingCount = async () => {
    const countResponse = await reportsRepository.getPendingReportCount();
    if (countResponse !== undefined) setCount(countResponse);
  };

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const user = await usersRepository.getCurrentUser();
      if (user) {
        dispatch(
          setUser({
            businessName: user?.businessName,
            name: user?.profile.name,
            role: user?.profile.role,
          })
        );
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    dispatch(clearUser());
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    history.replace("/");
  };

  return (
    <div className="min-h-screen flex">
      <BackTop />
      <Sider className="w-sider">
        <div className="flex p-5 lg:py-9 lg:px-8 items-center">
          <img src={Logo} width="32px" alt="logo" />
          <HeadingText3 className="text-grey ml-3 text hidden lg:inline-block ">
            RMPSystem
          </HeadingText3>
        </div>
        {generalRoutes.map(
          ({ title, path, icon, disabled, permissions }, index) =>
            permissions.includes(role!) ? (
              <SiderButton
                title={title}
                path={path}
                icon={icon}
                active={window.location.pathname.includes(path)}
                notiCounts={path === "/reports" ? count : 0}
                key={`routes${index}`}
                disabled={disabled}
              />
            ) : null
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
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <div className="grid grid-cols-12 gap-x-6">
            <HeaderBar />
            {isLoading ? (
              <Loading />
            ) : (
              <Switch>
                {routes.map((route, index) =>
                  route.permissions.includes(role!) ? (
                    <PrivateRoute
                      key={`routes${index}`}
                      path={route.path}
                      component={route.component}
                      exact
                    />
                  ) : null
                )}
                <Redirect to="/home" />
                <PrivateRoute path="/error" component={ErrorPage} exact />
              </Switch>
            )}
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Layout;
