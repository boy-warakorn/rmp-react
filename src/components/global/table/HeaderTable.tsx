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
import { SearchOutlined } from "@ant-design/icons";

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
  const [reportTypeState, setReportTypeState] = useState<string | undefined>(
    undefined
  );
  const [roomId, setRoomId] = useState<string | undefined>(undefined);
  const [buildingId, setBuildingId] = useState<string | undefined>(undefined);
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
    if (roomId) {
      setRoomId(undefined);
    }
    fetchRoomIds();
    // eslint-disable-next-line
  }, [buildingId]);

  const fetchRoomIds = async () => {
    try {
      setIsLoading(true);
      const roomIds = await roomRepository.getRoomIDList(true, buildingId);
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
      const roomIds = await roomRepository.getRoomIDList(true, buildingId);
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

  const onSearch = () => {
    console.log(buildingId, roomId);
    dispatch(setFilterBuildingId(buildingId));
    dispatch(setFilterRoomNumber(roomId));
    dispatch(setFilterReportType(reportTypeState));
  };

  return (
    <div className="flex justify-between">
      <HeadingText4>{title}</HeadingText4>
      <div className="flex">
        {haveFilter && (
          <Fragment>
            <Select
              showSearch
              value={buildingId}
              loading={isLoading}
              allowClear
              className="mr-4 w-52"
              placeholder="Filter Type"
              onSelect={(value: string) => setReportTypeState(value)}
              onClear={() => setReportTypeState(undefined)}
            >
              <Option value={""}>All</Option>
              <Option value={"complaint"}>Complaint</Option>
              <Option value={"maintenance"}>Maintenance</Option>
            </Select>
            <Select
              showSearch
              value={buildingId}
              loading={isLoading}
              allowClear
              className="mr-4 w-52"
              placeholder="Filter Building"
              onSelect={(value: string) => setBuildingId(value)}
              onClear={() => setBuildingId(undefined)}
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
              value={roomId}
              loading={isLoading}
              allowClear
              className="mr-4 w-52"
              placeholder="Filter Room Number"
              onSelect={(value: string) => setRoomId(value)}
              onClear={() => setRoomId(undefined)}
            >
              {room.roomIdList.map((id, index) => (
                <Option value={id} key={`${id}${index}HeaderTableRoomID`}>
                  {id}
                </Option>
              ))}
            </Select>
            <Button className="px-6 mr-4" onClick={onSearch}>
              <div className="flex items-center justify-center">
                <SearchOutlined style={{ fontSize: "16px" }} className="mr-2" />
                <BodyText1>Search</BodyText1>
              </div>
            </Button>
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
