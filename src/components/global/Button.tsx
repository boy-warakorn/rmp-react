import styled from "@emotion/styled";
import { Button } from "antd";
import React from "react";

const CustomButton = styled(Button)`
  &.ant-btn {
    background: ${(props) => (props.color === "primary" ? "#3A49F9" : "#FFF")};
    color: ${(props) => (props.color === "primary" ? "#FFF" : "black")};
    border: none;
  }
`;

const Component = (props: any): any => {
  return <CustomButton {...props}>{props.children}</CustomButton>;
};

export default Component;
