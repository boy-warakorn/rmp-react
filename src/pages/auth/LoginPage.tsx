import React, { ChangeEvent, useState } from "react";
import Logo from "../../assets/images/rmp_logo.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  HeadingText1,
  HeadingText3,
  SubtitleText1,
} from "@components/global/typography/Typography";
import TextInput from "@components/global/form/LoginInput";
import Button from "@components/global/Button";
import { AuthRepository, LoginDto } from "@repository/AuthRepository";
import RepositoryFactory from "@repository/RepositoryFactory";
import { Spin } from "antd";
import { useHistory } from "react-router";

const LoginScreen = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const authRepository = RepositoryFactory.get("auth") as AuthRepository;

  const onLogin = async () => {
    const loginDto: LoginDto = form;
    try {
      setIsLoading(true);
      await authRepository.login(loginDto);
      history.push("/");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-8">
      <div className="col-start-1 col-end-4">
        <div className="flex flex-col items-center justify-center min-h-full">
          <img src={Logo} width={128} alt="logo" />
          <HeadingText1 className="mt-9">RmpSYS</HeadingText1>
          <HeadingText3 className="mt-2">
            Resident Management System
          </HeadingText3>
        </div>
      </div>
      <div className="col-start-4 col-end-9 min-h-screen bg-background-dark text-white flex flex-col justify-center">
        <div className="ml-24">
          <HeadingText1>Log into RmpSYS</HeadingText1>
          <SubtitleText1 className="mt-2">
            Enter your login details below.
          </SubtitleText1>
          <HeadingText3 className="mt-6 uppercase">username</HeadingText3>
          <TextInput
            size="large"
            className="mt-3"
            placeholder="Enter your username.."
            name="username"
            value={form.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            prefix={<UserOutlined />}
          />
          <HeadingText3 className="uppercase mt-6">password</HeadingText3>
          <TextInput
            size="large"
            className="mt-3"
            name="password"
            placeholder="Enter your password.."
            value={form.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
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
              onClick={isLoading ? () => {} : onLogin}
            >
              <HeadingText3 className="uppercase font-montserratMedium">
                {isLoading ? (
                  <Spin
                    size="small"
                    style={{
                      width: "80px",
                    }}
                  />
                ) : (
                  "sign in"
                )}
              </HeadingText3>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
