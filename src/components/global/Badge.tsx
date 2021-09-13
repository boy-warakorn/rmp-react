import React from "react";
import { Badge } from "antd";

interface CustomBadgeProps {
  count: number;
}

const CustomBadge = ({ count }: CustomBadgeProps) => {
  return <Badge count={count} style={{ minWidth: "28px" }} />;
};

export default CustomBadge;
