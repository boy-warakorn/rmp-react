import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import { Badge, Tabs } from "antd";
import React from "react";
import { useHistory } from "react-router";
import OutlineButton from "@components/global/OutlineButton";

const { TabPane } = Tabs;

const ReportPage = () => {
  const history = useHistory();

  const columns = [
    {
      title: "Room No.",
      width: 50,
      dataIndex: "roomNo",
    },
    {
      title: "Received time",
      width: 50,
      dataIndex: "receivedTime",
    },
    {
      title: "Resolve time",
      width: 50,
      dataIndex: "resolveTime",
    },
    {
      title: "Topic",
      width: 50,
      dataIndex: "topic",
    },
    {
      title: "Status",
      width: 50,
      dataIndex: "status",
      render: (value: any) => <Badge status={value} text={value} />,
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 50,
      fixed: "right",
      render: (_: any, record: any) => (
        <OutlineButton
          className="ml-3 px-10"
          color="primary"
          onClick={() => history.push(`/reports/${record.id}`)}
        >
          Open
        </OutlineButton>
      ),
    },
  ] as any;
  return (
    <div className="col-span-12 mt-3">
      <CustomTabs>
        <TabPane tab="All" key="1">
          <TabCard>
            <HeaderTable title="All Reports" />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={[
                {
                  key: "1",
                  id: "1333",
                  roomNo: 32,
                  receivedTime: "20 July 2020 at 08:00 PM",
                  resolveTime: "-",
                  topic: "Lorem ipsum",
                  status: "processing",
                  index: 1,
                },
              ]}
            />
          </TabCard>
        </TabPane>
        <TabPane tab="Waiting" key="2">
          <TabCard>
            <HeaderTable title="All Waiting Reports" />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={[
                {
                  key: "1",
                  id: "1333",
                  roomNo: 32,
                  receivedTime: "20 July 2020 at 08:00 PM",
                  resolveTime: "-",
                  topic: "Lorem ipsum",
                  status: "processing",
                  index: 1,
                },
              ]}
            />
          </TabCard>
        </TabPane>
        <TabPane tab="Resolved" key="3">
          <TabCard>
            <HeaderTable title="All Resolved Report" />
            <CustomTable
              className="mt-6"
              columns={columns}
              dataSource={[
                {
                  key: "1",
                  id: "1333",
                  roomNo: 32,
                  receivedTime: "20 July 2020 at 08:00 PM",
                  resolveTime: "-",
                  topic: "Lorem ipsum",
                  status: "processing",
                  index: 1,
                },
              ]}
            />
          </TabCard>
        </TabPane>
      </CustomTabs>
    </div>
  );
};

export default ReportPage;
