import RoomOwnerSection from "@components/feature/room/RoomOwnerSection";
import Card from "@components/global/Card";
import {
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import Button from "@components/global/Button";
import React, { Fragment } from "react";
import { useParams } from "react-router";
import RoomDetailSection from "@components/feature/room/RoomDetailSection";
import TextButton from "@components/global/TextButton";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Room: {id}</HeadingText3>
      </div>
      <Card className="col-span-8 p-6 ">
        <div>
          <HeadingText4>Owner Detail</HeadingText4>
          <RoomOwnerSection />
        </div>
        <div className="flex mt-2 justify-end">
          <Button className="mr-2">Edit Owner</Button>
          <Button color="danger">Move out</Button>
        </div>
      </Card>
      <Card className="col-span-4 p-6 flex flex-col justify-between">
        <RoomDetailSection />
        <div className="self-end" style={{ width: "max-content" }}>
          <TextButton className="text-primary" title="Edit Detail" />
        </div>
      </Card>
    </Fragment>
  );
};

export default RoomDetail;
