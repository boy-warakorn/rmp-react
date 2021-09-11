import Card from "@components/global/Card";
import TextButton from "@components/global/TextButton";
import {
  BodyText1,
  HeadingText3,
  SubtitleText2,
} from "@components/global/typography/Typography";
import React from "react";

const DashboardReportCard = () => {
  return (
    <Card className="px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <HeadingText3>CB2302</HeadingText3>
        <div className="flex flex-col ml-6">
          <BodyText1>Broken door knob</BodyText1>
          <SubtitleText2>10 March 2020, 05:00</SubtitleText2>
        </div>
      </div>
      <TextButton className="text-primary" />
    </Card>
  );
};

export default DashboardReportCard;
