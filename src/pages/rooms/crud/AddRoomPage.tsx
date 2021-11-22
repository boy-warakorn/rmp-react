import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import Card, { FormCard } from "@components/global/Card";
import Button from "@components/global/Button";
import { notification, Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import TextInput from "@components/global/form/TextInput";
import { useHistory, useParams } from "react-router";
import { Form } from "antd";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { RoomRepository } from "@repository/RoomRepository";
import Loading from "@components/global/Loading";

const { Option } = Select;

const AddRoomPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedType,setSelectedType] = useState("");
  const form = Form.useForm();
  const history = useHistory();

  const roomRepository = RepositoriesFactory.get("room") as RoomRepository;

  const path = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (path !== "add") {
      setIsEdit(true);
      fetchRoomDetail();
    }
  
    // eslint-disable-next-line
  }, []);

  const fetchRoomDetail = async () => {
    const result = await roomRepository.getRoom(id);
    if (result) {
      const { room } = result;
      form[0].setFieldsValue({
        roomNumber: room.roomNumber,
        type: room.type,
        purchasePrice: room.purchasePrice,
        pricePerMonth: room.pricePerMonth,
        size: room.size,
        unit: "sqrms."
      });
      setSelectedType(room.type);
      
    }
  };

  const onFinish = async () => {
    const formValue = form[0].getFieldsValue();
    let roomDto: any = {
      roomNumber: formValue.roomNumber,
      type: selectedType,
      size: formValue.size,
      purchasePrice: formValue.purchasePrice,
      pricePerMonth: formValue.pricePerMonth,
      unit: formValue.unit,
    };
    try {
      setIsLoading(true);
      if (isEdit) {
        await roomRepository.editRoom(roomDto, id);
      } else {
        await roomRepository.addRoom(roomDto);
      }
      notification.success({
        duration: 2,
        message: "Success",
        description: `${isEdit ? "Edit" : "Add"} Room  Success`,
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
        <HeadingText3>
          {isEdit ? "Edit" : "Add"} Room {isEdit && id}
        </HeadingText3>
      </div>
      <Card className="p-9 col-span-12">
        <HeadingText4>Room detail</HeadingText4>
        <Form form={form[0]}>
          <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
            <Form.Item
              className="col-span-1"
              name={["roomNumber"]}
              rules={[{ required: true }]}
            >
              <TextInput title="Room Number" disabled={isEdit} />
            </Form.Item>
            <div className="col-span-2">
              <Form.Item
                className="flex flex-col"
                name={["type"]}
                rules={[{ required: true }]}
              >
                <BodyText1 className="font-bold mb-2">Type</BodyText1>
                <Select value="2 bed, 1 bath"onChange={(value)=>setSelectedType(value)} >
                  <Option value="2 bed, 1 bath">2 bed, 1 bath</Option>
                  <Option value="3 bed, 1 toilet">3 bed, 1 toilet</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              className="col-span-1"
              name={["size"]}
              rules={[{ required: true }]}
            >
              <TextInput title="Size" />
            </Form.Item>
            <Form.Item
              className="col-span-1"
              name={["unit"]}
              rules={[{ required: true }]}
            >
              <BodyText1 className="font-bold mb-2 opacity-0">1</BodyText1>
              <Select placeholder="Select unit" value="sqrms.">
                <Option value="sqrms.">Square Meters</Option>
              </Select>
            </Form.Item>
          </FormCard>
        </Form>
        <HeadingText4 className="mt-9">Rent and Pricing</HeadingText4>
        <Form form={form[0]} onFinish={onFinish}>
          <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
            <Form.Item
              className="col-span-1 "
              name={["pricePerMonth"]}
              rules={[{ required: true }]}
            >
              <TextInput title="Rent per month" suffix="THB" />
            </Form.Item>
            <Form.Item
              className="col-span-1"
              name={["purchasePrice"]}
              rules={[{ required: true }]}
            >
              <TextInput title="Purchase price" suffix="THB" />
            </Form.Item>
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
        </Form>
      </Card>
    </Fragment>
  );
};

export default AddRoomPage;
