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
import { notification, Tabs } from "antd";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import OutlineButton from "@components/global/OutlineButton";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { RoomRepository } from "@repository/RoomRepository";
import Loading from "@components/global/Loading";
import { useDispatch, useSelector } from "react-redux";
import { roomSelector } from "@stores/rooms/selector";
import { setCurrentRoom } from "@stores/rooms/slice";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { isObjectEmpty } from "@utils/isObjEmpty";
import confirm from "antd/lib/modal/confirm";
import { PackageRepository } from "@repository/PackageRepository";
import { packageSelector } from "@stores/packages/selector";
import { setPackages } from "@stores/packages/slice";
import PackageTable from "@components/feature/postal/PackageTable";
import { userSelector } from "@stores/user/selector";

const { TabPane } = Tabs;

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const room = useSelector(roomSelector);
  const postal = useSelector(packageSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const roomRepository = RepositoriesFactory.get("room") as RoomRepository;
  const packageRepository = RepositoriesFactory.get(
    "package"
  ) as PackageRepository;

  useEffect(() => {
    fetchCurrentRoom();
    // eslint-disable-next-line
  }, []);

  const fetchCurrentRoom = async () => {
    try {
      setIsLoading(true);
      const result = await roomRepository.getRoom(id);
      const postals = await packageRepository.getPackages("-", id);
      if (result && postals) {
        dispatch(setCurrentRoom(result));
        dispatch(setPackages(postals));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    confirm({
      title: "Do you want to delete room owner?",
      icon: <ExclamationCircleOutlined />,
      content: "If you confirm, Resident account will be disabled.",
      onOk() {
        confirmDelete();
      },
      width: "40vw",
    });
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      await roomRepository.deleteRoomOwner(id);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Delete Room owner Success`,
      });
      fetchCurrentRoom();
    } catch (error) {
      setIsLoading(false);
      notification.error({
        duration: 2,
        message: "Error",
        description: `Can't delete because this room currently have package and payment.`,
      });
    }
  };
  const onDeleteRoom = async () => {
    confirm({
      title: "Do you want to delete this room?",
      icon: <ExclamationCircleOutlined />,
      content: "If you confirm, This room will be deleted.",
      onOk() {
        confirmDeleteRoom();
      },
      width: "40vw",
    });
  };

  const confirmDeleteRoom = async () => {
    try {
      setIsLoading(true);
      await roomRepository.deleteRoomOwner(id);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Delete Room Success`,
      });
      fetchCurrentRoom();
    } catch (error) {
      setIsLoading(false);
      notification.error({
        duration: 2,
        message: "Error",
        description: `Can't delete because this room have room owner.`,
      });
    }
  };

  const confirmDeletePackage = async (id: string) => {
    try {
      setIsLoading(true);
      await packageRepository.deletePackage(id);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Delete delivery Success`,
      });
      fetchCurrentRoom();
    } catch (error) {
      setIsLoading(false);
      notification.error({
        duration: 2,
        message: "Error",
        description: `${error}`,
      });
    }
  };

  const onConfirmOrDeleteDelivery = async (id: string, isConfirm: boolean) => {
    try {
      if (isConfirm) {
        setIsLoading(true);
        await packageRepository.confirmPackage(id);
        notification.success({
          duration: 2,
          message: "Success",
          description: `${isConfirm ? "Confirm" : "Delete"} delivery Success`,
        });
        fetchCurrentRoom();
      } else {
        confirm({
          title: "Do you want to delete this package?",
          icon: <ExclamationCircleOutlined />,
          onOk() {
            confirmDeletePackage(id);
          },
          width: "40vw",
        });
      }
    } catch (error) {
      setIsLoading(false);
      notification.error({
        duration: 2,
        message: "Error",
        description: `${error}`,
      });
    }
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

  return isLoading || isObjectEmpty(room.currentRoom) ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6 flex justify-between">
        <HeadingText3>Room: {id}</HeadingText3>
        <Button className="mr-2" color="danger" onClick={onDeleteRoom}>
          Delete Room
        </Button>
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
      {user.role !== "admin" && (
        <CustomTabs className="col-span-12 mt-6">
          <TabPane tab="Packages" key="1">
            <TabCard>
              <HeaderTable
                title="All Packages"
                buttonTitle="New package"
                onClick={() => history.push("/packages/add")}
              />
              <PackageTable
                content={postal.packages}
                loading={isLoading}
                onConfirm={onConfirmOrDeleteDelivery}
              />
            </TabCard>
          </TabPane>
          <TabPane tab="Payments" key="2">
            <TabCard>
              <HeaderTable title="All Payments" />
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
      )}
    </Fragment>
  );
};

export default RoomDetail;
