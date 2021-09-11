import styled from "@emotion/styled";
import { Button } from "antd";
import React from "react";
import tw from "twin.macro";

const CustomButton = styled(Button)`
  &.ant-btn {
    background: ${(props) => (props.color === "primary" ? "#3A49F9" : "#FFF")};
    color: ${(props) => (props.color === "primary" ? "#FFF" : "black")};
    border: none;
    transition: all 0.3s;
  }
  &.ant-btn:hover {
    background: ${(props) => (props.color === "primary" ? "#0E1BB2" : "#FFF")};
    color: ${(props) => (props.color === "primary" ? "#FFF" : "black")};
    border: none;
    transform: translateY(-1.5px);
    ${tw`shadow`}
  }
`;

const Component = (props: any): any => {
  return <CustomButton {...props}>{props.children}</CustomButton>;
};

export default Component;
