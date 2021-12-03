import Card from "@components/global/Card";
import { userSelector } from "@stores/user/selector";
import { Descriptions } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { HeadingText4 } from "@components/global/typography/Typography";
import Button from "@components/global/Button";
import RoleTag from "@components/feature/account/RoleTag";
import { useHistory } from "react-router";

const ProfilePage = () => {
  const user = useSelector(userSelector);
  const history = useHistory();

  return (
    <Fragment>
      <Card className="col-span-9 h-full mt-4 p-6">
        <HeadingText4>User Profile</HeadingText4>
        <Descriptions
          column={1}
          bordered
          labelStyle={{ fontWeight: "bold" }}
          className="mt-4"
        >
          <Descriptions.Item label="Role">
            <RoleTag role={user?.user.profile.role as any} />
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            {user?.user.profile.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {user?.user.profile.email}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {user?.user.profile.username}
          </Descriptions.Item>
          <Descriptions.Item label="Phone number">
            {user?.user.profile.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Citizen Number">
            {user?.user.profile.citizenNumber}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className="col-span-3 h-full mt-4 p-6">
        <HeadingText4>Manage</HeadingText4>
        <Button
          className="w-full mt-4"
          onClick={() => history.push(`/manage-accounts/${user?.user.id}/edit`)}
        >
          Edit Profile
        </Button>
        <Button
          className="w-full mt-2"
          color="primary"
          onClick={() => history.push(`/profile/change-password`)}
        >
          Change Password
        </Button>
      </Card>
    </Fragment>
  );
};

export default ProfilePage;
