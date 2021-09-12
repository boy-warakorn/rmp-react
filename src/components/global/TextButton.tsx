import React, { CSSProperties } from "react";
import { BodyText1 } from "./typography/Typography";

interface TextButtonProps {
  className?: string;
  title: string;
  style?: CSSProperties;
}

const TextButton = ({ className, title, style }: TextButtonProps) => {
  return (
    <div className="cursor-pointer py-1 hover-underline">
      <BodyText1 className={className} style={style}>
        {title}
      </BodyText1>
    </div>
  );
};

export default TextButton;
