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
import { useHistory } from "react-router";
import { Package } from "@repository/PackageRepository";
import dayjs from "dayjs";

interface PackageCardProps {
  postal: Package;
  onConfirm(id: string, isConfirm: boolean): void;
}

const PackageCard = ({ postal, onConfirm }: PackageCardProps) => {
  const history = useHistory();

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
    <Card className="col-span-3 flex flex-col justify-between">
      <div className="flex justify-between p-4">
        <div className="flex flex-col" style={{ maxWidth: "70%" }}>
          {renderCardHeader(
            <UserOutlined style={{ fontSize: "18px" }} />,
            "Name:",
            postal.roomNumber,
            postal.roomOwner ?? "No Owner"
          )}
          <div className="mt-3"></div>
          {renderCardHeader(
            <BookOutlined style={{ fontSize: "18px" }} />,
            "Note",
            "",
            !postal.note ? "-" : postal.note
          )}
        </div>
        <div className="self-start">
          {postal.status !== "received" ? (
            <EditOutlined
              style={{ fontSize: "18px" }}
              className="cursor-pointer"
              onClick={() => history.push(`/packages/${postal.id}/edit`)}
            />
          ) : null}
          <DeleteOutlined
            onClick={() => onConfirm(postal.id, false)}
            style={{ fontSize: "18px", color: "#FF0707" }}
            className="ml-3 cursor-pointer"
          />
        </div>
      </div>
      <div
        className={`py-6 px-2 mt-9  rounded-b-lg ${
          postal.status === "received" ? "bg-success py-8" : "bg-grey-card "
        } flex items-center justify-between`}
      >
        <SubtitleText2 className="font-montserratBold text-black">
          Arrived:{" "}
          <span className="font-roboto">
            {dayjs(postal.arrivedAt).format("YYYY-MM-DD HH:mm A")}
          </span>
        </SubtitleText2>
        {postal.status === "received" && <RightOutlined />}
        {postal.status === "received" ? (
          <SubtitleText2 className="font-montserratBold text-black">
            Delivered:{" "}
            <span className="font-roboto">
              {" "}
              {dayjs(postal.deliveredAt).format("YYYY-MM-DD HH:mm A")}
            </span>
          </SubtitleText2>
        ) : (
          <Button
            color="primary"
            className="font-roboto text-sm"
            onClick={() => onConfirm(postal.id, true)}
          >
            Confirm Delivery
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PackageCard;
