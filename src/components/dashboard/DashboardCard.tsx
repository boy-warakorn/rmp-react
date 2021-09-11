import {
  HeadingText4,
  NumberHeadingText1,
} from "@components/typography/Typography";
import React from "react";

interface DashboardCardProps {
  text: string;
  count: number;
}

const DashboardCard = ({ text, count }: DashboardCardProps) => {
  return (
    <div className="w-full bg-white flex flex-col justify-center items-center py-10 rounded-lg shadow-md">
      <HeadingText4>{text}</HeadingText4>
      <NumberHeadingText1 className="mt-4">{count}</NumberHeadingText1>
    </div>
  );
};

export default DashboardCard;
