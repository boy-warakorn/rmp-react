import Card from "@components/global/Card";
import { HeadingText4 } from "@components/global/typography/Typography";
import React from "react";

interface FloorCardProps {
  isSelected?: boolean;
  isFirst?: boolean;
}

const FloorCard = ({ isSelected, isFirst }: FloorCardProps) => {
  return (
    <Card
      className={`py-8 flex items-center justify-center cursor-pointer ${
        isSelected ? "ring-2 ring-primary" : ""
      } ${!isFirst ? "mt-4" : ""}`}
    >
      <HeadingText4
        className={isSelected ? "text-primary font-montserratBold" : ""}
      >
        4th floor
      </HeadingText4>
    </Card>
  );
};

export default FloorCard;
