import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import Button from "@components/global/Button";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { DatePicker } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";

const { RangePicker } = DatePicker;

const AddOwnerPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState(false);

  const path = window.location.pathname.split("/")[4];

  useEffect(() => {
    if (path === "edit") setIsEdit(true);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>
          {isEdit ? `Edit Room Owner` : `Add Room Owner to Room: ${id}`}
        </HeadingText3>
      </div>
      <div className="col-span-12">
        <Card className="p-9">
          <HeadingText4>General Information</HeadingText4>
          <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
            <div className="col-span-2">
              <TextInput title="Name" />
            </div>
            <div className="col-span-1">
              <TextInput title="Phone" />
            </div>
            <div className="col-span-3"></div>
            <div className="col-span-2 mt-6">
              <TextInput title="Citizen ID Number" />
            </div>
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
            <Button color="primary" className="px-12 ">
              Save
            </Button>
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default AddOwnerPage;
