import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import {
  BodyText1,
  HeadingText3,
} from "@components/global/typography/Typography";
import React, { Fragment } from "react";
import Button from "@components/global/Button";
import OutlineButton from "@components/global/OutlineButton";
import { useSelector } from "react-redux";
import { buildingSelector } from "@stores/buildings/selector";
import { getThNumber } from "@utils/getFormatNumber";
import { CloseOutlined } from "@ant-design/icons";
import { FormattedRoomInBuilding } from "@stores/buildings/slice";

export interface FloorDetailSectionProps {
  currentFloor: string;
  onClose(): void;
  onDeleteRoom(roomNumber: string): void;
}

const FloorDetailSection = ({
  currentFloor,
  onClose,
  onDeleteRoom,
}: FloorDetailSectionProps) => {
  const building = useSelector(buildingSelector);

  const columns = [
    {
      title: "Room No.",
      dataIndex: "roomNumber",
      width: 20,
    },
    {
      title: "Size",
      dataIndex: "size",
      width: 15,
      render: (_: any, record: FormattedRoomInBuilding) => (
        <div>{`${record.size} sqrms.`}</div>
      ),
    },
    {
      title: "Contract type",
      dataIndex: "contractType",
      width: 20,
      render: (value: string) =>
        value === "unoccupied" ? (
          <div className="text-base italic text-grey">{value}</div>
        ) : (
          "rent"
        ),
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 20,
    },
    {
      title: "Purchase price",
      dataIndex: "purchasePrice",
      width: 20,
      render: (_: any, record: FormattedRoomInBuilding) => (
        <div>{`${record.purchasePrice} Baht`}</div>
      ),
    },
    {
      title: "Cost Per Month",
      dataIndex: "costPerMonth",
      width: 20,
      render: (_: any, record: FormattedRoomInBuilding) => (
        <div>{`${record.costPerMonth} Baht`}</div>
      ),
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 30,
      fixed: "right",
      render: (_: any, record: FormattedRoomInBuilding) => (
        <div className="flex">
          <OutlineButton onClick={() => {}}>Edit detail</OutlineButton>
          {record.contractType !== " rent" && (
            <Button
              color="danger"
              onClick={() => onDeleteRoom(record.roomNumber)}
              className="ml-4"
            >
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ] as any;

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <HeadingText3>{getThNumber(Number(currentFloor))} floor</HeadingText3>
        <CloseOutlined
          style={{ fontSize: "24px" }}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <BodyText1 className="mb-4">
        <span className="font-montserratBold">Total rooms:</span>{" "}
        {building.currentFloorRooms.length} rooms
      </BodyText1>
      <HeaderTable
        // buttonTitle="Add Room"
        title="All Rooms"
        haveFilter={false}
        // onClick={() => history.push("/rooms/add")}
      />
      <CustomTable
        className="mt-4"
        columns={columns}
        dataSource={building.currentFloorRooms}
        defaultPageSize={4}
      />
    </Fragment>
  );
};

export default FloorDetailSection;
