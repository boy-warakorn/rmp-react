import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import Button from "@components/global/Button";
import { Form } from "antd";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { DatePicker } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { roomSelector } from "@stores/rooms/selector";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;

const AddOwnerPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const room = useSelector(roomSelector);

  const path = window.location.pathname.split("/")[4];

  useEffect(() => {
    if (path === "edit") {
      setIsEdit(true);
      initForm();
    }

    // eslint-disable-next-line
  }, []);

  const onFinish = () => {
    console.log("form.getFieldValues :>> ", form.getFieldsValue());
  };

  const initForm = () => {
    const {
      currentRoom: { resident },
    } = room;
    form.setFieldsValue({
      name: resident.name,
      phoneNumber: resident.phoneNumber,
      citizenNumber: resident.citizenNumber,
    });
  };

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>
          {isEdit ? `Edit Room Owner` : `Add Room Owner to Room: ${id}`}
        </HeadingText3>
      </div>
      <Card className="p-9 col-span-12">
        <HeadingText4>General Information</HeadingText4>
        <Form form={form} onFinish={onFinish}>
          <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
            <Form.Item
              name={["name"]}
              rules={[{ required: true }]}
              className="col-span-2"
            >
              <TextInput title="Name" />
            </Form.Item>
            <Form.Item
              name={["phoneNumber"]}
              rules={[{ pattern: RegExp("^[0][0-9]{9}$") }]}
              className="col-span-1"
            >
              <TextInput title="Phone" />
            </Form.Item>
            <div className="col-span-3"></div>
            <Form.Item
              name={["citizenNumber"]}
              rules={[{ pattern: RegExp("^[0-9]{13}$") }]}
              className="col-span-2 mt-6"
            >
              <TextInput title="Citizen ID Number" />
            </Form.Item>
          </FormCard>
          <HeadingText4 className="mt-9">Contract Information</HeadingText4>
          <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
            <div className="col-span-2 flex flex-col">
              <BodyText1 className="font-bold mb-2">
                Date move in {">"} Date move out
              </BodyText1>
              <RangePicker />
            </div>
          </FormCard>
          <div className="flex justify-end mt-9">
            <Button
              color="primary"
              className="px-12 font-roboto text-sm"
              htmlType="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </Fragment>
  );
};

export default AddOwnerPage;
