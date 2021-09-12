import React, { Fragment, ReactNode } from "react";
import {
  UserOutlined,
  ContactsOutlined,
  RightCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { BodyText1 } from "@components/global/typography/Typography";

const RoomOwnerSection = () => {
  const renderDetailTile = (icon: ReactNode, title: string, detail: string) => (
    <Fragment>
      <div className="col-span-2 flex items-center">
        {icon}
        <BodyText1 className="font-bold ml-4">{`${title}: `}</BodyText1>
      </div>
      <div className="col-span-4">{detail}</div>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="grid grid-cols-6 mt-2" style={{ width: "70%" }}>
        {renderDetailTile(<UserOutlined />, "Name", "Master Anawat")}
        {renderDetailTile(<ContactsOutlined />, "Owner Phone", "0123456789")}
      </div>
      <div
        className="flex border-gray-200 mt-1"
        style={{
          border: "0.1px solid",
        }}
      ></div>
      <div className="grid grid-cols-6 mt-1" style={{ width: "70%" }}>
        {renderDetailTile(
          <RightCircleOutlined />,
          "Moved in since",
          "20 July 2022"
        )}
        {renderDetailTile(<CalendarOutlined />, "Room expires", "25 July 2022")}
        {renderDetailTile(
          <CalendarOutlined />,
          "Other details",
          "other details"
        )}
      </div>
    </Fragment>
  );
};

export default RoomOwnerSection;
