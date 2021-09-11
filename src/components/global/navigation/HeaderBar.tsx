import {
  HeadingText2,
  SubHeadingText1,
} from "@components/global/typography/Typography";
import { Avatar } from "antd";
import React from "react";
import AvatarImage from "@assets/images/avatar.png";

const HeaderBar = () => {
  return (
    <div className="col-span-12 flex justify-between items-center mb-3">
      <HeadingText2>Boy-Paint-Ohn Condo</HeadingText2>
      <div className="flex items-center border-0 border-l-2 border-grey-light pl-3">
        <SubHeadingText1 className="font-montserrat mr-3">
          Noppanut Boonrueng
        </SubHeadingText1>
        <Avatar src={AvatarImage} style={{ width: "40px", height: "40px" }} />
      </div>
    </div>
  );
};

export default HeaderBar;
