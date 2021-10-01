import { HeadingText4 } from "@components/global/typography/Typography";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Button from "@components/global/Button";
import React, { Fragment } from "react";
import BuildingCard from "@components/feature/building/BuildingCard";

const BuildingPage = () => {
  return (
    <Fragment>
      <HeadingText4 className="col-span-12">Buildings List</HeadingText4>
      <Input
        placeholder="Search by building name"
        prefix={<SearchOutlined />}
        className="col-span-3 mt-3"
      />
      <div className="col-span-7"></div>
      <Button className="col-span-2" color="primary">
        Add Building
      </Button>
      <BuildingCard />
      <BuildingCard />
      <BuildingCard />
      <BuildingCard />
      <BuildingCard />
      <BuildingCard />
      <BuildingCard />
      <BuildingCard />
    </Fragment>
  );
};

export default BuildingPage;
