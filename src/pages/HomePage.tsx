import {
  BodyText1,
  HeadingText4,
} from "@components/global/typography/Typography";
import CustomSelect from "@components/global/form/Select";
import { Select } from "antd";
import React, { Fragment } from "react";
import { SettingFilled, SlidersFilled } from "@ant-design/icons";
import DashboardCard from "@components/dashboard/DashboardCard";
import Chart from "react-apexcharts";

const { Option } = Select;

const HomePage = () => {
  return (
    <Fragment>
      <div className="col-span-12 flex justify-between items-center mb-6">
        <HeadingText4>Summary</HeadingText4>
        <CustomSelect defaultValue="This month" placeholder="Select period">
          <Option value="This month">This month</Option>
          <Option value="This year">This year</Option>
        </CustomSelect>
      </div>
      <div className="col-span-3">
        <DashboardCard text="Payment Dues" count={60} />
      </div>
      <div className="col-span-3">
        <DashboardCard text="Packages held" count={16} />
      </div>
      <div className="col-span-3">
        <DashboardCard text="Reports" count={43} />
      </div>
      <div className="col-span-3">
        <DashboardCard text="Complaints" count={64} />
      </div>
      <div className="col-span-12 mt-6">
        <HeadingText4>Recent incoming packages</HeadingText4>
      </div>
      <div className="col-span-6"></div>
      <div className="col-span-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between">
            <HeadingText4>Room occupied</HeadingText4>
            <SettingFilled style={{ fontSize: "32px", cursor: "pointer" }} />
          </div>
          <div className="flex items-center">
            <SlidersFilled style={{ fontSize: "18px" }} />
            <BodyText1 className="ml-3">Rooms occupied: 25/100</BodyText1>
          </div>
          <Chart
            type="radialBar"
            series={[25]}
            height={400}
            options={{
              labels: ["Room Occupied"],
              grid: {
                show: true,
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: "50px",
                  },
                  dataLabels: {
                    name: {
                      fontSize: "16px",
                      fontFamily: "MontserratMedium",
                      offsetY: 30,
                    },
                    value: {
                      offsetY: -17.5,
                      fontSize: "36px",
                      fontFamily: "MontserratBold",
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
