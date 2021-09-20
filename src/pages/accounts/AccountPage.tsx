import RoleTag from "@components/feature/account/RoleTag";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import OutlineButton from "@components/global/OutlineButton";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import { AccountRepository } from "@repository/AccountRepository";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { accountSelector } from "@stores/accounts/selector";
import { setAccounts } from "@stores/accounts/slice";
import { Tabs } from "antd";
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
  const account = useSelector(accountSelector);
  const accountRepository = RepositoriesFactory.get(
    "account"
  ) as AccountRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line
  }, [currentTabKey]);

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const accountResponse = await accountRepository.getAccounts(
        currentTabKey
      );
      if (accountResponse) {
        dispatch(setAccounts(accountResponse));
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
      render: (value: string) => <RoleTag role={value as any} />,
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
                dataSource={account.accounts}
              />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
    </div>
  );
};

export default AccountPage;
