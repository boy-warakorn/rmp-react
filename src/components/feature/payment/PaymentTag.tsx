import { Tag } from "antd";
import React from "react";

export interface PaymentTagProps {
  status: "pending" | "active" | "in-active" | "complete" | "reject";
}

const PaymentTag = ({ status }: PaymentTagProps) => {
  return (
    <Tag
      color={
        status === "pending"
          ? "gold"
          : status === "active"
          ? "processing"
          : status === "in-active"
          ? "default"
          : status === "complete"
          ? "success"
          : "red"
      }
    >
      {status}
    </Tag>
  );
};

export default PaymentTag;
