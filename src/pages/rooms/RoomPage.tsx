import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import HeaderTable from "@components/global/table/HeaderTable";
// import Button from "@components/global/Button";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import OutlineButton from "@components/global/OutlineButton";
import CustomTable from "@components/global/table/Table";
import { useHistory } from "react-router";
import RepositoryFactory from "@repository/RepositoryFactory";
import { RoomRepository } from "@repository/RoomRepository";
import { useDispatch, useSelector } from "react-redux";
import { Room, setRooms } from "@stores/rooms/slice";
import { roomSelector } from "@stores/rooms/selector";
import { filterSelector } from "@stores/filters/selector";

const { TabPane } = Tabs;

const tabList = [
  { key: "-", title: "All" },
  { key: "occupied", title: "Occupied" },
  { key: "unoccupied", title: "Unoccupied" },
];

const RoomPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const room = useSelector(roomSelector);
  const filter = useSelector(filterSelector);
  const roomRepository = RepositoryFactory.get("room") as RoomRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  useEffect(() => {
    fetchRoom();

    // eslint-disable-next-line
  }, [currentTabKey, filter.filterRoomNumber]);

  const fetchRoom = async () => {
    try {
      setIsLoading(true);
      const rooms = await roomRepository.getRooms(
        currentTabKey,
        filter.filterRoomNumber
      );

      if (rooms) {
        dispatch(setRooms(rooms));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Room No.",
      dataIndex: "roomNumber",
      width: 50,
    },
    {
      title: "Contract type",
      dataIndex: "contractType",
      width: 70,
      render: (value: string) =>
        value === "unoccupied" ? (
          <div className="text-base italic text-grey">{value}</div>
        ) : (
          "rent"
        ),
    },
    {
      title: "Packages",
      dataIndex: "packages",
      width: 50,
    },
    {
      title: "Payments status",
      dataIndex: "paymentStatus",
      width: 70,
      render: (value: string) =>
        value === "All Paid" ? (
          <div className="text-success">{value}</div>
        ) : (
          <div className="text-error">{value}</div>
        ),
    },
    {
      title: "Last move at",
      dataIndex: "lastMoveAt",
      width: 100,
    },
    {
      title: "Size",
      dataIndex: "size",
      width: 70,
      render: (_: any, record: Room) => (
        <div>{`${record.size} ${record.unit}`}</div>
      ),
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 65,
      fixed: "right",
      render: (_: any, record: Room) => (
        <div className="flex">
          <OutlineButton
            onClick={() => history.push(`/rooms/${record.roomNumber}`)}
          >
            View detail
          </OutlineButton>
        </div>
      ),
    },
  ] as any;

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs onChange={onChangeTab}>
        {tabList.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            <TabCard>
              <HeaderTable
                title={`${tab.title} Rooms`}
                buttonTitle="Add Room"
                onClick={() => history.push("/rooms/add")}
              />
              <CustomTable
                loading={isLoading}
                className="mt-6"
                columns={columns}
                dataSource={room.rooms}
              />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
    </div>
  );
};

export default RoomPage;
