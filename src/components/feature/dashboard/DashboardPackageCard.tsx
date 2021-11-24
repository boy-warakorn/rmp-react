import Card from "@components/global/Card";
import {
  BodyText1,
  HeadingText3,
  SubtitleText2,
} from "@components/global/typography/Typography";
import { EditFilled } from "@ant-design/icons";
import React from "react";
import dayjs from "dayjs";

interface DashboardPackageCardProps {
  roomNumber: string;
  postalService: string;
  date: string;
  note: string;
}

const DashboardPackageCard = ({
  roomNumber,
  postalService,
  date,
  note,
}: DashboardPackageCardProps) => {
  return (
    <Card className="py-4 px-5 mb-4">
      <div className="flex items-center">
        <HeadingText3>{roomNumber}</HeadingText3>
        <div className="flex flex-col ml-3">
          <BodyText1>{postalService}</BodyText1>
          <SubtitleText2>
            {dayjs(date).format("YYYY-MM-DD HH:mm A")}
          </SubtitleText2>
        </div>
      </div>
      <div className="flex mt-3 ml-2">
        <EditFilled style={{ fontSize: "16px" }} />
        <SubtitleText2 className="text-black ml-6">{note}</SubtitleText2>
      </div>
    </Card>
  );
};

export default DashboardPackageCard;
