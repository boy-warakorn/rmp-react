import Card, { FormCard } from "@components/global/Card";
import Button from "@components/global/Button";
import TextInput from "@components/global/form/TextInput";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { Select } from "antd";
import React, { Fragment } from "react";

const { Option } = Select;

const AddPaymentPage = () => {
  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>New Invoice</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <HeadingText4>Detail</HeadingText4>
        <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
          <div className="col-span-1">
            <TextInput title="Room Number" />
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <BodyText1 className="font-bold mb-2">Payment Type</BodyText1>
              <Select value="1">
                <Option value="1">Rent</Option>
              </Select>
            </div>
          </div>
          <div className="col-span-1">
            <TextInput title="Amount" suffix="THB" />
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

export default AddPaymentPage;
