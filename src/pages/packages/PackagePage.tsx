import PackageTable from "@components/feature/postal/PackageTable";
import CustomTabs, { TabCard } from "@components/global/CustomTabs";
import HeaderTable from "@components/global/table/HeaderTable";
import { PackageRepository } from "@repository/PackageRepository";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { packageSelector } from "@stores/packages/selector";
import { setPackages } from "@stores/packages/slice";
import { Tabs, notification } from "antd";
import confirm from "antd/lib/modal/confirm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { filterSelector } from "@stores/filters/selector";

const { TabPane } = Tabs;

const tabList = [
  { key: "-", title: "All" },
  { key: "in-storage", title: "In Storage" },
  { key: "received", title: "Received" },
];

const PackagePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const postal = useSelector(packageSelector);
  const filter = useSelector(filterSelector);
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
  }, [currentTabKey, filter.filterRoomNumber, filter.filterBuildingId]);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const packages = await packageRepository.getPackages(
        currentTabKey,
        filter.filterRoomNumber,
        filter.filterBuildingId
      );
      if (packages) {
        dispatch(setPackages(packages));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmOrDeleteDelivery = async (id: string, isConfirm: boolean) => {
    try {
      if (isConfirm) {
        setIsLoading(true);
        await packageRepository.confirmPackage(id);
        notification.success({
          duration: 2,
          message: "Success",
          description: `${isConfirm ? "Confirm" : "Delete"} delivery Success`,
        });
        fetchPackages();
      } else {
        confirm({
          title: "Do you want to delete this package?",
          icon: <ExclamationCircleOutlined />,
          onOk() {
            confirmDelete(id);
          },
          width: "40vw",
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const confirmDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await packageRepository.deletePackage(id);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Delete delivery Success`,
      });
      fetchPackages();
    } catch (error) {
      setIsLoading(false);
    }
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
                content={postal.packages}
                loading={isLoading}
                onConfirm={onConfirmOrDeleteDelivery}
              />
            </TabCard>
          </TabPane>
        ))}
      </CustomTabs>
    </div>
  );
};

export default PackagePage;
