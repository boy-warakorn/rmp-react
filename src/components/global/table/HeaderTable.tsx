import React, { useEffect, useState } from "react";
import Button from "@components/global/Button";
import { Select } from "antd";
import { HeadingText4, BodyText1 } from "../typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { roomSelector } from "@stores/rooms/selector";
import RepositoryFactory from "@repository/RepositoryFactory";
import { RoomRepository } from "@repository/RoomRepository";
import { setRoomIDs } from "@stores/rooms/slice";
import { clearFilter, setFilterRoomNumber } from "@stores/filters/slice";
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
  const room = useSelector(roomSelector);
  const filter = useSelector(filterSelector);
  const roomRepository = RepositoryFactory.get("room") as RoomRepository;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRoomIDList();
    return () => {
      dispatch(clearFilter());
    };
    // eslint-disable-next-line
  }, []);

  const fetchRoomIDList = async () => {
    try {
      setIsLoading(true);
      const roomIds = await roomRepository.getRoomIDList(true);
      if (roomIds) {
        dispatch(setRoomIDs(roomIds));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-between">
      <HeadingText4>{title}</HeadingText4>
      <div className="flex">
        {haveFilter && (
          <Select
            showSearch
            value={filter.filterRoomNumber}
            loading={isLoading}
            allowClear
            className="mr-4 w-52"
            placeholder="Filter Room Number"
            onSelect={(value: string) => dispatch(setFilterRoomNumber(value))}
            onClear={() => dispatch(clearFilter())}
          >
            {room.roomIdList.map((id, index) => (
              <Option value={id} key={`${id}${index}HeaderTableRoomID`}>
                {id}
              </Option>
            ))}
          </Select>
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
