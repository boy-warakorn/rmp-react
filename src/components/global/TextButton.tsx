import React from "react";
import { BodyText1 } from "./typography/Typography";

interface TextButtonProps {
  className: string;
}

const TextButton = ({ className }: TextButtonProps) => {
  return (
    <div className="cursor-pointer py-1 hover-underline">
      <BodyText1 className={className}>Open report</BodyText1>
    </div>
  );
};

export default TextButton;
