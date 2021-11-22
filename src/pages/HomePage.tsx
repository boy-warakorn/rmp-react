import {
  BodyText1,
  HeadingText4,
  // SubHeadingText1,
} from "@components/global/typography/Typography";
import React, { Fragment } from "react";
import { SlidersFilled } from "@ant-design/icons";
import DashboardCard from "@components/feature/dashboard/DashboardCard";
import RoomOccupiedChart from "@components/feature/dashboard/RoomOccupiedChart";
import Card from "@components/global/Card";
import { Empty } from "antd";
// import DashboardPackageCard from "@components/feature/dashboard/DashboardPackageCard";
// import Button from "@components/global/Button";
// import DashboardPackageCard from "@components/feature/dashboard/DashboardPackageCard";
// import DashboardReportCard from "@components/feature/dashboard/DashboardReportCard";
// import { useHistory } from "react-router";

const HomePage = () => {
  // const history = useHistory();

  return (
    <Fragment>
      <div className="col-span-12 flex justify-between items-center mb-6">
        <HeadingText4>Summary</HeadingText4>
      </div>
      <div className="col-span-6 xl:col-span-3">
        <DashboardCard text="Payment Dues" count={0} />
      </div>
      <div className="col-span-6 xl:col-span-3">
        <DashboardCard text="Packages held" count={0} />
      </div>
      <div className="col-span-6 mt-6 xl:col-span-3 xl:mt-0">
        <DashboardCard text="Reports" count={0} />
      </div>
      <div className="col-span-6 mt-6 xl:col-span-3 xl:mt-0">
        <DashboardCard text="Complaints" count={0} />
      </div>
      <div className="col-span-6 mt-6 mb-6">
        <HeadingText4>Recent incoming packages</HeadingText4>
      </div>
      <div className="col-span-6 mt-6 mb-6">
        <HeadingText4>Room summary</HeadingText4>
      </div>
      <div
        className={`col-span-6   ${
          true ? "flex justify-center items-center" : ""
        }`}
      >
        <Fragment>
          <Empty description="No recent packages" />
          {/* <DashboardPackageCard />
          <div className="mb-4"></div>
          <DashboardPackageCard />
          <div className="mb-4"></div>
          <DashboardPackageCard /> */}
          {/* <div className="flex items-center justify-center">
            <Button
              color="primary"
              className="px-9 mt-4 center rounded"
              onClick={() => history.replace("/packages")}
            >
              <SubHeadingText1 className="font-roboto">
                More Detail
              </SubHeadingText1>
            </Button>
          </div> */}
        </Fragment>
      </div>

      <div className="col-span-6">
        <Card className="p-4 ">
          <div className="flex justify-between">
            <HeadingText4>Room occupied</HeadingText4>
          </div>
          <div className="flex items-center">
            <SlidersFilled style={{ fontSize: "18px" }} />
            <BodyText1 className="ml-3">Rooms occupied: 0/0</BodyText1>
          </div>
          <RoomOccupiedChart />
        </Card>
      </div>

      <div className="col-span-12 mt-9">
        <HeadingText4>Latest reports</HeadingText4>
      </div>
      <div className="col-span-12 mt-6">
        <Empty description="No recent reports" />
        {/* <DashboardReportCard />
        <div className="mt-4"></div>
        <DashboardReportCard />
        <div className="flex items-center justify-center">
          <Button
            color="primary"
            className="px-9 mt-4 center rounded"
            onClick={() => history.replace("/reports")}
          >
            <SubHeadingText1 className="font-roboto">
              More Detail
            </SubHeadingText1>
          </Button>
        </div> */}
      </div>
    </Fragment>
  );
};

export default HomePage;
