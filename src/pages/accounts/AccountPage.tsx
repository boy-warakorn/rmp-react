import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import OutlineButton from "@components/global/OutlineButton";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import { AccountRepository } from "@repository/AccountRepository";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { accountSelector } from "@stores/accounts/selector";
import { setAccounts } from "@stores/accounts/slice";
import { Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const accountsSelector = useSelector(accountSelector);
  const accountRepository = RepositoriesFactory.get(
    "account"
  ) as AccountRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  useEffect(() => {
    fetchAccount();
    // eslint-disable-next-line
  }, [currentTabKey]);

  const fetchAccount = async () => {
    try {
      setIsLoading(true);
      const rooms = await accountRepository.getAccounts(currentTabKey);
      if (rooms) {
        dispatch(setAccounts(rooms));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Role",
      width: 20,
      dataIndex: "role",
      render: (value: string) => (
        <Tag
          color={
            value === "admin"
              ? "magenta"
              : value === "resident"
              ? "cyan"
              : "green"
          }
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Name",
      width: 50,
      dataIndex: "name",
    },
    {
      title: "Created At",
      width: 35,
      dataIndex: "createdAt",
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 20,
      fixed: "right",
      render: (_: any, record: any) => (
        <OutlineButton
          className="ml-3 px-10"
          color="primary"
          onClick={() => history.push(`/manage-accounts/${record.userId}`)}
        >
          Account detail
        </OutlineButton>
      ),
    },
  ] as any;

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs onChange={onChangeTab}>
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
                loading={isLoading}
                dataSource={accountsSelector.accounts}
              />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
    </div>
  );
};

export default AccountPage;
