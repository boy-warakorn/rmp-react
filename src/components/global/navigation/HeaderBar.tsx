import {
  HeadingText2,
  SubHeadingText1,
} from "@components/global/typography/Typography";
import { Avatar } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import React from "react";
import AvatarImage from "@assets/images/avatar.png";
import { getHeaderTitle } from "@utils/getHeaderTitle";
import { useHistory } from "react-router";
import { userSelector } from "@stores/user/selector";
import { useSelector } from "react-redux";

const HeaderBar = () => {
  const history = useHistory();
  const user = useSelector(userSelector);

  let titleText =
    window.location.pathname !== "/home"
      ? getHeaderTitle()
      : user?.user.businessName.toLowerCase().includes("condo")
      ? user?.user.businessName
      : `${user?.user.businessName} Condo`;

  let headingText = <HeadingText2>{titleText}</HeadingText2>;

  if (!titleText) {
    titleText = window.location.pathname.split("/")[2];

    headingText = (
      <div
        className="flex items-center cursor-pointer hover:underline"
        onClick={() => history.goBack()}
      >
        <LeftOutlined style={{ fontSize: "24px" }} />
        <HeadingText2 className="ml-4">Back</HeadingText2>
      </div>
    );
  }

  return (
    <div className="col-span-12 flex justify-between items-center mb-3">
      {headingText}
      <div className="flex items-center border-0 border-l-2 border-grey-light pl-3">
        <SubHeadingText1 className="font-montserrat mr-3">
          {user?.user.profile.name}
        </SubHeadingText1>
        <Avatar src={AvatarImage} style={{ width: "40px", height: "40px" }} />
      </div>
    </div>
  );
};

export default HeaderBar;
