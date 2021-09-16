import RoomOwnerSection from "@components/feature/room/RoomOwnerSection";
import Card from "@components/global/Card";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { DeleteOutlined } from "@ant-design/icons";
import Button from "@components/global/Button";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import RoomDetailSection from "@components/feature/room/RoomDetailSection";
import TextButton from "@components/global/TextButton";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import { Tabs } from "antd";
import HeaderTable from "@components/global/table/HeaderTable";
import PackageCard from "@components/feature/postal/PackageCard";
import CustomTable from "@components/global/table/Table";
import OutlineButton from "@components/global/OutlineButton";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { RoomRepository } from "@repository/RoomRepository";
import Loading from "@components/global/Loading";
import { useDispatch, useSelector } from "react-redux";
import { roomSelector } from "@stores/rooms/selector";
import { setCurrentRoom } from "@stores/rooms/slice";

const { TabPane } = Tabs;

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const room = useSelector(roomSelector);
  const dispatch = useDispatch();

  const roomRepository = RepositoriesFactory.get("room") as RoomRepository;

  useEffect(() => {
    fetchCurrentRoom();
  }, []);

  const fetchCurrentRoom = async () => {
    try {
      setIsLoading(true);
      const result = await roomRepository.getRoom(id);
      if (result) {
        dispatch(setCurrentRoom(result));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);
    await roomRepository.deleteRoomOwner(id);
    fetchCurrentRoom();
  };

  const columns = [
    {
      title: "Issue time",
      dataIndex: "issueTime",
      width: 50,
    },
    {
      title: "Amount (THB)",
      dataIndex: "amount",
      width: 50,
    },
    {
      title: "Type ",
      dataIndex: "type",
      width: 50,
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 50,
      fixed: "right",
      render: (_: any, record: any) => (
        <div className="flex">
          {record.isConfirm ? (
            <BodyText1 className="text-success">Confirmed</BodyText1>
          ) : (
            <div className="flex items-center">
              <OutlineButton onClick={() => {}}>Confirm</OutlineButton>
              <DeleteOutlined
                style={{ fontSize: "16px", color: "#FF0707" }}
                className="ml-2 cursor-pointer"
              />
            </div>
          )}
        </div>
      ),
    },
  ] as any;

  return isLoading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Room: {id}</HeadingText3>
      </div>
      <Card className="col-span-8 p-6 ">
        <div>
          <HeadingText4>Owner Detail</HeadingText4>
          <RoomOwnerSection
            isOccupied={room.currentRoom.status === "occupied"}
          />
        </div>
        <div className="flex mt-2 justify-end">
          {room.currentRoom.status === "occupied" ? (
            <Fragment>
              <Button
                className="mr-2"
                onClick={() => history.push(`/rooms/${id}/owner/edit`)}
              >
                Edit Owner
              </Button>
              <Button color="danger" onClick={onDelete}>
                Move out
              </Button>
            </Fragment>
          ) : (
            <Button
              color="primary"
              onClick={() => history.push(`/rooms/${id}/owner/add`)}
            >
              Add Owner
            </Button>
          )}
        </div>
      </Card>
      <Card className="col-span-4 p-6 flex flex-col justify-between">
        <RoomDetailSection />
        <div className="self-end" style={{ width: "max-content" }}>
          <TextButton
            className="text-primary"
            title="Edit Detail"
            onClick={() => history.push(`/rooms/${id}/edit`)}
          />
        </div>
      </Card>
      <CustomTabs className="col-span-12 mt-6">
        <TabPane tab="packages" key="1">
          <TabCard>
            <HeaderTable
              title="All Packages"
              buttonTitle="New package"
              onClick={() => history.push("/packages/add")}
            />
            <div className="mt-6 grid grid-cols-6 gap-6">
              <PackageCard />
              <PackageCard />
              <PackageCard isDelivered />
            </div>
          </TabCard>
        </TabPane>
        <TabPane tab="payments" key="2">
          <TabCard>
            <HeaderTable
              title="All Payments"
              buttonTitle="New invoice"
              onClick={() => history.push("/payments/add")}
            />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={[
                {
                  key: "3",
                  issueTime: "20 July 2020 at 08:00 PM",
                  amount: 30000,
                  type: "Common Charge",
                  index: 2,
                  isConfirm: true,
                },
                {
                  key: "4",
                  issueTime: "20 July 2020 at 08:00 PM",
                  amount: 1500,
                  type: "Rent",
                  index: 3,
                  isConfirm: false,
                },
              ]}
            />
          </TabCard>
        </TabPane>
      </CustomTabs>
    </Fragment>
  );
};

export default RoomDetail;
