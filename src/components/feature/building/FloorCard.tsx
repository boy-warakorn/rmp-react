import Card from "@components/global/Card";
import { HeadingText4 } from "@components/global/typography/Typography";
import { getThNumber } from "@utils/getFormatNumber";
import React from "react";

interface FloorCardProps {
  isSelected?: boolean;
  isFirst?: boolean;
  floor: number;
  onClick(): void;
}

const FloorCard = ({ isSelected, isFirst, floor, onClick }: FloorCardProps) => {
  return (
    <div onClick={onClick}>
      <Card
        className={`py-8 flex items-center justify-center cursor-pointer ${
          isSelected ? "ring-2 ring-primary" : ""
        } ${!isFirst ? "mt-4" : ""}`}
      >
        <HeadingText4
          className={isSelected ? "text-primary font-montserratBold" : ""}
        >
          {getThNumber(floor)} floor
        </HeadingText4>
      </Card>
    </div>
  );
};

export default FloorCard;
