import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import {
  BodyText1,
  HeadingText3,
} from "@components/global/typography/Typography";
import React, { Fragment } from "react";
import { Room } from "@stores/rooms/slice";
import Button from "@components/global/Button";
import OutlineButton from "@components/global/OutlineButton";

const FloorDetailSection = () => {
  const columns = [
    {
      title: "Room No.",
      dataIndex: "roomNumber",
      width: 20,
    },
    {
      title: "Size",
      dataIndex: "size",
      width: 30,
      render: (_: any, record: Room) => (
        <div>{`${record.size} ${record.unit}`}</div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 20,
    },
    {
      title: "Contract Type",
      dataIndex: "contractType",
      width: 20,
    },
    {
      title: "Rent",
      dataIndex: "rent",
      width: 30,
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 30,
      fixed: "right",
      render: (_: any, record: Room) => (
        <div className="flex">
          <OutlineButton onClick={() => {}}>Edit detail</OutlineButton>
          <Button color="danger" onClick={() => {}} className="ml-4">
            Delete
          </Button>
        </div>
      ),
    },
  ] as any;

  return (
    <Fragment>
      <HeadingText3>4th floor</HeadingText3>
      <BodyText1 className="mb-4">
        <span className="font-montserratBold">Total rooms:</span> 17 rooms
      </BodyText1>
      <HeaderTable
        buttonTitle="Add Room"
        title="All Rooms"
        haveFilter={false}
      />
      <CustomTable
        className="mt-4"
        columns={columns}
        dataSource={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
        defaultPageSize={4}
      />
    </Fragment>
  );
};

export default FloorDetailSection;
