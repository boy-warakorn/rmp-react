import React, { CSSProperties } from "react";
import { Input } from "antd";
import styled from "@emotion/styled";

export interface InputProps {
  allowClear?: boolean;
  placeholder?: string;
  size?: "large" | "middle" | "small";
  maxLength?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  value?: string | number;
  id?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  state?: string;
  width?: string;
  onChange?: any;
  style?: CSSProperties;
  onPressEnter?: any;
  ref?: any;
  className?: string;
}

const LoginInput = styled(Input)<InputProps>`
  width: 30%;
  & .ant-input-lg {
    font-weight: 400;
    font-size: 14px;
  }
`;

const TextInput = (props: InputProps) => {
  return <LoginInput {...props} />;
};

export default TextInput;
