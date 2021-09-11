import CustomBadge from "@components/global/Badge";
import { HeadingText3 } from "@components/typography/Typography";

import React from "react";

interface SiderButtonProps {
  title: string;
  onClick(): void;
  active: boolean;
  icon: any;
  notiCounts?: number;
}

const SiderButton = ({
  title,
  onClick,
  active,
  icon,
  notiCounts,
}: SiderButtonProps) => {
  let siderStyle = "flex py-5 px-8 cursor-pointer items-center";

  console.log("notiCounts :>> ", notiCounts);

  if (active) {
    siderStyle = siderStyle.replace("px-8", "px-6");
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
      <div className="flex items-center justify-between flex-1">
        <HeadingText3
          className={`${
            active ? "text-grey-light" : "text-grey"
          } ml-6 font-montserrat leading-6`}
        >
          {title}
        </HeadingText3>
        {notiCounts && <CustomBadge count={notiCounts} />}
      </div>
    </div>
  );
};

export default SiderButton;
