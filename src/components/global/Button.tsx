import styled from "@emotion/styled";
import { Button } from "antd";
import React from "react";
import tw from "twin.macro";

const CustomButton = styled(Button)<any>`
  &.ant-btn {
    cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
    background: ${(props) =>
      !props.isDisabled
        ? props.color === "primary"
          ? "#3A49F9"
          : props.color === "danger"
          ? "#FF0707"
          : "#FFF"
        : "#979797"};
    color: ${(props) =>
      props.color === "primary" || props.color === "danger" ? "#FFF" : "black"};
    border: ${(props) =>
      props.color === "primary" || props.color === "danger"
        ? "none"
        : "1px solid black"};
    transition: all 0.3s;
  }
  &.ant-btn:hover {
    background: ${(props) =>
      !props.isDisabled
        ? props.color === "primary"
          ? "#0E1BB2"
          : props.color === "danger"
          ? "#FF0707"
          : "#FFF"
        : ""};
    color: ${(props) =>
      props.color === "primary" || props.color === "danger" ? "#FFF" : "black"};
    border: ${(props) =>
      props.color === "primary" || props.color === "danger"
        ? "none"
        : "1px solid black"};
    // transform: ${(props) => (props.isDisabled ? "" : "translateY(-1.5px)")};
    ${tw`shadow`}
  }
`;

const Component = (props: any): any => {
  return <CustomButton {...props}>{props.children}</CustomButton>;
};

export default Component;
