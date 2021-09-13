import React from "react";
import Button from "@components/global/Button";
import { HeadingText4, BodyText1 } from "../typography/Typography";

interface HeaderTableProps {
  title: string;
  buttonTitle?: string;
  onClick?: () => void;
}

const HeaderTable = ({ title, buttonTitle, onClick }: HeaderTableProps) => {
  return (
    <div className="flex justify-between">
      <HeadingText4>{title}</HeadingText4>
      {buttonTitle && (
        <Button color="primary" className="px-6" onClick={onClick}>
          <BodyText1>{buttonTitle}</BodyText1>
        </Button>
      )}
    </div>
  );
};

export default HeaderTable;
