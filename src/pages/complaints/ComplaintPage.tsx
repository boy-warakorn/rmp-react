import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import { Badge, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import OutlineButton from "@components/global/OutlineButton";
import { useDispatch, useSelector } from "react-redux";
import { reportSelector } from "@stores/reports/selector";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { ReportRepository } from "@repository/ReportRepository";
import { setReports, setReportStatusCount } from "@stores/reports/slice";
import { FileTextOutlined, ToolOutlined } from "@ant-design/icons";
import { filterSelector } from "@stores/filters/selector";

const { TabPane } = Tabs;

const ComplaintPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const report = useSelector(reportSelector);
  const filter = useSelector(filterSelector);
  const reportRepository = RepositoriesFactory.get(
    "report"
  ) as ReportRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);

  const tabList = [
    { key: "-", title: "All", count: report.statusCount.all },
    { key: "pending", title: "Pending", count: report.statusCount.pending },
    {
      key: "responded",
      title: "Responded",
      count: report.statusCount.responded,
    },
    { key: "resolved", title: "Resolved", count: report.statusCount.resolved },
  ];

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, [
    currentTabKey,
    filter.filterRoomNumber,
    filter.filterBuildingId,
    filter.filterReportType,
  ]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const reportResponse = await reportRepository.getReports(
        currentTabKey,
        filter.filterRoomNumber,
        filter.filterBuildingId,
        filter.filterReportType
      );
      if (reportResponse) {
        dispatch(setReports(reportResponse));
        dispatch(setReportStatusCount(reportResponse.statusCount));
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
      title: "Type",
      width: 70,
      dataIndex: "type",
      render: (value: any) => (
        <Tag
          style={{
            display: "flex",
            alignItems: "center",
            width: "min-content",
          }}
          icon={value === "complaint" ? <FileTextOutlined /> : <ToolOutlined />}
          color={value === "complaint" ? "red" : "default"}
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Requested Date",
      width: 70,
      dataIndex: "requestedDate",
    },
    {
      title: "Resolved Date",
      width: 70,
      dataIndex: "resolvedDate",
      render: (value: string) => (
        <div className={value === "Not Resolved" ? "text-error" : ""}>
          {value}
        </div>
      ),
    },
    {
      title: "Resolved By",
      width: 60,
      dataIndex: "resolvedBy",
    },
    {
      title: "Manage",
      dataIndex: "manage",
      width: 50,
      fixed: "right",
      render: (_: any, record: any) => (
        <OutlineButton
          className="ml-3 px-4"
          color="primary"
          onClick={() => history.push(`/complaints/${record.id}`)}
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
          <TabPane tab={`${tab.title} (${tab.count})`} key={tab.key}>
            <TabCard>
              <HeaderTable title={`${tab.title} Complaints`} />
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
