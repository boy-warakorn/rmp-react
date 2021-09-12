import React, { CSSProperties } from "react";
import { BodyText1 } from "./typography/Typography";

interface TextButtonProps {
  className?: string;
  title: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const TextButton = ({ className, title, style, onClick }: TextButtonProps) => {
  return (
    <div className="cursor-pointer py-1 hover-underline" onClick={onClick}>
      <BodyText1 className={className} style={style}>
        {title}
      </BodyText1>
    </div>
  );
};

export default TextButton;
