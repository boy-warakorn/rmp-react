import { Fragment, useEffect, useState } from "react";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import { Modal, Tabs, Image, Spin, notification } from "antd";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import { HeadingText4 } from "@components/global/typography/Typography";
import OutlineButton from "@components/global/OutlineButton";
import { useDispatch, useSelector } from "react-redux";
import { paymentSelector } from "@stores/payments/selector";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { PaymentRepository } from "@repository/PaymentRepository";
import { setPayments } from "@stores/payments/slice";
import PaymentTag from "@components/feature/payment/PaymentTag";
import { filterSelector } from "@stores/filters/selector";
import Button from "@components/global/Button";

const { confirm } = Modal;
const { TabPane } = Tabs;

const tabList = [
  { key: "-", title: "All" },
  { key: "pending", title: "Pending" },
  { key: "active", title: "Active / Due" },
  { key: "rejected", title: "Rejected" },
  { key: "complete", title: "Completed" },
];

const PaymentPage = () => {
  const dispatch = useDispatch();
  const payments = useSelector(paymentSelector);
  const filter = useSelector(filterSelector);
  const paymentRepository = RepositoriesFactory.get(
    "payment"
  ) as PaymentRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");
  const [currentPaid, setCurrentPaid] = useState("");
  const [currentReceiptUrl, setCurrentReceiptUrl] = useState("");
  const [currentId, setCurrentId] = useState("");

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  useEffect(() => {
    fetchPayment();
    // eslint-disable-next-line
  }, [currentTabKey, filter.filterRoomNumber, filter.filterBuildingId]);

  const fetchPayment = async () => {
    try {
      setIsLoading(true);
      const payments = await paymentRepository.getPayments(
        currentTabKey,
        filter.filterRoomNumber,
        filter.filterBuildingId
      );
      if (payments) {
        dispatch(setPayments(payments));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
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

  const confirmPayment = async (id?: string) => {
    try {
      setIsLoading(true);
      await paymentRepository.confirmPayment(id ? id : currentId);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Confirm this payment Success`,
      });
      fetchPayment();
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
  const rejectPayment = async () => {
    try {
      setIsLoading(true);
      await paymentRepository.rejectPayment(currentId);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Reject this payment Success`,
      });
      fetchPayment();
    } catch (error) {
      notification.error({
        duration: 2,
        message: "Error",
        description: `Can't reject this payment, Please try again.`,
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
      title: "Room No.",
      dataIndex: "roomNumber",
      width: 30,
    },
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
          {record.status === "pending" || record.status === "rejected" ? (
            <OutlineButton
              onClick={
                record.status === "rejected"
                  ? () => {
                      confirm({
                        title: "Do you want to confirm this payment?",
                        onOk() {
                          confirmPayment(record.id);
                        },
                      });
                    }
                  : () => onConfirmPaymentModal(record)
              }
            >
              {record.status === "pending" ? "Verify" : "Confirm payment"}
            </OutlineButton>
          ) : (
            <div></div>
          )}
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
              <HeaderTable title={`${tab.title} Payments`} />
              <CustomTable
                className="mt-6"
                columns={columns}
                dataSource={payments.payments}
                loading={isLoading}
              />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
      <Modal
        title={`Confirmation payment of: ${currentRoomNumber}`}
        visible={isModalVisible}
        onOk={() => confirmPayment()}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            color="danger"
            onClick={() => {
              confirm({
                title: "Do you want to reject this payment?",
                onOk() {
                  rejectPayment();
                },
                okButtonProps: { style: { background: "red", border: "none" } },
              });
            }}
          >
            Rejected
          </Button>,
          <Button color="primary" onClick={confirmPayment}>
            Confirm
          </Button>,
        ]}
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
    </div>
  );
};

export default PaymentPage;
