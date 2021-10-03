import React from "react";
import Card from "@components/global/Card";
import { HeadingText4 } from "@components/global/typography/Typography";

interface BuildingCardProps {
  isSelected?: boolean;
  buildingName: string;
  onClick(): void;
}

const BuildingCard = ({
  isSelected,
  buildingName,
  onClick,
}: BuildingCardProps) => {
  return (
    <div onClick={onClick}>
      <Card
        className={`p-8 mr-6 cursor-pointer ring-1 ring-grey ${
          isSelected ? "ring-2 ring-primary " : ""
        }`}
      >
        <HeadingText4
          className={`whitespace-nowrap ${
            isSelected ? "text-primary font-montserratBold" : ""
          }`}
        >
          {buildingName} Building
        </HeadingText4>
      </Card>
    </div>
  );
};

export default BuildingCard;
