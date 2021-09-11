import { HeadingText3 } from "@components/typography/Typography";

import React from "react";

interface SiderButtonProps {
  title: string;
  onClick(): void;
  active: boolean;
  icon: any;
}

const SiderButton = ({ title, onClick, active, icon }: SiderButtonProps) => {
  let siderStyle = "flex py-5 pl-8 cursor-pointer items-center";

  if (active) {
    siderStyle = siderStyle.replace("pl-8", "pl-6");
    siderStyle = siderStyle.concat(
      " border-0 border-l-8 border-grey-light bg-grey-active"
    );
  }

  return (
    <div className={siderStyle}>
      <div
        style={{
          color: active ? "#DDE2FF" : "#A4A6B3",
          fontSize: "20px",
        }}
        className="flex items-center"
      >
        {icon}
      </div>
      <HeadingText3
        className={`${
          active ? "text-grey-light" : "text-grey"
        } ml-6 font-montserrat leading-6`}
      >
        {title}
      </HeadingText3>
    </div>
  );
};

export default SiderButton;
