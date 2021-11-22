import { Fragment, useEffect, useRef, useState } from "react";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import { Modal, Tabs, Image, Spin, notification, Tag } from "antd";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import {
  BodyText1,
  HeadingText4,
} from "@components/global/typography/Typography";
import OutlineButton from "@components/global/OutlineButton";
import { useDispatch, useSelector } from "react-redux";
import { paymentSelector } from "@stores/payments/selector";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { PaymentRepository } from "@repository/PaymentRepository";
import { setPayments } from "@stores/payments/slice";
import PaymentTag from "@components/feature/payment/PaymentTag";
import { filterSelector } from "@stores/filters/selector";
import Button from "@components/global/Button";
import { UploadOutlined, DeleteFilled } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { roomSelector } from "@stores/rooms/selector";

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
  const rooms = useSelector(roomSelector);
  const filter = useSelector(filterSelector);
  const paymentRepository = RepositoriesFactory.get(
    "payment"
  ) as PaymentRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");
  const [currentPaid, setCurrentPaid] = useState("");
  const [currentReceiptUrl, setCurrentReceiptUrl] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [, setReadDataError] = useState("");
  const [readData, setReadData] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const fileRef = useRef(null);

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  const onUploadFile = async (event: any) => {
    try {
      if (!event.target.files["0"]) {
        return;
      }
      let unFormattedData;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt?.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { RS: "@@@" });
        unFormattedData = data.split("@@@").splice(1);

        if (unFormattedData) {
          const formattedData = (unFormattedData as string[]).map((record) => {
            const newRecord = record.split(",");

            if (!newRecord[0] || !newRecord[1] || !newRecord[2]) {
              setReadDataError("Data is empty");
              return undefined;
            }

            return {
              roomNumber: newRecord[0],
              type: newRecord[1] === "0" ? "water" : "electric",
              amount: newRecord[2],
              isExist: rooms.roomIdList.includes(newRecord[0]),
            };
          });
          console.log(formattedData);
          setReadData(formattedData.filter((x) => x !== undefined));
        }
      };
      setFileName(event.target.files["0"]?.name);
      reader.readAsBinaryString(event.target.files["0"]);
    } catch (error) {
      console.log(error);
    }
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
      width: 70,
    },
    {
      title: "Confirmed At",
      dataIndex: "confirmedAt",
      width: 70,
    },
    {
      title: "Issued At",
      dataIndex: "issuedAt",
      width: 70,
    },
    {
      title: "Amount (THB)",
      dataIndex: "amount",
      width: 70,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 50,
      render: (value: string) => (
        <Tag
          color={
            value === "rent"
              ? "purple"
              : value === "water"
              ? "geekblue"
              : value === "electric"
              ? "yellow"
              : "orange"
          }
        >
          {value}
        </Tag>
      ),
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

  const importColumns = [
    {
      title: "Room No.",
      dataIndex: "roomNumber",
      width: 10,
      render: (value: any, record: any) => (
        <div className={!record.isExist ? "text-red-500" : ""}>{value}</div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 10,
      render: (value: any) => (
        <Tag color={value === "water" ? "blue" : "yellow"}>{value}</Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: 5,
      render: (value: any) => <div>{value} baht</div>,
    },
  ] as any;

  const onClearInputFile = (isNeedFileRef?: boolean) => {
    setFileName("");
    setReadData(null);
    setReadDataError("");
    if (fileRef && isNeedFileRef) {
      (fileRef as any).current.value = null;
    }
  };

  const onSubmitImport = async () => {
    try {
      setIsLoading(true);
      if (!readData) {
        return;
      }
      await paymentRepository.importPayment({
        payments: readData.filter((payment: any) => payment.isExist),
      });
      notification.success({
        duration: 2,
        message: "Success",
        description: `Import theses payment Success`,
      });
      fetchPayment();
    } catch (error) {
      notification.error({
        duration: 2,
        message: "Error",
        description: `Can't import theses payment, Please try again.`,
      });
      setIsLoading(false);
    } finally {
      setIsImportModalVisible(false);
      onClearInputFile(false);
    }
  };

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs onChange={onChangeTab}>
        {tabList.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            <TabCard>
              <HeaderTable
                title={`${tab.title} Payments`}
                buttonTitle="Import Payment"
                onClick={() => setIsImportModalVisible(true)}
              />

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
        width="50vw"
        title="Import Payment Issues"
        visible={isImportModalVisible}
        onCancel={() => {
          setIsImportModalVisible(false);
          onClearInputFile(true);
        }}
        onOk={onSubmitImport}
      >
        <div style={{ maxHeight: "70vh", overflowY: "scroll" }}>
          {isLoading ? (
            <div
              style={{ minHeight: "50vh" }}
              className="flex justify-center items-center"
            >
              <Spin />
            </div>
          ) : (
            <Fragment>
              <div className="flex items-center">
                <HeadingText4>Example of imported file: </HeadingText4>
                <Button className="ml-4" onClick={() => {}}>
                  <a href="https://firebasestorage.googleapis.com/v0/b/rmp-management.appspot.com/o/payment_example.xlsx?alt=media&token=9e803cee-a462-46d0-a6cd-13374925af43">
                    Click to download example file
                  </a>
                </Button>
              </div>
              <input
                type="file"
                name=""
                id="import-excel"
                onChange={onUploadFile}
                hidden
                ref={fileRef}
              />
              <div className="flex items-center justify-center mt-6">
                <label
                  htmlFor="import-excel"
                  className="flex items-center justify-center"
                >
                  <div>
                    <div className="bg-primary px-4 py-1 rounded-sm text-white cursor-pointer">
                      <UploadOutlined /> Upload file
                    </div>
                  </div>
                  <BodyText1 className="ml-2">
                    {fileName ? fileName : "No file chosen"}{" "}
                  </BodyText1>
                </label>
                {fileName && (
                  <DeleteFilled
                    className="ml-2 cursor-pointer"
                    onClick={() => onClearInputFile()}
                  />
                )}
              </div>
              {readData && (
                <div className="mt-6">
                  <BodyText1 className="text-red-500">
                    * Room number with red color will not upload to our database
                    due to this room number not exist in this business
                  </BodyText1>
                  <CustomTable
                    className="mt-2"
                    columns={importColumns}
                    defaultPageSize={5}
                    dataSource={readData}
                  />
                </div>
              )}
            </Fragment>
          )}
        </div>
      </Modal>
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
          <Button color="primary" onClick={() => confirmPayment()}>
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
