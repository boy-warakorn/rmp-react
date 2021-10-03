import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { Empty, Input, notification, Spin } from "antd";
import {
  SearchOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Button from "@components/global/Button";
import React, { Fragment, useEffect, useState } from "react";
import BuildingCard from "@components/feature/building/BuildingCard";
import Card from "@components/global/Card";
import FloorCard from "@components/feature/building/FloorCard";
import FloorDetailSection from "@components/feature/building/FloorDetailSection";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { buildingSelector } from "@stores/buildings/selector";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { BuildingRepository } from "@repository/BuildingRepository";
import {
  clearState,
  setBuildings,
  setCurrentBuilding,
  setCurrentFloorRooms,
} from "@stores/buildings/slice";
import Loading from "@components/global/Loading";
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
  const [isInnerLoading, setIsInnerLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  useEffect(() => {
    if (building.currentBuildingId && building.currentFloor) {
      setCurrentBuildingId(building.currentBuildingId);
      setCurrentFloor(building.currentFloor);
      dispatch(clearState());
    }
    fetchBuildings();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentBuildingId) {
      fetchBuilding();
    }
    // eslint-disable-next-line
  }, [currentBuildingId]);

  useEffect(() => {
    if (currentFloor) {
      fetchRoomInFloor();
    }
    // eslint-disable-next-line
  }, [currentFloor]);

  const fetchBuildings = async () => {
    try {
      setIsLoading(true);
      const buildings = await buildingRepository.getBuildings();
      if (buildings) {
        dispatch(setBuildings(buildings));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBuilding = async () => {
    try {
      setIsInnerLoading(true);
      const building = await buildingRepository.getBuilding(currentBuildingId);

      if (building) {
        dispatch(setCurrentBuilding(building));
      }
    } catch (error) {
    } finally {
      setIsInnerLoading(false);
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

  const onSelectBuilding = (id: string) => {
    setCurrentFloor("");
    if (currentBuildingId !== id) {
      setCurrentBuildingId(id);
    } else {
      setCurrentBuildingId("");
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
      setCurrentBuildingId("");
      setCurrentFloor("");
      fetchBuildings();
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
      <Card className="col-span-12 flex flex-col p-6 mt-3 mb-4">
        <HeadingText4 className="col-span-12">Buildings List</HeadingText4>
        <div className="mt-3 flex justify-between">
          <Input
            placeholder="Search by building name"
            prefix={<SearchOutlined />}
            style={{ width: "30%" }}
          />
          <Button
            className="col-span-2"
            color="primary"
            onClick={() => history.push("/buildings/add")}
          >
            Add Building
          </Button>
        </div>
        <div className="flex overflow-x-scroll w-full p-3 mt-3">
          {isLoading ? (
            <Loading />
          ) : (
            building.buildings.map((building) => (
              <BuildingCard
                onClick={() => onSelectBuilding(building.id)}
                buildingName={building.buildingName}
                isSelected={currentBuildingId === building.id}
              />
            ))
          )}
        </div>
      </Card>
      {currentBuildingId ? (
        isInnerLoading ? (
          <div
            style={{ minHeight: "30vh" }}
            className="col-span-12 flex justify-center items-center"
          >
            <Spin size="large" />
          </div>
        ) : (
          <Fragment>
            <Card className="rounded-b-none col-span-12 p-6 ">
              <div className="flex justify-between">
                <HeadingText3>Building Detail</HeadingText3>
                <CloseOutlined
                  style={{ fontSize: "24px" }}
                  className="cursor-pointer"
                  onClick={() => setCurrentBuildingId("")}
                />
              </div>
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
              <HeadingText4 className="text-grey font-montserratBold">
                {building.buildings.length < 1
                  ? "Please add building"
                  : "Please select building"}
              </HeadingText4>
            }
          />
        </Card>
      )}
    </Fragment>
  );
};

export default BuildingPage;
