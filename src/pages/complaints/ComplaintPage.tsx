import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import { Badge, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import OutlineButton from "@components/global/OutlineButton";
import { useDispatch, useSelector } from "react-redux";
import { reportSelector } from "@stores/reports/selector";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { ReportRepository } from "@repository/ReportRepository";
import { setReports } from "@stores/reports/slice";

const { TabPane } = Tabs;

const tabList = [
  { key: "-", title: "All" },
  { key: "pending", title: "Pending" },
  { key: "responded", title: "Responded" },
  { key: "resolved", title: "Resolved" },
];

const ComplaintPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const report = useSelector(reportSelector);
  const reportRepository = RepositoriesFactory.get(
    "report"
  ) as ReportRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, [currentTabKey]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const reportResponse = await reportRepository.getReports(currentTabKey);
      if (reportResponse) {
        dispatch(setReports(reportResponse));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Room No.",
      width: 50,
      dataIndex: "roomNumber",
    },
    {
      title: "Requested Date",
      width: 50,
      dataIndex: "requestedDate",
    },
    {
      title: "Resolved Date",
      width: 50,
      dataIndex: "resolvedDate",
      render: (value: string) => (
        <div className={value === "Not Resolved" ? "text-error" : ""}>
          {value}
        </div>
      ),
    },
    {
      title: "Title",
      width: 50,
      dataIndex: "title",
    },
    {
      title: "Status",
      width: 50,
      dataIndex: "status",
      render: (value: any) => (
        <Badge
          status={
            value === "pending"
              ? "warning"
              : value === "responded"
              ? "processing"
              : "success"
          }
          text={value}
        />
      ),
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
      <CustomTabs onChange={onChangeTab}>
        {tabList.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            <TabCard>
              <HeaderTable title={`${tab.title} Reports`} />
              <CustomTable
                className="mt-6"
                columns={columns}
                loading={isLoading}
                dataSource={report.reports}
              />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
    </div>
  );
};

export default ComplaintPage;
