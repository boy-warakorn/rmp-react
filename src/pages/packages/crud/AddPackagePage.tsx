import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import Button from "@components/global/Button";
import { Select, Form, notification, Image } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomSelector } from "@stores/rooms/selector";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { RoomRepository } from "@repository/RoomRepository";
import { setRoomIDs } from "@stores/rooms/slice";
import Loading from "@components/global/Loading";
import { useForm } from "antd/lib/form/Form";
import dayjs, { Dayjs } from "dayjs";
import generatePicker from "antd/lib/date-picker/generatePicker";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import { PackageRepository } from "@repository/PackageRepository";
import { useHistory, useParams } from "react-router";
import { setPackage } from "@stores/packages/slice";

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);
const { Option } = Select;

const AddPackagePage = () => {
  const { id } = useParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [arrivedTime, setArrivedTime] = useState(dayjs());
  const [imgList, setImgList] = useState<string[]>([]);
  const dispatch = useDispatch();
  const form = useForm();
  const history = useHistory();
  const room = useSelector(roomSelector);
  const packagesRepository = RepositoriesFactory.get(
    "package"
  ) as PackageRepository;
  const roomsRepository = RepositoriesFactory.get("room") as RoomRepository;

  const path = window.location.pathname.split("/")[3];

  useEffect(() => {
    fetchRoomIDList();
    if (path === "edit") {
      setIsEdit(true);
    }
    // eslint-disable-next-line
  }, []);

  const onSelect = (id: string) => setRoomNumber(id);

  const fetchPackage = async () => {
    try {
      const postalResponse = await packagesRepository.getPackage(id);
      if (postalResponse) {
        dispatch(setPackage(postalResponse));
        form[0].setFieldsValue({
          note: postalResponse.note,
          postalService: postalResponse.postalService,
        });
        setRoomNumber(postalResponse.roomNumber);
        setArrivedTime(dayjs(postalResponse.arrivedAt));
        setImgList(postalResponse.imgList);
      }
    } catch (error) {}
  };

  const fetchRoomIDList = async () => {
    try {
      setIsLoading(true);
      const roomIds = await roomsRepository.getRoomIDList();
      if (path === "edit") {
        await fetchPackage();
      }
      if (roomIds) {
        dispatch(setRoomIDs(roomIds));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const disabledDate = (current: any) => {
    return current && current.valueOf() > Date.now();
  };

  const onFinish = async () => {
    const formValue = form[0].getFieldsValue();
    if (!roomNumber) {
      notification.error({
        duration: 2,
        message: "Error",
        description: `Please select room number`,
      });
      return;
    }

    try {
      let packageDto: any = {
        note: formValue.note,
        postalService: formValue.postalService,
        arrivedAt: arrivedTime.format("YYYY-MM-DD HH:MM"),
      };
      if (isEdit) {
        await packagesRepository.updatePackage(id, packageDto);
      } else {
        packageDto.roomNumber = roomNumber;
        await packagesRepository.createPackage(packageDto);
      }
      notification.success({
        duration: 2,
        message: "Success",
        description: `${isEdit ? "Edit" : "Add"} Package Success`,
      });
      history.goBack();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>{isEdit ? "Edit" : "Add"} Package</HeadingText3>
      </div>
      <Form className="col-span-12" form={form[0]} onFinish={onFinish}>
        <Card className="p-9">
          <HeadingText4>Recipient’s detail</HeadingText4>
          <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
            <div className="col-span-2">
              <BodyText1 className="font-bold mb-2">Room Number</BodyText1>
              <Select
                showSearch
                defaultValue={roomNumber}
                style={{ width: "100%" }}
                placeholder="Select Room Number"
                onSelect={onSelect}
              >
                {room.roomIdList.map((id, index) => (
                  <Option value={id} key={`${id}${index}OptionRoomID`}>
                    {id}
                  </Option>
                ))}
              </Select>
            </div>
          </FormCard>
          <HeadingText4 className="mt-9">Package’s detail</HeadingText4>
          <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
            <div className="col-span-2 flex flex-col">
              <BodyText1 className="font-bold mb-2">Arrival time</BodyText1>
              <DatePicker
                value={arrivedTime}
                onSelect={(value: any) => setArrivedTime(value)}
                style={{ width: "100%" }}
                showToday
                showTime
                disabledDate={disabledDate}
              />
            </div>
            <Form.Item
              className="col-span-2"
              name={["postalService"]}
              rules={[{ required: true }]}
            >
              <TextInput title="Delivery service" />
            </Form.Item>
            <div className="col-span-4"></div>
            <Form.Item
              className="col-span-4 mt-6"
              name={["note"]}
              rules={[{ required: true }]}
            >
              <TextInput title="Additional notes" rows={3} />
            </Form.Item>
            <div className="col-span-4"></div>
            {isEdit && (
              <>
                <BodyText1 className="mt-4 font-bold mb-2">Images</BodyText1>
                <div
                  className="col-span-8 p-4 bg-white"
                  style={{
                    maxWidth: "100%",
                    overflowX: "scroll",
                    display: "inline-flex",
                  }}
                >
                  {imgList.map((imgUrl) => (
                    <img
                      height={"300px"}
                      width={"300px"}
                      className="mr-4 object-cover"
                      alt="image for postal"
                      src={imgUrl}
                    />
                  ))}
                </div>
              </>
            )}
          </FormCard>
          <div className="flex justify-end mt-9">
            <Button
              color="primary"
              className="px-12 font-roboto text-sm"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Card>
      </Form>
    </Fragment>
  );
};

export default AddPackagePage;
