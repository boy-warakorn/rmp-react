import React, { Fragment, useEffect, useState } from "react";
import Button from "@components/global/Button";
import { Select } from "antd";
import { HeadingText4, BodyText1 } from "../typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { roomSelector } from "@stores/rooms/selector";
import RepositoryFactory from "@repository/RepositoryFactory";
import { RoomRepository } from "@repository/RoomRepository";
import { setRoomIDs } from "@stores/rooms/slice";
import {
  clearFilter,
  setFilterBuildingId,
  setFilterReportType,
  setFilterRoomNumber,
} from "@stores/filters/slice";
import { BuildingRepository } from "@repository/BuildingRepository";
import { setBuildingIds } from "@stores/buildings/slice";
import { buildingSelector } from "@stores/buildings/selector";
import { filterSelector } from "@stores/filters/selector";

interface HeaderTableProps {
  title: string;
  buttonTitle?: string;
  haveFilter?: boolean;
  onClick?: () => void;
}

const { Option } = Select;

const HeaderTable = ({
  title,
  buttonTitle,
  onClick,
  haveFilter = true,
}: HeaderTableProps) => {
  const dispatch = useDispatch();

  const filter = useSelector(filterSelector);
  const room = useSelector(roomSelector);
  const building = useSelector(buildingSelector);
  const roomRepository = RepositoryFactory.get("room") as RoomRepository;
  const buildingRepository = RepositoryFactory.get(
    "building"
  ) as BuildingRepository;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (haveFilter) {
      fetchMasterData();
    }
    return () => {
      dispatch(clearFilter());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filter.filterRoomNumber && filter.filterBuildingId) {
      dispatch(setFilterRoomNumber(undefined));
    }
    fetchRoomIds();
    // eslint-disable-next-line
  }, [filter.filterBuildingId]);

  const fetchRoomIds = async () => {
    try {
      setIsLoading(true);
      const roomIds = await roomRepository.getRoomIDList(
        true,
        filter.filterBuildingId
      );
      if (roomIds) {
        dispatch(setRoomIDs(roomIds));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMasterData = async () => {
    try {
      setIsLoading(true);
      const roomIds = await roomRepository.getRoomIDList(
        true,
        filter.filterBuildingId
      );
      const buildingIds = await buildingRepository.getBuildingIds();
      if (roomIds && buildingIds) {
        dispatch(setRoomIDs(roomIds));
        dispatch(setBuildingIds(buildingIds));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between overflow-y-scroll">
      <HeadingText4 className="w-max whitespace-nowrap mr-4">
        {title}
      </HeadingText4>
      <div className="flex">
        {haveFilter && (
          <Fragment>
            {window.location.pathname.includes("complaints") && (
              <Select
                showSearch
                value={filter.filterReportType}
                loading={isLoading}
                allowClear
                className="mr-4 w-52"
                placeholder="Filter Type"
                onSelect={(value: string) =>
                  dispatch(setFilterReportType(value))
                }
                onClear={() => dispatch(setFilterReportType(undefined))}
              >
                <Option value={""}>All</Option>
                <Option value={"complaint"}>Complaint</Option>
                <Option value={"maintenance"}>Maintenance</Option>
              </Select>
            )}

            <Select
              showSearch
              value={filter.filterBuildingId}
              loading={isLoading}
              allowClear
              className="mr-4 w-52"
              placeholder="Filter Building"
              onSelect={(value: string) => dispatch(setFilterBuildingId(value))}
              onClear={() => dispatch(setFilterBuildingId(undefined))}
            >
              {building.buildingIds.map((building, index) => (
                <Option
                  value={building.id}
                  key={`${building.id}${index}HeaderTableRoomID`}
                >
                  {building.buildingName}
                </Option>
              ))}
            </Select>
            <Select
              showSearch
              value={filter.filterRoomNumber}
              loading={isLoading}
              allowClear
              className={`${buttonTitle ? "mr-4" : ""} w-52`}
              placeholder="Filter Room Number"
              onSelect={(value: string) => dispatch(setFilterRoomNumber(value))}
              onClear={() => dispatch(setFilterRoomNumber(undefined))}
            >
              {room.roomIdList.map((id, index) => (
                <Option value={id} key={`${id}${index}HeaderTableRoomID`}>
                  {id}
                </Option>
              ))}
            </Select>
          </Fragment>
        )}
        {buttonTitle && (
          <Button color="primary" className="px-6" onClick={onClick}>
            <BodyText1>{buttonTitle}</BodyText1>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderTable;
