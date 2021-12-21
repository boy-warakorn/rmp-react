import RoomOwnerSection from "@components/feature/room/RoomOwnerSection";
import Card from "@components/global/Card";
import {
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import Button from "@components/global/Button";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import RoomDetailSection from "@components/feature/room/RoomDetailSection";
import TextButton from "@components/global/TextButton";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import { Image, Modal, notification, Spin, Tabs } from "antd";
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
import { paymentSelector } from "@stores/payments/selector";
import { PaymentRepository } from "@repository/PaymentRepository";
import { setPayments } from "@stores/payments/slice";
import PaymentTag from "@components/feature/payment/PaymentTag";

const { TabPane } = Tabs;

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");
  const [currentPaid, setCurrentPaid] = useState("");
  const [currentReceiptUrl, setCurrentReceiptUrl] = useState("");
  const [currentId, setCurrentId] = useState("");
  const room = useSelector(roomSelector);
  const postal = useSelector(packageSelector);
  const dispatch = useDispatch();
  const payments = useSelector(paymentSelector);
  const [currentTabKey, setCurrentTabKey] = useState("1");

  const roomRepository = RepositoriesFactory.get("room") as RoomRepository;
  const packageRepository = RepositoriesFactory.get(
    "package"
  ) as PackageRepository;
  const paymentRepository = RepositoriesFactory.get(
    "payment"
  ) as PaymentRepository;

  useEffect(() => {
    fetchCurrentRoom();
    // eslint-disable-next-line
  }, []);

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  const fetchCurrentRoom = async () => {
    try {
      setIsLoading(true);
      const result = await roomRepository.getRoom(id);
      const postals = await packageRepository.getPackages(
        "-",
        result?.room.roomNumber
      );
      const payments = await paymentRepository.getPayments(
        "-",
        result?.room.roomNumber
      );
      if (result && postals && payments) {
        dispatch(setCurrentRoom(result));
        dispatch(setPackages(postals));
        dispatch(setPayments(payments));
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
      okType: "danger",
      width: "40vw",
    });
  };

  const onForceDelete = async () => {
    confirm({
      title: "Do you want to force delete room owner?",
      icon: <ExclamationCircleOutlined />,
      content:
        "If you confirm, Resident account, payments, and packages will be disabled",
      onOk() {
        confirmDelete(true);
      },
      okType: "danger",
      okText: "DELETE",
      width: "40vw",
    });
  };

  const confirmDelete = async (isForce?: boolean) => {
    try {
      setIsLoading(true);
      if (isForce) {
        await roomRepository.forceDeleteRoomOwner(id);
      } else {
        await roomRepository.deleteRoomOwner(id);
      }
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
      okType: "danger",
      width: "40vw",
    });
  };

  const confirmDeleteRoom = async () => {
    try {
      setIsLoading(true);
      await roomRepository.deleteRoom(id);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Delete Room Success`,
      });
      history.goBack();
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

  const onConfirmPaymentModal = async (record: any) => {
    try {
      setCurrentRoomNumber(record.roomNumber);
      setCurrentPaid(record.paidAt);
      setCurrentId(record.id);
      setIsLoading(true);
      setIsModalVisible(true);
      const receiptUrl = await paymentRepository.getSpecificPaymentReceipt(
        record.id
      );
      if (receiptUrl) {
        setCurrentReceiptUrl(receiptUrl);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPayment = async () => {
    try {
      setIsLoading(true);
      await paymentRepository.confirmPayment(currentId);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Confirm this payment Success`,
      });
      fetchCurrentRoom();
    } catch (error) {
      notification.error({
        duration: 2,
        message: "Error",
        description: `Can't confirm this payment, Please try again.`,
      });
      setIsLoading(false);
    } finally {
      setCurrentRoomNumber("");
      setCurrentPaid("");
      setCurrentId("");

      setIsModalVisible(false);
    }
  };

  const columns = [
    {
      title: "Paid At",
      dataIndex: "paidAt",
      width: 50,
    },
    {
      title: "Confirmed At",
      dataIndex: "confirmedAt",
      width: 50,
    },
    {
      title: "Issued At",
      dataIndex: "issuedAt",
      width: 50,
    },
    {
      title: "Amount (THB)",
      dataIndex: "amount",
      width: 50,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 50,
      render: (value: string) => <PaymentTag status={value as any} />,
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 50,
      fixed: "right",
      render: (_: any, record: any) => (
        <div className="flex">
          {record.status === "pending" ? (
            <OutlineButton onClick={() => onConfirmPaymentModal(record)}>
              Verify
            </OutlineButton>
          ) : (
            <div></div>
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
        <HeadingText3>
          Room number:{" "}
          <span className="font-montserratMedium">
            {room.currentRoom.room.roomNumber}
          </span>
        </HeadingText3>
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
              <Button className="mr-2" color="danger" onClick={onForceDelete}>
                Force Move out
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

      <CustomTabs
        className="col-span-12 mt-6"
        activeKey={currentTabKey}
        onChange={onChangeTab}
      >
        <TabPane tab="Packages" key="1">
          <TabCard>
            <HeaderTable
              title="All Packages"
              buttonTitle="New package"
              onClick={() => history.push("/packages/add")}
              haveFilter={false}
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
            <HeaderTable title="All Payments" haveFilter={false} />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={payments.payments}
              loading={isLoading}
            />
          </TabCard>
        </TabPane>
      </CustomTabs>
      <Modal
        title={`Confirmation payment of: ${currentRoomNumber}`}
        visible={isModalVisible}
        onOk={confirmPayment}
        onCancel={() => setIsModalVisible(false)}
        okText="Confirm!"
      >
        <div className="flex flex-col items-center justify-center">
          {isLoading ? (
            <Spin />
          ) : (
            <Fragment>
              <Image preview={false} width="60%" src={currentReceiptUrl} />
              <HeadingText4 className="mt-4">
                <span className="font-bold">Time of submission:</span>
                {" " + currentPaid}
              </HeadingText4>
            </Fragment>
          )}
        </div>
      </Modal>
    </Fragment>
  );
};

export default RoomDetail;
