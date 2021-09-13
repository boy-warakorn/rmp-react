import { BodyText1 } from "@components/global/typography/Typography";
import React, { Fragment } from "react";

const RoomDetailSection = () => {
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
      {renderDetailTile("Type", "Suite A")}
      {renderDetailTile("Size", "35 Square meters")}
      {renderDetailTile("Rent", "1,000 THB / month")}
    </div>
  );
};

export default RoomDetailSection;
