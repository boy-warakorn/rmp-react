import styled from "@emotion/styled";
import { SpinProps, Table } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { ColumnsType } from "antd/lib/table";
import React from "react";

interface CustomTableProps {
  dropdownPrefixCls?: string;
  dataSource?: any;
  columns?: ColumnsType;
  pagination?: any;
  loading?: boolean | SpinProps;
  size?: SizeType;
  bordered?: boolean;
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
  rowSelection?: any;
  getPopupContainer?: any;
  scroll?: any;
  sortDirections?: any;
  showSorterTooltip?: any;
  className: string;
}

const StyledTable = styled(Table)`
  & th.ant-table-cell {
    font-family: "MontserratBold";
  }
  & td.ant-table-cell {
    font-family: "RobotoRegular";
  }
`;

const CustomTable = (props: CustomTableProps) => {
  return <StyledTable scroll={{ x: 1000 }} {...(props as any)} />;
};

export default CustomTable;
