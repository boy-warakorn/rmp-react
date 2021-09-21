import React, { useEffect, useState } from "react";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import { Tabs } from "antd";
import HeaderTable from "@components/global/table/HeaderTable";
// import { useHistory } from "react-router";
import CustomTable from "@components/global/table/Table";
import { BodyText1 } from "@components/global/typography/Typography";
import OutlineButton from "@components/global/OutlineButton";
import { useDispatch, useSelector } from "react-redux";
import { paymentSelector } from "@stores/payments/selector";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { PaymentRepository } from "@repository/PaymentRepository";
import { setPayments } from "@stores/payments/slice";
import PaymentTag from "@components/feature/payment/PaymentTag";

const { TabPane } = Tabs;

const tabList = [
  { key: "-", title: "All" },
  { key: "pending", title: "Pending" },
  { key: "active", title: "Active" },
  { key: "in-active", title: "In Active" },
  { key: "reject", title: "Reject" },
  { key: "complete", title: "Complete" },
];

const PaymentPage = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const payments = useSelector(paymentSelector);
  const paymentRepository = RepositoriesFactory.get(
    "payment"
  ) as PaymentRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  useEffect(() => {
    fetchPayment();
    // eslint-disable-next-line
  }, [currentTabKey]);

  const fetchPayment = async () => {
    try {
      setIsLoading(true);
      const payments = await paymentRepository.getPayments(currentTabKey, "");
      if (payments) {
        dispatch(setPayments(payments));
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
      title: "Paid At",
      dataIndex: "paidAt",
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
          {record.status === "complete" ? (
            <BodyText1 className="text-success">Confirmed</BodyText1>
          ) : record.status === "pending" ? (
            <OutlineButton onClick={() => {}}>Confirm</OutlineButton>
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
    </div>
  );
};

export default PaymentPage;
