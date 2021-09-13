import React from "react";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import { Tabs } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import HeaderTable from "@components/global/table/HeaderTable";
import { useHistory } from "react-router";
import CustomTable from "@components/global/table/Table";
import { BodyText1 } from "@components/global/typography/Typography";
import OutlineButton from "@components/global/OutlineButton";

const { TabPane } = Tabs;

const PaymentPage = () => {
  const history = useHistory();

  const columns = [
    {
      title: "Room No.",
      dataIndex: "roomNo",
    },
    {
      title: "Issue time",
      dataIndex: "issueTime",
    },
    {
      title: "Amount (THB)",
      dataIndex: "amount",
    },
    {
      title: "type",
      dataIndex: "type",
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 50,
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
  ];

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs>
        <TabPane tab="All" key="1">
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
                  roomNo: "1234",
                  key: "3",
                  issueTime: "20 July 2020 at 08:00 PM",
                  amount: 30000,
                  type: "Common Charge",
                  index: 2,
                  isConfirm: true,
                },
                {
                  roomNo: "2345",
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
        <TabPane tab="Awaiting" key="2">
          <TabCard>
            <HeaderTable
              title="Awaiting Payment"
              buttonTitle="New invoice"
              onClick={() => history.push("/payments/add")}
            />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={[
                {
                  roomNo: "2345",
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
        <TabPane tab="Paid" key="3">
          <TabCard>
            <HeaderTable
              title="Paid Payments"
              buttonTitle="New invoice"
              onClick={() => history.push("/payments/add")}
            />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={[
                {
                  roomNo: "1234",
                  key: "3",
                  issueTime: "20 July 2020 at 08:00 PM",
                  amount: 30000,
                  type: "Common Charge",
                  index: 2,
                  isConfirm: true,
                },
              ]}
            />
          </TabCard>
        </TabPane>
      </CustomTabs>
    </div>
  );
};

export default PaymentPage;
