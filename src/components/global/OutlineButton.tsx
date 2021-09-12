import styled from "@emotion/styled";
import { Button } from "antd";
import React from "react";
import tw from "twin.macro";

const CustomBtn = styled(Button)`
  &.ant-btn {
    border: 1px solid #3a49f9;
    color: #3a49f9;
    transition: all 0.3s;
  }
  &.ant-btn:hover {
    transform: translateY(-1.5px);
    ${tw`shadow`}
  }
`;

const OutlineButton = (props: any) => {
  return <CustomBtn {...props}>{props.children}</CustomBtn>;
};

export default OutlineButton;
