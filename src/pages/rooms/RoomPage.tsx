import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import HeaderTable from "@components/global/table/HeaderTable";
import Button from "@components/global/Button";
import { Tabs } from "antd";

import React from "react";
import OutlineButton from "@components/global/OutlineButton";
import CustomTable from "@components/global/table/Table";
import { useHistory } from "react-router";

const { TabPane } = Tabs;

const data = [
  {
    key: "1",
    id: "1234",
    roomNo: 32,
    contractType: "purchase",
    packages: 2,
    paymentStatus: "All Paid",
    index: 0,
  },
  {
    key: "2",
    id: "5434",
    roomNo: 32,
    contractType: "purchase",
    packages: 2,
    paymentStatus: "All Paid",
    index: 1,
  },
];

const RoomPage = () => {
  const history = useHistory();

  const columns = [
    {
      title: "Room No.",
      dataIndex: "roomNo",
    },
    {
      title: "Contract type",
      dataIndex: "contractType",
      render: (value: string) =>
        value === "unoccupied" ? (
          <div className="text-base italic text-grey">{value}</div>
        ) : (
          value
        ),
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
      render: (_: any, record: any) => (
        <div className="flex">
          <OutlineButton onClick={() => history.push(`/rooms/${record.id}`)}>
            View detail
          </OutlineButton>
          <Button className="ml-3" color="primary">
            Edit owner
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs type="card" size="large">
        <TabPane tab="All" key="1">
          <TabCard>
            <HeaderTable title="All Room" buttonTitle="Add Room" />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={[
                ...data,
                {
                  key: "3",
                  id: "1333",
                  roomNo: 32,
                  contractType: "unoccupied",
                  packages: 2,
                  paymentStatus: "All Paid",
                  index: 2,
                },
              ]}
            />
          </TabCard>
        </TabPane>
        <TabPane tab="Occupied" key="2">
          <TabCard>
            <HeaderTable title="Occupied Room" buttonTitle="Add Room" />
            <CustomTable className="mt-6" columns={columns} dataSource={data} />
          </TabCard>
        </TabPane>
        <TabPane tab="Unoccupied" key="3">
          <TabCard>
            <HeaderTable title="Unoccupied Room" buttonTitle="Add Room" />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={[
                {
                  key: "3",
                  id: "1333",
                  roomNo: 32,
                  contractType: "unoccupied",
                  packages: 2,
                  paymentStatus: "All Paid",
                  index: 2,
                },
              ]}
            />
          </TabCard>
        </TabPane>
      </CustomTabs>
    </div>
  );
};

export default RoomPage;
