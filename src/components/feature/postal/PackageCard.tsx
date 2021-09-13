import Card from "@components/global/Card";
import React, { ReactNode } from "react";
import {
  UserOutlined,
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { SubtitleText2 } from "@components/global/typography/Typography";
import Button from "@components/global/Button";

interface PackageCardProps {
  isDelivered?: boolean;
}

const PackageCard = ({ isDelivered }: PackageCardProps) => {
  const renderCardHeader = (
    icon: ReactNode,
    title: string,
    detail: string,
    author: string
  ) => (
    <div className="flex items-center">
      {icon}
      <div className="flex flex-col ml-4">
        <SubtitleText2 className="font-montserratBold text-black">
          {title} <span className="font-montserrat">{detail}</span>
        </SubtitleText2>
        <SubtitleText2 className="text-black">{author}</SubtitleText2>
      </div>
    </div>
  );

  return (
    <Card className="col-span-3 ">
      <div className="flex justify-between p-4">
        <div className="flex flex-col">
          {renderCardHeader(
            <UserOutlined style={{ fontSize: "18px" }} />,
            "Name:",
            "A75",
            "Anawat PaoYai"
          )}
          <div className="mt-3"></div>
          {renderCardHeader(
            <BookOutlined style={{ fontSize: "18px" }} />,
            "Note",
            "",
            "This is a short note"
          )}
        </div>
        <div className="self-start">
          <EditOutlined
            style={{ fontSize: "18px" }}
            className="cursor-pointer"
          />
          <DeleteOutlined
            style={{ fontSize: "18px", color: "#FF0707" }}
            className="ml-3 cursor-pointer"
          />
        </div>
      </div>

      <div
        className={`py-6 px-4 mt-9  rounded-b-lg ${
          isDelivered ? "bg-success py-8" : "bg-grey-card"
        } flex items-center justify-between`}
      >
        <SubtitleText2 className="font-montserratBold text-black">
          Arrived:{" "}
          <span className="font-roboto">20 December 2020 - 08:00 PM</span>
        </SubtitleText2>
        {isDelivered && <RightOutlined />}
        {isDelivered ? (
          <SubtitleText2 className="font-montserratBold text-black">
            Delivered:{" "}
            <span className="font-roboto">20 December 2020 - 08:00 PM</span>
          </SubtitleText2>
        ) : (
          <Button color="primary" className="font-roboto text-sm">
            Confirm Delivery
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PackageCard;
