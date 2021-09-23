import React, { Fragment, ReactNode } from "react";
import {
  UserOutlined,
  ContactsOutlined,
  RightCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  BodyText1,
  HeadingText1,
} from "@components/global/typography/Typography";
import { useSelector } from "react-redux";
import { roomSelector } from "@stores/rooms/selector";

interface RoomOwnerSectionProps {
  isOccupied: boolean;
}

const RoomOwnerSection = ({ isOccupied }: RoomOwnerSectionProps) => {
  const room = useSelector(roomSelector);

  const renderDetailTile = (icon: ReactNode, title: string, detail: string) => (
    <Fragment>
      <div className="col-span-2 flex items-center">
        {icon}
        <BodyText1 className="font-bold ml-4">{`${title}: `}</BodyText1>
      </div>
      <div className="col-span-4">{detail}</div>
    </Fragment>
  );

  const renderOccupied = () => (
    <Fragment>
      <div className="grid grid-cols-6 mt-2" style={{ width: "70%" }}>
        {renderDetailTile(
          <UserOutlined />,
          "Name",
          room.currentRoom.resident.name
        )}
        {renderDetailTile(
          <ContactsOutlined />,
          "Owner Phone",
          room.currentRoom.resident.phoneNumber
        )}
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
          room.currentRoom.room.lastMoveAt
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

  const renderUnOccupied = () => (
    <div style={{ minHeight: "150px" }} className="flex  items-center">
      <HeadingText1 className="font-montserrat italic text-grey">
        Unoccupied
      </HeadingText1>
    </div>
  );

  return (
    <Fragment>{isOccupied ? renderOccupied() : renderUnOccupied()}</Fragment>
  );
};

export default RoomOwnerSection;
