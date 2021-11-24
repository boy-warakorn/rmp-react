import Card from "@components/global/Card";
import TextButton from "@components/global/TextButton";
import {
  BodyText1,
  HeadingText3,
  SubtitleText2,
} from "@components/global/typography/Typography";
import React from "react";
import { useHistory } from "react-router";

interface DashboardReportCardProps {
  id: string;
  roomNumber: string;
  title: string;
  date: string;
}

const DashboardReportCard = ({
  id,
  roomNumber,
  title,
  date,
}: DashboardReportCardProps) => {
  const history = useHistory();

  return (
    <Card className="px-4 py-3 flex justify-between items-center mb-4">
      <div className="flex items-center">
        <HeadingText3>{roomNumber}</HeadingText3>
        <div className="flex flex-col ml-6">
          <BodyText1>{title}</BodyText1>
          <SubtitleText2>{date}</SubtitleText2>
        </div>
      </div>
      <TextButton
        className="text-primary"
        title="Open Report"
        onClick={() => history.push(`/reports/${id}`)}
      />
    </Card>
  );
};

export default DashboardReportCard;
