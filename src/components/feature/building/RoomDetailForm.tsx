import Button from "@components/global/Button";
import { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import CustomTable from "@components/global/table/Table";
import {
  HeadingText4,
  BodyText1,
} from "@components/global/typography/Typography";
import { getThNumber } from "@utils/getFormatNumber";
import { Form, Radio, Select } from "antd";
import React, { ChangeEvent, Fragment } from "react";

const { Option } = Select;

interface RoomDetailFormProps {
  eachFloor: number;
  floor: string;
  setFloor(value: string): void;
  onSelectFloorRadio(value: number): void;
  totalRoom: string;
  setTotalRoom(value: string): void;
  floorRoomList: {
    floor: number;
    totalRoom: string;
  }[];
  roomSize: string;
  setRoomSize(value: string): void;
  onChangeTotalRoomForEachFloor(value: string, floor: number): void;
  eachRoom: number;
  setEachRoom(value: number): void;
  roomType: string;
  setRoomType(value: string): void;
  onGenerateRooms(): void;
  generatedRoomList: any;
}

const RoomDetailForm = ({
  eachFloor,
  floor,
  setFloor,
  onSelectFloorRadio,
  totalRoom,
  setTotalRoom,
  floorRoomList,
  roomSize,
  setRoomSize,
  onChangeTotalRoomForEachFloor,
  eachRoom,
  setEachRoom,
  roomType,
  setRoomType,
  onGenerateRooms,
  generatedRoomList,
}: RoomDetailFormProps) => {
  const getSizeDisabled = (
    floorRoomList: {
      floor: number;
      totalRoom: string;
    }[]
  ) => {
    for (const floorRoom of floorRoomList) {
      if (!floorRoom.totalRoom) return true;
    }
    return false;
  };

  const columns = [
    {
      title: "Room No.",
      dataIndex: "roomNumber",
      width: 20,
    },
    {
      title: "Floor",
      dataIndex: "floor",
      width: 20,
    },
    {
      title: "Cost Per Month",
      dataIndex: "costPerMonth",
      width: 20,
    },
    {
      title: "Size",
      dataIndex: "size",
      width: 30,
      render: (_: any, record: any) => <div>{`${record.size} sqrms.`}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 20,
    },
  ] as any;

  return (
    <Fragment>
      <HeadingText4>Detail</HeadingText4>
      <FormCard className="grid grid-cols-8 gap-x-4 mt-4 gap-y-3">
        <Form.Item className="col-span-2">
          <TextInput
            title="Floors"
            disabled={eachFloor === 2}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (Number(e.target.value) > 20) {
                return;
              }
              setFloor(e.target.value);
            }}
            type="number"
            value={floor}
            min={1}
            max={20}
          />
        </Form.Item>
        <div className="col-span-6"></div>
        <div className="col-span-8 flex">
          <BodyText1 className="font-bold">Each floor has</BodyText1>
          <Radio.Group
            value={eachFloor}
            onChange={(e) => onSelectFloorRadio(e.target.value)}
            className="ml-3"
          >
            <Radio value={1}>Equal total room</Radio>
            <Radio value={2}>Different total room</Radio>
          </Radio.Group>
        </div>
        {eachFloor === 1 ? (
          <Form.Item className="col-span-2">
            <TextInput
              value={totalRoom}
              disabled={!floor}
              title="Total Room"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTotalRoom(e.target.value)
              }
            />
          </Form.Item>
        ) : (
          floorRoomList.map((floorRoom) => (
            <div
              className="mt-2 col-span-2"
              key={`${getThNumber(floorRoom.floor)}Room`}
            >
              <TextInput
                type="number"
                min={1}
                value={floorRoom.totalRoom}
                title={`${getThNumber(floorRoom.floor)} Floor Total Room`}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChangeTotalRoomForEachFloor(e.target.value, floorRoom.floor)
                }
              />
            </div>
          ))
        )}
        <div className="col-span-6"></div>
        <div className="col-span-8 flex">
          <BodyText1 className="font-bold">Each room has</BodyText1>
          <Radio.Group
            value={eachRoom}
            onChange={(e) => setEachRoom(e.target.value)}
            className="ml-3"
          >
            <Radio value={1}>Equal size, type</Radio>
            {/* <Radio value={2}>Different size, type</Radio> */}
          </Radio.Group>
        </div>
        <Form.Item className="col-span-2">
          <TextInput
            title="Size"
            suffix="sqrms."
            disabled={
              eachFloor === 1 ? !totalRoom : getSizeDisabled(floorRoomList)
            }
            type="number"
            min={0}
            value={roomSize}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRoomSize(e.target.value)
            }
          />
        </Form.Item>
        <div className="col-span-2">
          <Form.Item
            className="flex flex-col"
            name={["type"]}
            rules={[{ required: true }]}
          >
            <BodyText1 className="font-bold mb-2">Type</BodyText1>
            <Select
              value={roomType}
              disabled={
                eachFloor === 1 ? !totalRoom : getSizeDisabled(floorRoomList)
              }
              onChange={(value: string) => setRoomType(value)}
            >
              <Option value="2 bed, 1 toilet">2 bed, 1 toilet</Option>
              <Option value="5 bed, 2 bath and 1 toilet">
                3 bed, 2 bath and 1 toilet
              </Option>
            </Select>
          </Form.Item>
        </div>
        <div className="col-span-4"></div>
        <div className="col-span-2">
          <Button
            color="primary"
            isDisabled={!roomSize}
            onClick={onGenerateRooms}
          >
            Generate Rooms
          </Button>
        </div>
        <div className="col-span-6"></div>
        {generatedRoomList.length > 0 && (
          <CustomTable
            className="col-span-8"
            columns={columns}
            dataSource={generatedRoomList}
            defaultPageSize={5}
          />
        )}
      </FormCard>
    </Fragment>
  );
};

export default RoomDetailForm;
