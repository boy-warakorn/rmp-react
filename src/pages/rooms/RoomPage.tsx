import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import { Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

const RoomPage = () => {
  return (
    <div className="col-span-12 mt-3">
      <CustomTabs type="card" size="large">
        <TabPane tab="All" key="1">
          <TabCard>1</TabCard>
        </TabPane>
        <TabPane tab="Occupied" key="2">
          <TabCard>2</TabCard>
        </TabPane>
        <TabPane tab="Unoccupied" key="3">
          <TabCard>3</TabCard>
        </TabPane>
      </CustomTabs>
    </div>
  );
};

export default RoomPage;
