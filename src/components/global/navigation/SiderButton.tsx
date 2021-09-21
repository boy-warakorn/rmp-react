import CustomBadge from "@components/global/Badge";
import { HeadingText4 } from "@components/global/typography/Typography";

import React from "react";
import { Link } from "react-router-dom";

interface SiderButtonProps {
  title: string;
  active: boolean;
  icon: any;
  notiCounts?: number;
  path: string;
  disabled?: boolean;
  onClick?: () => Promise<void>;
}

const SiderButton = ({
  title,
  active,
  icon,
  notiCounts,
  path,
  disabled,
  onClick,
}: SiderButtonProps) => {
  let siderStyle =
    "flex py-5 px-7 lg:py-5 lg:px-8 cursor-pointer items-center transition-all";

  if (active) {
    siderStyle = siderStyle.replace("lg:px-8", "pl-6 pr-8");
    siderStyle = siderStyle.concat(
      " border-0 border-l-8 border-grey-light bg-grey-active"
    );
  }

  const linkChildren = (
    <div
      onClick={onClick}
      className={`${siderStyle} sider-btn ${
        disabled ? "cursor-not-allowed bg-black" : ""
      }`}
    >
      <div
        style={{
          color: active ? "#DDE2FF" : "#A4A6B3",
          fontSize: "20px",
          marginTop: "-2.75px",
        }}
        className="flex items-center"
      >
        {icon}
      </div>
      <div className="items-center hidden justify-between flex-1 lg:flex">
        <HeadingText4
          className={`${
            disabled
              ? "text-gray-500"
              : active
              ? "text-grey-light"
              : "text-grey"
          } ml-6 font-montserrat leading-6`}
        >
          {title}
        </HeadingText4>
        {notiCounts && <CustomBadge count={notiCounts} />}
      </div>
    </div>
  );

  if (path === "/logout") {
    return <div onClick={onClick}>{linkChildren}</div>;
  }

  return disabled ? linkChildren : <Link to={path}>{linkChildren}</Link>;
};

export default SiderButton;
