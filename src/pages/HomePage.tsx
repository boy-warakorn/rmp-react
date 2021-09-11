import { HeadingText4 } from "@components/typography/Typography";
import CustomSelect from "@components/form/Select";
import { Select } from "antd";
import React, { Fragment } from "react";
import DashboardCard from "@components/dashboard/DashboardCard";

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
    </Fragment>
  );
};

export default HomePage;
