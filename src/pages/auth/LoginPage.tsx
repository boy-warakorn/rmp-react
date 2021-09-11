import React from "react";
import Logo from "../../assets/images/rmp_logo.png";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  HeadingText1,
  HeadingText2,
  SubtitleText1,
} from "@components/typography/Typography";
import TextInput from "@components/global/TextInput";
import Button from "@components/global/Button";

const LoginScreen = () => {
  return (
    <div className="grid grid-cols-8">
      <div className="col-start-1 col-end-4">
        <div className="flex flex-col items-center justify-center min-h-full">
          <img src={Logo} width={128} />
          <HeadingText1 className="mt-9">RmpSYS</HeadingText1>
          <HeadingText2 className="mt-2">
            Resident Management System
          </HeadingText2>
        </div>
      </div>
      <div className="col-start-4 col-end-9 min-h-screen bg-background-dark text-white flex flex-col justify-center">
        <div className="ml-24">
          <HeadingText1>Log into RmpSYS</HeadingText1>
          <SubtitleText1 className="mt-2">
            Enter your login details below.
          </SubtitleText1>
          <HeadingText2 className="mt-6 uppercase">username</HeadingText2>
          <TextInput
            size="large"
            className="mt-3"
            placeholder="Enter your username.."
            prefix={<UserOutlined />}
          />
          <HeadingText2 className="uppercase mt-6">password</HeadingText2>
          <TextInput
            size="large"
            className="mt-3"
            placeholder="Enter your password.."
            prefix={<LockOutlined />}
            type="password"
          />
          <div className="mt-14">
            <Button
              style={{
                paddingLeft: "86px",
                paddingRight: "86px",
                paddingTop: "14px",
                paddingBottom: "14px",
                height: "100%",
              }}
              color="primary"
              onClick={() => (window.location.pathname = "/home")}
            >
              <HeadingText2 className="uppercase font-montserratMedium">
                sign in
              </HeadingText2>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
