import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import Button from "@components/global/Button";
import { DatePicker } from "antd";
import React, { Fragment } from "react";

const AddPackagePage = () => {
  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Add Package</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <HeadingText4>Recipient’s detail</HeadingText4>
        <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
          <div className="col-span-1">
            <TextInput title="Room Number" />
          </div>

          <div className="col-span-2">
            <TextInput title="Name" />
          </div>
        </FormCard>
        <HeadingText4 className="mt-9">Package’s detail</HeadingText4>
        <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
          <div className="col-span-2 flex flex-col">
            <BodyText1 className="font-bold mb-2">Arrival time</BodyText1>
            <DatePicker />
          </div>
          <div className="col-span-2">
            <TextInput title="Delivery service" />
          </div>
          <div className="col-span-4"></div>
          <div className="col-span-2 mt-6">
            <TextInput title="Additional notes" />
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

export default AddPackagePage;
