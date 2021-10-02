import Card from "@components/global/Card";
import { HeadingText3 } from "@components/global/typography/Typography";
import { Steps, Form, Divider, notification } from "antd";
import Button from "@components/global/Button";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import GeneralDetailForm from "@components/feature/building/GeneralDetailForm";

import RoomDetailForm, {
  getSizeDisabled,
} from "@components/feature/building/RoomDetailForm";

const { Step } = Steps;

export interface GeneralDetail {
  buildingName: string;
  roomPrefix: string;
  baseCommonCharge: string;
  address: string;
  costPerMonth: string;
}

const AddBuildingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [floor, setFloor] = useState("");
  const [eachFloor, setEachFloor] = useState(1);
  const [eachRoom, setEachRoom] = useState(1);
  const [floorRoomList, setFloorRoomList] = useState<
    {
      floor: number;
      totalRoom: string;
    }[]
  >([] as any);
  const [totalRoom, setTotalRoom] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [generalDetails, setGeneralDetails] = useState<GeneralDetail>({
    buildingName: "",
    roomPrefix: "",
    baseCommonCharge: "",
    address: "",
    costPerMonth: "",
  });
  const [roomType, setRoomType] = useState("2 bed, 1 toilet");
  const [generatedRoomList, setGeneratedRoomList] = useState<any>([]);
  const [roomPayload, setRoomPayload] = useState<any>(undefined);
  const totalRoomNotValid =
    eachFloor === 1 ? !totalRoom : getSizeDisabled(floorRoomList);
  const notValid =
    !floor || !roomSize || totalRoomNotValid || generatedRoomList.length < 1;

  useEffect(() => {
    setGeneratedRoomList([]);
  }, [floor]);

  useEffect(() => {
    if (eachFloor === 1) {
      setFloorRoomList([]);
    } else {
      const floorCount = Number(floor);
      const newFloorRoomList = [];
      for (let index = 1; index <= floorCount; index++) {
        newFloorRoomList.push({
          floor: index,
          totalRoom: "",
        });
      }
      setFloorRoomList(newFloorRoomList);
    }
    // eslint-disable-next-line
  }, [eachFloor]);

  const isBtnDisabled =
    !generalDetails.address ||
    !generalDetails.baseCommonCharge ||
    !generalDetails.roomPrefix ||
    !generalDetails.buildingName;

  const onNextStep = () => {
    if (currentStep !== 1) setCurrentStep(currentStep + 1);
  };

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof GeneralDetail
  ) => setGeneralDetails({ ...generalDetails, [name]: e.target.value });

  const onSelectFloorRadio = (value: number) => {
    if (!floor) {
      notification.error({
        duration: 2,
        message: "Error",
        description: "Please enter floor before select this one",
      });
      return;
    }
    setEachFloor(value);
  };

  const onChangeTotalRoomForEachFloor = (value: string, floor: number) => {
    if (Number(value) > 20) return;
    let newFloorRoom = floorRoomList.find(
      (floorRoom) => floorRoom.floor === floor
    )!;
    newFloorRoom.totalRoom = value;
    const deletedFloor = floorRoomList.filter(
      (floorRoom) => floorRoom.floor !== floor
    );
    const newFloorRoomList = [...deletedFloor, newFloorRoom].sort(
      (a, b) => a.floor - b.floor
    );

    setFloorRoomList(newFloorRoomList);
  };

  const onGenerateRooms = () => {
    let generatedRoomList = [];

    for (let index = 1; index <= Number(floor); index++) {
      let generatedRoomInFloor = [];

      const newTotalRoom =
        eachFloor === 1
          ? Number(totalRoom)
          : Number(floorRoomList[index - 1].totalRoom);
      for (let i = 1; i <= newTotalRoom; i++) {
        let newRoomSuffix = "";
        if (i < 100 && i >= 10) {
          newRoomSuffix = `${index}` + i;
        } else {
          newRoomSuffix = index + "0" + i;
        }

        const newRoom = {
          floor: index,
          roomNumber: generalDetails.roomPrefix.concat(newRoomSuffix),
          size: roomSize,
          type: roomType,
          costPerMonth: generalDetails.costPerMonth,
          unit: "sqrms.",
        };
        generatedRoomInFloor.push(newRoom);
      }

      generatedRoomList.push(...generatedRoomInFloor);
    }
    setRoomPayload(generatedRoomList);
    setGeneratedRoomList(
      generatedRoomList.map((room, index) => ({
        floor: room.floor,
        roomNumber: room.roomNumber,
        size: room.size,
        type: room.type,
        costPerMonth: room.costPerMonth,
        index: index,
        key: `generateRoom${index}`,
      }))
    );
  };

  const onSubmit = () => {
    const createBuildingDto = {
      buildingName: generalDetails.buildingName,
      defaultCostPerMonth: generalDetails.costPerMonth,
      baseCommonCharge: generalDetails.baseCommonCharge,
      address: generalDetails.address,
      roomPrefix: generalDetails.roomPrefix,
      rooms: roomPayload,
      floors: floor,
    };
  };

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Add Building</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <Steps
          current={currentStep}
          className="px-28"
          onChange={
            isBtnDisabled ? () => {} : (current) => setCurrentStep(current)
          }
        >
          <Step
            title="General Building Detail"
            className="font-montserratMedium"
          />
          <Step
            title="Room Building Detail"
            className="font-montserratMedium"
          />
        </Steps>
        <Divider />
        <Form className="mt-6">
          {currentStep === 0 ? (
            <GeneralDetailForm
              generalDetails={generalDetails}
              onInputChange={onInputChange}
            />
          ) : (
            <RoomDetailForm
              eachFloor={eachFloor}
              floor={floor}
              floorRoomList={floorRoomList}
              totalRoom={totalRoom}
              generatedRoomList={generatedRoomList}
              roomSize={roomSize}
              eachRoom={eachRoom}
              roomType={roomType}
              setFloor={(value: string) => setFloor(value)}
              onSelectFloorRadio={(value: number) => onSelectFloorRadio(value)}
              setTotalRoom={(value: string) => setTotalRoom(value)}
              onGenerateRooms={onGenerateRooms}
              setRoomSize={(value: string) => setRoomSize(value)}
              setEachRoom={(value: number) => setEachRoom(value)}
              onChangeTotalRoomForEachFloor={(value: string, floor: number) =>
                onChangeTotalRoomForEachFloor(value, floor)
              }
              setRoomType={(value: string) => setRoomType(value)}
            />
          )}
        </Form>
        <div className="flex justify-end mt-9">
          {currentStep !== 0 && (
            <Button
              color="primary"
              className="px-12 font-roboto text-sm mr-4"
              htmlType="submit"
              onClick={onPrevStep}
            >
              Prev
            </Button>
          )}

          <Button
            color="primary"
            className="px-12 font-roboto text-sm"
            onClick={
              isBtnDisabled
                ? () => {}
                : currentStep === 1
                ? onSubmit
                : onNextStep
            }
            isDisabled={currentStep === 1 ? notValid : isBtnDisabled}
          >
            {currentStep === 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default AddBuildingPage;
