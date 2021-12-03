import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import Button from "@components/global/Button";
import { HeadingText3 } from "@components/global/typography/Typography";
import { Form, notification } from "antd";
import React, { useState } from "react";
import { ChangePasswordDto, UserRepository } from "@repository/UserRepository";
import { useHistory } from "react-router";
import RepositoriesFactory from "@repository/RepositoryFactory";

const ChangePasswordPage = () => {
  const [, setIsLoading] = useState(false);
  const form = Form.useForm();
  const history = useHistory();
  const usersRepository = RepositoriesFactory.get("user") as UserRepository;

  const onFinish = async () => {
    const formValue = form[0].getFieldsValue();
    const changePasswordDto: ChangePasswordDto = {
      currentPassword: formValue.currentPassword,
      newPassword: formValue.newPassword,
    };

    try {
      setIsLoading(true);

      await usersRepository.changePassword(changePasswordDto);
      notification.success({
        duration: 2,
        message: "Success",
        description: `Change Password Success`,
      });
      history.goBack();
    } catch (error) {
      notification.error({
        duration: 2,
        message: "Error",
        description: `Your current password did not match the one that in our system`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="col-span-12 mt-4 py-8 flex flex-col items-center">
      <HeadingText3>Change Password</HeadingText3>
      <FormCard className="mt-4" style={{ width: "30vw" }}>
        <Form form={form[0]} onFinish={onFinish}>
          <Form.Item name={["currentPassword"]} rules={[{ required: true }]}>
            <TextInput title="Current Password" isPassword />
          </Form.Item>
          <Form.Item name={["newPassword"]} rules={[{ required: true }]}>
            <TextInput title="New Password" isPassword />
          </Form.Item>
          <Form.Item
            name={["confirmNewPassword"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <TextInput title="Confirm New Password" isPassword />
          </Form.Item>
          <div className="flex justify-end">
            <Button color="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </FormCard>
    </Card>
  );
};

export default ChangePasswordPage;
