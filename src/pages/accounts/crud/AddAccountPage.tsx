import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import Button from "@components/global/Button";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";

const { Option } = Select;

const AddAccountPage = () => {
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
        <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
          <div className="col-span-2">
            <TextInput title="Email" />
          </div>
          <div className="col-span-2">
            <TextInput title="Name" />
          </div>
          <div className="col-span-2">
            <TextInput title="Username" />
          </div>
          <div className="col-span-2">
            <div className="flex flex-col">
              <BodyText1 className="font-bold mb-2">Role</BodyText1>
              <Select value="admin">
                <Option value="admin">Admin</Option>
                <Option value="personnel">Condo's Personnel</Option>
              </Select>
            </div>
          </div>
          <div className="col-span-2 mt-6">
            <TextInput title="Phone number" />
          </div>
          <div className="col-span-2 mt-6">
            <TextInput title="Citizen number" />
          </div>
        </FormCard>
        <div className="flex justify-end mt-9">
          <Button color="primary" className="px-12 font-roboto text-sm">
            Submit
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default AddAccountPage;
