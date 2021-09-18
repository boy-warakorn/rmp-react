import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import OutlineButton from "@components/global/OutlineButton";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import { Tabs, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router";

const { TabPane } = Tabs;

const tabList = [
  { key: "-", title: "All" },
  { key: "admin", title: "Admin" },
  { key: "personnel", title: "Personnel" },
  { key: "resident", title: "Resident" },
];

const AccountPage = () => {
  const history = useHistory();

  const columns = [
    {
      title: "Role",
      width: 20,
      dataIndex: "role",
      render: (value: string) => <Tag color="magenta">{value}</Tag>,
    },
    {
      title: "Name",
      width: 50,
      dataIndex: "name",
    },
    {
      title: "Created",
      width: 35,
      dataIndex: "createdAt",
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 35,
      fixed: "right",
      render: (_: any, record: any) => (
        <OutlineButton
          className="ml-3 px-10"
          color="primary"
          onClick={() => history.push(`/manage-accounts/${record.id}/edit`)}
        >
          Account detail
        </OutlineButton>
      ),
    },
  ] as any;

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs>
        {tabList.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            <TabCard>
              <HeaderTable
                title={`${tab.title} Accounts`}
                buttonTitle="New Accounts"
                onClick={() => history.push("/manage-accounts/add")}
              />
              <CustomTable
                className="mt-6"
                columns={columns}
                dataSource={[
                  {
                    userId: "123",
                    key: "1",
                    index: 1,
                    name: "Testimate Test",
                    role: "admin",
                    createdAt: "date na ja",
                  },
                ]}
              />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
    </div>
  );
};

export default AccountPage;
