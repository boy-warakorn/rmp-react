import Card from "@components/global/Card";
import OutlineButton from "@components/global/OutlineButton";
import Button from "@components/global/Button";
import {
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import React, { Fragment } from "react";
import { useHistory, useParams } from "react-router";

const AccountDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Account Detail</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <div className="grid grid-cols-8 gap-y-3">
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Email</HeadingText4>
          </div>
          <div className="col-span-7"></div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Name</HeadingText4>
          </div>
          <div className="col-span-7"></div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Role</HeadingText4>
          </div>
          <div className="col-span-7"></div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Citizen number</HeadingText4>
          </div>
          <div className="col-span-7"></div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Phone number</HeadingText4>
          </div>
          <div className="col-span-7"></div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Created at</HeadingText4>
          </div>
          <div className="col-span-7"></div>
        </div>
        <div className="flex justify-end mt-9">
          <Button color="danger" className="px-12 mr-4">
            Delete
          </Button>
          <OutlineButton
            className="px-12"
            onClick={() => history.push(`/contacts/${id}/edit`)}
          >
            Edit
          </OutlineButton>
        </div>
      </Card>
    </Fragment>
  );
};

export default AccountDetailPage;
