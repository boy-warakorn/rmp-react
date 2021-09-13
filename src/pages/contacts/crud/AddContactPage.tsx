import Button from "@components/global/Button";
import Card, { FormCard } from "@components/global/Card";
import { Select } from "antd";
import TextInput from "@components/global/form/TextInput";
import {
  HeadingText3,
  HeadingText4,
  BodyText1,
} from "@components/global/typography/Typography";
import React, { Fragment, useEffect, useState } from "react";

const { Option } = Select;

const AddContactPage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const path = window.location.pathname.split("/")[3];

  useEffect(() => {
    if (path === "edit") setIsEdit(true);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>{isEdit ? `Edit Contact` : `New Contact`}</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <HeadingText4>Details</HeadingText4>
        <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
          <div className="col-span-2">
            <TextInput title="Name" />
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <BodyText1 className="font-bold mb-2">Role</BodyText1>
              <Select value="1">
                <Option value="1">Developer</Option>
              </Select>
            </div>
          </div>
          <div className="col-span-3"></div>
          <div className="col-span-2 mt-6">
            <TextInput title="Address" rows={3} />
          </div>
          <div className="col-span-1 mt-6">
            <TextInput title="Email" />
          </div>
          <div className="col-span-1 mt-6">
            <TextInput title="Phone number" />
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

export default AddContactPage;
