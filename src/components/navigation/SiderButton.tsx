import CustomBadge from "@components/global/Badge";
import { HeadingText3 } from "@components/typography/Typography";

import React from "react";
import { Link } from "react-router-dom";

interface SiderButtonProps {
  title: string;
  active: boolean;
  icon: any;
  notiCounts?: number;
  path: string;
}

const SiderButton = ({
  title,
  active,
  icon,
  notiCounts,
  path,
}: SiderButtonProps) => {
  let siderStyle = "flex py-5 px-8 cursor-pointer items-center transition-all";

  if (active) {
    siderStyle = siderStyle.replace("px-8", "pl-6 pr-8");
    siderStyle = siderStyle.concat(
      " border-0 border-l-8 border-grey-light bg-grey-active"
    );
  }

  return (
    <Link to={path}>
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
    </Link>
  );
};

export default SiderButton;
