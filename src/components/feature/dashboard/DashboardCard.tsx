import {
  HeadingText3,
  NumberHeadingText1,
} from "@components/global/typography/Typography";
import styled from "@emotion/styled";
import React from "react";
import tw from "twin.macro";

interface DashboardCardProps {
  text: string;
  count: number;
}

const Card = styled.div`
  ${tw`w-full bg-white flex flex-col justify-center items-center py-10 rounded-lg shadow-md`}
`;

const DashboardCard = ({ text, count }: DashboardCardProps) => {
  return (
    <Card>
      <HeadingText3>{text}</HeadingText3>
      <NumberHeadingText1 className="mt-4">{count}</NumberHeadingText1>
    </Card>
  );
};

export default DashboardCard;
