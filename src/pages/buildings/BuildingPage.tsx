import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { Empty, notification, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Button from "@components/global/Button";
import React, { Fragment, useEffect, useState } from "react";
import Card from "@components/global/Card";
import FloorCard from "@components/feature/building/FloorCard";
import FloorDetailSection from "@components/feature/building/FloorDetailSection";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { buildingSelector } from "@stores/buildings/selector";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { BuildingRepository } from "@repository/BuildingRepository";
import {
  setCurrentBuilding,
  setCurrentFloorRooms,
} from "@stores/buildings/slice";
import DashboardCard from "@components/feature/dashboard/DashboardCard";
import confirm from "antd/lib/modal/confirm";
import { RoomRepository } from "@repository/RoomRepository";

const BuildingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const building = useSelector(buildingSelector);
  const buildingRepository = RepositoriesFactory.get(
    "building"
  ) as BuildingRepository;
  const roomRepository = RepositoriesFactory.get("room") as RoomRepository;
  const [currentBuildingId, setCurrentBuildingId] = useState("");
  const [currentFloor, setCurrentFloor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  useEffect(() => {
    fetchBuilding();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentFloor) {
      fetchRoomInFloor();
    }
    // eslint-disable-next-line
  }, [currentFloor]);

  const fetchBuilding = async () => {
    try {
      setIsLoading(true);
      const building = await buildingRepository.getBuilding();

      if (building) {
        setCurrentBuildingId(building.id);
        dispatch(setCurrentBuilding(building));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoomInFloor = async () => {
    try {
      setIsTableLoading(true);
      const rooms =
        await buildingRepository.getRoomsFromSpecificFloorAndBuilding(
          currentBuildingId,
          currentFloor
        );
      if (rooms) {
        dispatch(setCurrentFloorRooms(rooms));
      }
    } catch (error) {
    } finally {
      setIsTableLoading(false);
    }
  };

  const onSelectFloor = (id: number) => {
    if (Number(currentFloor) !== id) {
      setCurrentFloor(`${id}`);
    } else {
      setCurrentFloor(``);
    }
  };

  const generateArrayFromFloor = (floors: number) => {
    const array = [];
    for (let index = Number(floors); index > 0; index--) {
      array.push(index);
    }

    return array;
  };

  const onDeleteBuilding = async () => {
    confirm({
      title: "Do you want to delete this building?",
      icon: <ExclamationCircleOutlined />,
      content: "If you confirm, This building will be deleted.",
      onOk() {
        confirmDeleteBuilding();
      },
      okType: "danger",
      width: "40vw",
    });
  };

  const confirmDeleteBuilding = async () => {
    try {
      setIsLoading(true);
      await buildingRepository.deleteBuilding(currentBuildingId);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Delete Building Success`,
      });
      setCurrentFloor("");
      fetchBuilding();
    } catch (error) {
      notification.error({
        duration: 2,
        message: "Error",
        description: `Can't delete because this building have occupied room.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteRoom = (roomNumber: string) => {
    confirm({
      title: "Do you want to delete this room?",
      icon: <ExclamationCircleOutlined />,
      content: "If you confirm, This room will be deleted.",
      onOk() {
        confirmDeleteRoom(roomNumber);
      },
      okType: "danger",
      width: "40vw",
    });
  };

  const confirmDeleteRoom = async (roomNumber: string) => {
    try {
      setIsTableLoading(true);
      await roomRepository.deleteRoom(roomNumber);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Delete Room Success`,
      });
      fetchRoomInFloor();
    } catch (error) {
      setIsTableLoading(false);
      notification.error({
        duration: 2,
        message: "Error",
        description: `Can't delete because this room was occupied by resident`,
      });
    }
  };

  return (
    <Fragment>
      {building.currentBuilding.buildingName ? (
        isLoading ? (
          <div
            style={{ minHeight: "30vh" }}
            className="col-span-12 flex justify-center items-center"
          >
            <Spin size="large" />
          </div>
        ) : (
          <Fragment>
            <Card className="rounded-b-none col-span-12 p-6 ">
              <HeadingText3>Building Detail</HeadingText3>

              <HeadingText4 className="mt-2">
                <span className="font-montserratBold">Building name:</span>{" "}
                {building.currentBuilding.buildingName}
              </HeadingText4>
              <BodyText1>
                <span className="font-montserratBold">Room prefix:</span>{" "}
                {building.currentBuilding.roomPrefix}
              </BodyText1>
              <BodyText1>
                <span className="font-montserratBold">Base common charge:</span>{" "}
                {building.currentBuilding.baseCommonCharge}
              </BodyText1>
              <BodyText1>
                <span className="font-montserratBold">Address:</span>{" "}
                {building.currentBuilding.address}
              </BodyText1>
              <BodyText1>
                <span className="font-montserratBold">Floor:</span>{" "}
                {building.currentBuilding.floors} floors
              </BodyText1>
              <div className="flex justify-end">
                <Button
                  color="danger"
                  className="mr-4"
                  onClick={onDeleteBuilding}
                >
                  Delete building
                </Button>
                {/* <Button color="primary">Edit building detail</Button> */}
              </div>
            </Card>
            <Card
              className="col-span-12 rounded-t-none bg-card-bg flex"
              style={{ height: "55vh" }}
            >
              <div className="w-64 bg-background-dark rounded-bl-lg p-4 overflow-y-scroll">
                <HeadingText4 className="text-center text-white">
                  Select floor
                </HeadingText4>
                {generateArrayFromFloor(building.currentBuilding.floors).map(
                  (floor) => (
                    <FloorCard
                      floor={floor}
                      isSelected={`${floor}` === currentFloor}
                      isFirst={floor === building.currentBuilding.floors}
                      onClick={() => onSelectFloor(floor)}
                    />
                  )
                )}
              </div>
              <div className="p-4 w-full overflow-y-scroll">
                {isTableLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Spin />
                  </div>
                ) : !currentFloor ? (
                  <div className="grid grid-cols-8 gap-y-4 gap-x-6">
                    <HeadingText3 className="col-span-8">
                      Overall Room Detail
                    </HeadingText3>
                    <div className="col-span-4">
                      <DashboardCard
                        text="Total Room"
                        count={building.currentBuilding.totalRoom}
                      />
                    </div>
                    <div className="col-span-4">
                      <DashboardCard
                        text="Occupied Room"
                        count={building.currentBuilding.totalOccupiedRoom}
                      />
                    </div>
                  </div>
                ) : (
                  <FloorDetailSection
                    onDeleteRoom={onDeleteRoom}
                    currentFloor={currentFloor}
                    onClose={() => setCurrentFloor("")}
                  />
                )}
              </div>
            </Card>
          </Fragment>
        )
      ) : (
        <Card
          className="flex justify-center items-center col-span-12"
          style={{ minHeight: "40vh" }}
        >
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 150,
            }}
            description={
              <Fragment>
                <HeadingText4 className="text-grey font-montserratBold">
                  Please add building first
                </HeadingText4>
                <Button
                  className="col-span-2 mt-2"
                  color="primary"
                  onClick={() => history.push("/buildings/add")}
                >
                  Add Building
                </Button>
              </Fragment>
            }
          />
        </Card>
      )}
    </Fragment>
  );
};

export default BuildingPage;
