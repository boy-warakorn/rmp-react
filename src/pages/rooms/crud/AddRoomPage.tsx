import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import Card, { FormCard } from "@components/global/Card";
import Button from "@components/global/Button";
import { Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import TextInput from "@components/global/form/TextInput";
import { useParams } from "react-router";

const { Option } = Select;

const AddRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState(false);

  const path = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (path !== "add") setIsEdit(true);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>
          {isEdit ? "Edit" : "Add"} Room {isEdit && id}
        </HeadingText3>
      </div>
      <Card className="p-9 col-span-12">
        <HeadingText4>Room detail</HeadingText4>
        <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
          <div className="col-span-1">
            <TextInput title="Room Number" />
          </div>
          <div className="col-span-2">
            <div className="flex flex-col">
              <BodyText1 className="font-bold mb-2">Type</BodyText1>
              <Select value="1">
                <Option value="1">2 bed, 1 bath</Option>
              </Select>
            </div>
          </div>
          <div className="col-span-1">
            <TextInput title="Size" />
          </div>
          <div className="col-span-1 self-end">
            <Select value="sqrm">
              <Option value="sqrm">Square Meters</Option>
            </Select>
          </div>
        </FormCard>
        <HeadingText4 className="mt-9">Rent and Pricing</HeadingText4>
        <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
          <div className="col-span-1 ">
            <TextInput title="Rent per month" suffix="THB" />
          </div>
          <div className="col-span-1">
            <TextInput title="Purchase price" suffix="THB" />
          </div>
        </FormCard>
        <div className="flex justify-end mt-9">
          <Button color="primary" className="px-12 ">
            Submit
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default AddRoomPage;
