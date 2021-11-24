import {
  BodyText1,
  HeadingText4,
  SubHeadingText1,
} from "@components/global/typography/Typography";
import React, { Fragment, useEffect, useState } from "react";
import { SlidersFilled } from "@ant-design/icons";
import DashboardCard from "@components/feature/dashboard/DashboardCard";
import RoomOccupiedChart from "@components/feature/dashboard/RoomOccupiedChart";
import Card from "@components/global/Card";
import { Empty } from "antd";
import DashboardPackageCard from "@components/feature/dashboard/DashboardPackageCard";
import Button from "@components/global/Button";
import DashboardReportCard from "@components/feature/dashboard/DashboardReportCard";
import RepositoriesFactory from "@repository/RepositoryFactory";
import {
  DashboardRepository,
  DashboardRoomResponse,
  RecentPackagesResponse,
  RecentReportsResponse,
  SummaryResponse,
} from "@repository/DashboardRepository";
import { useHistory } from "react-router";
import Loading from "@components/global/Loading";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState<DashboardRoomResponse | undefined>(
    undefined
  );
  const [packages, setPackages] = useState<RecentPackagesResponse | undefined>(
    undefined
  );
  const [reports, setReports] = useState<RecentReportsResponse | undefined>(
    undefined
  );
  const [summary, setSummary] = useState<SummaryResponse | undefined>(
    undefined
  );
  const dashboardRepository = RepositoriesFactory.get(
    "dashboard"
  ) as DashboardRepository;
  const history = useHistory();

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line
  }, []);

  const fetchDashboard = async () => {
    try {
      setIsLoading(true);
      const room = await dashboardRepository.getDashboardRoom();
      const packages = await dashboardRepository.getRecentPackages();
      const reports = await dashboardRepository.getRecentReports();
      const summary = await dashboardRepository.getSummary();

      if (room && packages && reports && summary) {
        setRoom(room);
        setPackages(packages);
        setReports(reports);
        setSummary(summary);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 flex justify-between items-center mb-6">
        <HeadingText4>Summary</HeadingText4>
      </div>
      <div className="col-span-6 xl:col-span-3">
        <DashboardCard
          text="Payment Dues"
          count={summary ? summary.count.overdued : 0}
        />
      </div>
      <div className="col-span-6 xl:col-span-3">
        <DashboardCard
          text="Packages held"
          count={summary ? summary.count.held : 0}
        />
      </div>
      <div className="col-span-6 mt-6 xl:col-span-3 xl:mt-0">
        <DashboardCard
          text="Maintenance"
          count={summary ? summary.count.maintenance : 0}
        />
      </div>
      <div className="col-span-6 mt-6 xl:col-span-3 xl:mt-0">
        <DashboardCard
          text="Complaints"
          count={summary ? summary.count.complaint : 0}
        />
      </div>
      <div className="col-span-6 mt-6 mb-6">
        <HeadingText4>Recent incoming packages</HeadingText4>
      </div>
      <div className="col-span-6 mt-6 mb-6">
        <HeadingText4>Room summary</HeadingText4>
      </div>
      <div
        className={`col-span-6   ${
          !packages
            ? ""
            : packages?.packages.length < 1
            ? "flex justify-center items-center"
            : ""
        }`}
      >
        <Fragment>
          {packages ? (
            packages.packages.length < 1 ? (
              <Empty description="No recent packages" />
            ) : (
              packages.packages.map((postal, index) =>
                packages.packages.length - 1 === index ? (
                  <Fragment>
                    <DashboardPackageCard
                      roomNumber={postal.roomNumber}
                      postalService={postal.postalService}
                      note={postal.note}
                      date={postal.arrivedAt}
                    />
                    <div className="flex items-center justify-center">
                      <Button
                        color="primary"
                        className="px-9 center rounded"
                        onClick={() => history.replace("/packages")}
                      >
                        <SubHeadingText1 className="font-roboto">
                          More Packages
                        </SubHeadingText1>
                      </Button>
                    </div>
                  </Fragment>
                ) : (
                  <DashboardPackageCard
                    roomNumber={postal.roomNumber}
                    postalService={postal.postalService}
                    note={postal.note}
                    date={postal.arrivedAt}
                  />
                )
              )
            )
          ) : (
            <Empty description="No recent packages" />
          )}
        </Fragment>
      </div>

      <div className="col-span-6">
        <Card className="p-4 ">
          <div className="flex justify-between">
            <HeadingText4>Room occupied</HeadingText4>
          </div>
          <div className="flex items-center">
            <SlidersFilled style={{ fontSize: "18px" }} />
            <BodyText1 className="ml-3">
              Rooms occupied: {room?.count.occupiedRoom}/{room?.count.totalRoom}
            </BodyText1>
          </div>
          <RoomOccupiedChart
            percentage={
              room?.count.occupiedRoom && room?.count.totalRoom
                ? (room?.count.occupiedRoom / room?.count.totalRoom) * 100
                : 0
            }
          />
        </Card>
      </div>

      <div className="col-span-12 mt-9">
        <HeadingText4>Latest reports</HeadingText4>
      </div>
      <div className="col-span-12 mt-6 ">
        <div className="flex flex-col">
          {reports ? (
            reports.reports.length < 1 ? (
              <Empty description="No recent reports" />
            ) : (
              reports.reports.map((report, index) =>
                reports.reports.length - 1 === index ? (
                  <Fragment>
                    <DashboardReportCard
                      id={report.id}
                      date={report.requestedDate}
                      roomNumber={report.roomNumber}
                      title={report.title}
                    />
                    <div className="flex items-center justify-center">
                      <Button
                        color="primary"
                        className="px-9 center rounded"
                        onClick={() => history.replace("/complaints")}
                      >
                        <SubHeadingText1 className="font-roboto">
                          More Reports
                        </SubHeadingText1>
                      </Button>
                    </div>
                  </Fragment>
                ) : (
                  <DashboardReportCard
                    id={report.id}
                    date={report.requestedDate}
                    roomNumber={report.roomNumber}
                    title={report.title}
                  />
                )
              )
            )
          ) : (
            <Empty description="No recent reports" />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
