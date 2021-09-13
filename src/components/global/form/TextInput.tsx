import React, { CSSProperties } from "react";
import { Input } from "antd";
import styled from "@emotion/styled";
import { BodyText1 } from "../typography/Typography";

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
  title: string;
  rows?: number;
}

const { TextArea } = Input;

const CustomInput = styled(Input)<InputProps>`
  & .ant-input-lg {
    font-weight: 400;
    font-size: 14px;
  }
`;

const CustomTextArea = styled(TextArea)`
  & .ant-input-lg {
    font-weight: 400;
    font-size: 14px;
  }
`;

const TextInput = (props: InputProps) => {
  return (
    <div className="flex flex-col">
      <BodyText1 className="font-bold mb-2">{props.title}</BodyText1>
      {props.rows ? (
        <CustomTextArea
          placeholder={`Enter ${props.title}`}
          {...(props as any)}
        />
      ) : (
        <CustomInput placeholder={`Enter ${props.title}`} {...props} />
      )}
    </div>
  );
};

export default TextInput;
