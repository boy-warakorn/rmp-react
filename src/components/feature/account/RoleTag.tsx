import { Tag } from "antd";
import React from "react";

interface RoleTagProps {
  role: "admin" | "resident" | "personnel";
}

const RoleTag = ({ role }: RoleTagProps) => {
  return (
    <Tag
      color={
        role === "admin" ? "magenta" : role === "resident" ? "cyan" : "green"
      }
    >
      {role}
    </Tag>
  );
};

export default RoleTag;
