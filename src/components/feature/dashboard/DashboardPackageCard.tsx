import Card from "@components/global/Card";
import {
  BodyText1,
  HeadingText3,
  SubtitleText2,
} from "@components/global/typography/Typography";
import { EditFilled } from "@ant-design/icons";
import React from "react";

const DashboardPackageCard = () => {
  return (
    <Card className="py-4 px-5">
      <div className="flex items-center">
        <HeadingText3>CB2302</HeadingText3>
        <div className="flex flex-col ml-3">
          <BodyText1>Thailand Post</BodyText1>
          <SubtitleText2>10 March 2020, 05:00</SubtitleText2>
        </div>
      </div>
      <div className="flex mt-3 ml-2">
        <EditFilled style={{ fontSize: "16px" }} />
        <SubtitleText2 className="text-black ml-6">
          The package is fragile. Handle with care.
        </SubtitleText2>
      </div>
    </Card>
  );
};

export default DashboardPackageCard;
