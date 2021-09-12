import React from "react";
import Button from "@components/global/Button";
import { HeadingText4, BodyText1 } from "../typography/Typography";

interface HeaderTableProps {
  title: string;
  buttonTitle: string;
}

const HeaderTable = ({ title, buttonTitle }: HeaderTableProps) => {
  return (
    <div className="flex justify-between">
      <HeadingText4>{title}</HeadingText4>
      <Button color="primary" className="px-6">
        <BodyText1>{buttonTitle}</BodyText1>
      </Button>
    </div>
  );
};

export default HeaderTable;
