import styled from "@emotion/styled";
import { Tabs } from "antd";
import React from "react";
import tw from "twin.macro";

const StyledTabs = styled(Tabs)`
  & .ant-tabs-nav {
    margin: 0px !important;
  }
  & .ant-tabs-tab {
    margin: 0px !important;
    border: none !important;
    padding: 12px 48px !important;
    background-color: #fff !important;
    border-bottom: 2px solid #fff !important;
  }
  & .ant-tabs-tab.ant-tabs-tab-active {
    padding: 10px 48px !important;
    border-bottom: 2px solid #3a49f9 !important;
  }
  & .ant-tabs-nav {
    margin: 0px;
  }
  & .ant-tabs-tab-btn {
    font-size: 16px;
    font-family: "MontserratRegular";
  }
  & .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #3a49f9;
    font-family: "MontserratMedium";
  }
  & .ant-tabs-tab:first-of-type {
    border-radius: 8px 0px 0px 0px !important;
  }
  & .ant-tabs-tab:nth-last-of-type(2) {
    border-radius: 0px 8px 0px 0px !important;
  }
`;

export const TabCard = styled.div`
  ${tw`w-full bg-card-bg p-6 xl:p-9 shadow rounded-xl`}
  min-height: 600px;
`;

const CustomTabs = (props: any) => {
  const { children } = props;
  return <StyledTabs {...props}>{children}</StyledTabs>;
};

export default CustomTabs;
