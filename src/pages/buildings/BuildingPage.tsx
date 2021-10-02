import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { Empty, Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import Button from "@components/global/Button";
import React, { Fragment, useState } from "react";
import BuildingCard from "@components/feature/building/BuildingCard";
import Card from "@components/global/Card";
import FloorCard from "@components/feature/building/FloorCard";
import FloorDetailSection from "@components/feature/building/FloorDetailSection";
import { useHistory } from "react-router";

const MOCKUP_BUILDING = [
  { id: "1", name: "Sansuk" },
  { id: "2", name: "Sansao" },
  { id: "3", name: "Saojung" },
];

const BuildingPage = () => {
  const history = useHistory();
  const [currentBuilding, setCurrentBuilding] = useState("");

  const onSelectBuilding = (id: string) => {
    if (currentBuilding !== id) {
      setCurrentBuilding(id);
    } else {
      setCurrentBuilding("");
    }
  };

  return (
    <Fragment>
      <Card className="col-span-12 flex flex-col p-6 mt-3 mb-4">
        <HeadingText4 className="col-span-12">Buildings List</HeadingText4>
        <div className="mt-3 flex justify-between">
          <Input
            placeholder="Search by building name"
            prefix={<SearchOutlined />}
            style={{ width: "30%" }}
          />
          <Button
            className="col-span-2"
            color="primary"
            onClick={() => history.push("/buildings/add")}
          >
            Add Building
          </Button>
        </div>
        <div className="flex overflow-x-scroll w-full p-3 mt-3">
          {MOCKUP_BUILDING.map((building) => (
            <BuildingCard
              onClick={() => onSelectBuilding(building.id)}
              buildingName={building.name}
              isSelected={currentBuilding === building.id}
            />
          ))}
        </div>
      </Card>
      {currentBuilding ? (
        <Fragment>
          <Card className="rounded-b-none col-span-12 p-6 ">
            <div className="flex justify-between">
              <HeadingText3>Building Details</HeadingText3>
              <CloseOutlined
                style={{ fontSize: "24px" }}
                className="cursor-pointer"
                onClick={() => setCurrentBuilding("")}
              />
            </div>

            <HeadingText4 className="mt-2">
              <span className="font-montserratBold">Building name:</span> Sansuk
            </HeadingText4>
            <BodyText1>
              <span className="font-montserratBold">Room prefix:</span> A
            </BodyText1>
            <BodyText1>
              <span className="font-montserratBold">Base common charge:</span>{" "}
              3,000
            </BodyText1>
            <BodyText1>
              <span className="font-montserratBold">Address:</span> Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Aliquid pariatur quod
              officia eum placeat rerum,
            </BodyText1>
            <BodyText1>
              <span className="font-montserratBold">Floors:</span> 4 floors
            </BodyText1>
            <div className="flex justify-end">
              <Button color="primary">Edit building detail</Button>
            </div>
          </Card>
          <Card
            className="col-span-12 rounded-t-none bg-card-bg flex"
            style={{ height: "55vh" }}
          >
            <div className="w-64 bg-background-dark rounded-bl-lg p-4 overflow-y-scroll">
              <FloorCard isFirst isSelected />
              <FloorCard />
              <FloorCard />
              <FloorCard />
            </div>
            <div className="p-4 w-full overflow-y-scroll">
              <FloorDetailSection />
            </div>
          </Card>
        </Fragment>
      ) : (
        <Card
          className="flex justify-center items-center col-span-12"
          style={{ minHeight: "40vh" }}
        >
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 150,
            }}
            description={
              <HeadingText4 className="text-grey font-montserratBold">
                Please select building
              </HeadingText4>
            }
          />
        </Card>
      )}
    </Fragment>
  );
};

export default BuildingPage;
