import styled from "@emotion/styled";
import { Select } from "antd";
import React, { CSSProperties, ReactNode } from "react";

export interface SelectProps {
  onClick?: any;
  open?: boolean;
  optionLabelProp?: string;
  children?: React.ReactNode;
  defaultValue?: any;
  disabled?: boolean;
  placeholder?: string | ReactNode;
  width?: string;
  size?: "large" | "middle" | "small";
  onChange?: any;
  suffixIcon?: any;
  value?: string | string[] | number | number[];
  style?: CSSProperties;
  border?: boolean;
  dropdownRender?: any;
  mode?: "multiple" | "tags";
  maxTagCount?: number | "responsive" | undefined;
  maxTagPlaceholder?: React.ReactNode;
  saved?: boolean;
  allowClear?: boolean;
  showArrow?: boolean;
  showSearch?: boolean;
  onPopupScroll?: any;
  id?: string;
  loading?: boolean;
}

const CustomSelect = styled(Select)<SelectProps>`
  font-family: "MontserratBold";
  & .ant-select-selector {
    border: 1px solid #291818 !important;
    border-radius: 16px;
  }
`;

const Component = (props: SelectProps) => {
  const { children, allowClear = true } = props;

  return (
    <CustomSelect allowClear={allowClear} {...props}>
      {children}
    </CustomSelect>
  );
};

export default Component;
