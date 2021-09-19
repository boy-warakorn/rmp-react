import PackageTable from "@components/feature/package/PackageTable";
import PackageCard from "@components/feature/postal/PackageCard";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import HeaderTable from "@components/global/table/HeaderTable";
import { Pagination, Tabs } from "antd";
import React from "react";
import { useHistory } from "react-router";

const { TabPane } = Tabs;

const test = [1, 2, 3, 4];

const PackagePage = () => {
  const history = useHistory();

  let input = [1, 2, 3, 4, 5, 6, 7, 8];
  let chunked = [] as any;
  let size = 4;

  Array.from({ length: Math.ceil(input.length / size) }, (_, i) => {
    chunked.push(input.slice(i * size, i * size + size));
  });

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs>
        <TabPane tab="All" key="1">
          <TabCard>
            <HeaderTable
              title="All Packages"
              buttonTitle="New package"
              onClick={() => history.push("/packages/add")}
            />
            <PackageTable
              content={{ packages: chunked, total: input.length }}
            />
          </TabCard>
        </TabPane>
        <TabPane tab="In storage" key="2">
          <TabCard>
            <HeaderTable
              title="All In Storage"
              buttonTitle="New package"
              onClick={() => history.push("/packages/add")}
            />
            <div className="mt-6 grid grid-cols-6 gap-6">
              <PackageCard />
              <PackageCard />
            </div>
          </TabCard>
        </TabPane>
        <TabPane tab="Delivered" key="3">
          <TabCard>
            <HeaderTable
              title="All Delivered"
              buttonTitle="New package"
              onClick={() => history.push("/packages/add")}
            />
            <div className="mt-6 grid grid-cols-6 gap-6">
              <PackageCard isDelivered />
            </div>
          </TabCard>
        </TabPane>
      </CustomTabs>
    </div>
  );
};

export default PackagePage;
