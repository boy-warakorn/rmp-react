import React from "react";
import { Image } from "antd";
import Card from "@components/global/Card";
import {
  HeadingText4,
  BodyText1,
} from "@components/global/typography/Typography";

const BuildingCard = () => {
  return (
    <Card className="mt-6 col-span-6 px-4 py-5 flex">
      <Image
        src="https://www.homezoomer.com/wp-content/uploads/2019/10/Larissa-Condo-Praksa-51.jpg"
        preview={false}
        alt="image"
        style={{
          minHeight: "150px",
          minWidth: "150px",
          maxWidth: "150px",
          maxHeight: "150px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div className="flex flex-col ml-4">
        <HeadingText4>Example's Building</HeadingText4>
        <BodyText1 className="text-gray-500 mt-1">
          Address: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illum perspiciatis quod dolores modi repudiandae vero
        </BodyText1>
        <BodyText1 className="text-gray-500">Floors: 17</BodyText1>
      </div>
    </Card>
  );
};

export default BuildingCard;
