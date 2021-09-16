import { BodyText1 } from "@components/global/typography/Typography";
import { roomSelector } from "@stores/rooms/selector";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const RoomDetailSection = () => {
  const room = useSelector(roomSelector);

  const {
    currentRoom: { room: roomDetail },
  } = room;

  const renderDetailTile = (title: string, detail: string) => (
    <Fragment>
      <div className="col-span-1">
        <BodyText1 className="font-bold ml-4">{title}: </BodyText1>
      </div>
      <div className="col-span-3">{detail}</div>
    </Fragment>
  );

  return (
    <div className="grid grid-cols-4 gap-y-4">
      {renderDetailTile("Type", roomDetail.type)}
      {renderDetailTile("Size", `${roomDetail.size} ${roomDetail.unit}`)}
      {renderDetailTile("Rent", `${roomDetail.pricePerMonth} THB / month`)}
    </div>
  );
};

export default RoomDetailSection;
