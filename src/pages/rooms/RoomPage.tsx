import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import HeaderTable from "@components/global/table/HeaderTable";
import Button from "@components/global/Button";
import { Table, Tabs } from "antd";

import React from "react";
import OutlineButton from "@components/global/OutlineButton";

const { TabPane } = Tabs;

const columns = [
  {
    title: "Room No.",
    dataIndex: "roomNo",
  },
  {
    title: "Contract type",
    dataIndex: "contractType",
  },
  {
    title: "Packages",
    dataIndex: "packages",
  },
  {
    title: "Payments status",
    dataIndex: "paymentStatus",
  },
  {
    title: "Manage",
    dataIndex: "manage",
    width: 50,
    render: () => (
      <div className="flex">
        <OutlineButton>View detail</OutlineButton>
        <Button className="ml-3" color="primary">
          Edit owner
        </Button>
      </div>
    ),
  },
];

const data = [
  {
    key: "1",
    roomNo: 32,
    contractType: "purchase",
    packages: 2,
    paymentStatus: "All Paid",
    index: 0,
  },
  {
    key: "2",
    roomNo: 32,
    contractType: "purchase",
    packages: 2,
    paymentStatus: "All Paid",
    index: 1,
  },
  {
    key: "3",
    roomNo: 32,
    contractType: "purchase",
    packages: 2,
    paymentStatus: "All Paid",
    index: 2,
  },
];

const RoomPage = () => {
  return (
    <div className="col-span-12 mt-3">
      <CustomTabs type="card" size="large">
        <TabPane tab="All" key="1">
          <TabCard>
            <HeaderTable title="All Room" buttonTitle="Add Room" />
            <Table className="mt-6" columns={columns} dataSource={data} />
          </TabCard>
        </TabPane>
        <TabPane tab="Occupied" key="2">
          <TabCard>2</TabCard>
        </TabPane>
        <TabPane tab="Unoccupied" key="3">
          <TabCard>3</TabCard>
        </TabPane>
      </CustomTabs>
    </div>
  );
};

export default RoomPage;
