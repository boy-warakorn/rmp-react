import PackageTable from "@components/feature/package/PackageTable";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import Loading from "@components/global/Loading";
import HeaderTable from "@components/global/table/HeaderTable";
import { PackageRepository } from "@repository/PackageRepository";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { packageSelector } from "@stores/packages/selector";
import { setPackages } from "@stores/packages/slice";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const { TabPane } = Tabs;

const tabList = [
  { key: "-", title: "All" },
  { key: "in-storage", title: "In Storage" },
  { key: "delivered", title: "Delivered" },
];

const PackagePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const packagesSelector = useSelector(packageSelector);
  const packageRepository = RepositoriesFactory.get(
    "package"
  ) as PackageRepository;

  const [currentTabKey, setCurrentTabKey] = useState("-");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeTab = (value: string) => {
    setCurrentTabKey(value);
  };

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line
  }, [currentTabKey]);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const packages = await packageRepository.getPackages(currentTabKey);
      if (packages) {
        dispatch(setPackages(packages));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmDelivery = async (id: string) => {
    try {
      setIsLoading(true);
      await packageRepository.confirmPackage(id);
      fetchPackages();
    } catch (error) {}
  };

  return (
    <div className="col-span-12 mt-3">
      <CustomTabs onChange={onChangeTab}>
        {tabList.map((tab) => (
          <TabPane tab={tab.title} key={tab.key}>
            <TabCard>
              <HeaderTable
                title={`${tab.title} Packages`}
                buttonTitle="New package"
                onClick={() => history.push("/packages/add")}
              />
              <PackageTable
                content={packagesSelector.packages}
                loading={isLoading}
                onConfirm={onConfirmDelivery}
              />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
    </div>
  );
};

export default PackagePage;
