import React from "react";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import { Tabs } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import HeaderTable from "@components/global/table/HeaderTable";
// import { useHistory } from "react-router";
import CustomTable from "@components/global/table/Table";
import { BodyText1 } from "@components/global/typography/Typography";
import OutlineButton from "@components/global/OutlineButton";

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

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs>
        {tabList.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            <TabCard>
              <HeaderTable title={`${tab.title} Payments`} />
              <CustomTable className="mt-6" columns={columns} dataSource={[]} />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
    </div>
  );
};

export default PaymentPage;
