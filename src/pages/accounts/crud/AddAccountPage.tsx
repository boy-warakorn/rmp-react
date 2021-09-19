import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import Button from "@components/global/Button";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { Select, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { AccountRepository } from "@repository/AccountRepository";
import { accountSelector } from "@stores/accounts/selector";
import { setAccount } from "@stores/accounts/slice";
import Loading from "@components/global/Loading";

const { Option } = Select;

const AddAccountPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");
  const accountsRepository = RepositoriesFactory.get(
    "account"
  ) as AccountRepository;
  const accountsSelector = useSelector(accountSelector);
  const form = Form.useForm();

  const path = window.location.pathname.split("/")[3];

  useEffect(() => {
    if (path === "edit") {
      setIsEdit(true);
      fetchAccount();
    }
    // eslint-disable-next-line
  }, []);

  const fetchAccount = async () => {
    try {
      setIsLoading(true);
      const account = await accountsRepository.getAccount(id);
      if (account) {
        dispatch(setAccount(account));
        const {
          currentAccount: {
            profile: {
              name,
              citizenNumber,
              email,
              username,
              role,
              phoneNumber,
            },
          },
        } = accountsSelector;
        form[0].setFieldsValue({
          name: name,
          citizenNumber: citizenNumber,
          email: email,
          username: username,
          phoneNumber: phoneNumber,
        });
        setSelectedRole(role);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = async () => {
    const formValue = form[0].getFieldsValue();
    let roomDto: any = {
      name: formValue.name,
      citizenNumber: formValue.citizenNumber,
      phoneNumber: formValue.phoneNumber,
      role: selectedRole,
    };
    try {
      setIsLoading(true);
      if (isEdit) {
        await accountsRepository.editAccount(roomDto, id);
      } else {
        roomDto.email = formValue.email;
        roomDto.username = formValue.username;
        await accountsRepository.addAccount(roomDto);
      }
      history.goBack();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>{isEdit ? `Edit Account` : `New Account`}</HeadingText3>
      </div>
      <Form form={form[0]} onFinish={onFinish} className="col-span-12">
        <Card className="p-9">
          <HeadingText4>Personal Info</HeadingText4>

          <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
            <Form.Item
              className="col-span-2"
              name={["email"]}
              rules={[{ type: "email" }]}
            >
              <TextInput title="Email" disabled={isEdit} />
            </Form.Item>
            <Form.Item
              className="col-span-2"
              name={["name"]}
              rules={[{ required: true }]}
            >
              <TextInput title="Name" />
            </Form.Item>
            <Form.Item
              className="col-span-2"
              name={["username"]}
              rules={[
                {
                  required: isEdit
                    ? accountsSelector.currentAccount.profile.role !==
                      "resident"
                    : true,
                },
              ]}
            >
              <TextInput title="Username" disabled={isEdit} />
            </Form.Item>
            <div className="col-span-2">
              <div className="flex flex-col">
                <BodyText1 className="font-bold mb-2">Role</BodyText1>
                <Select
                  disabled={
                    isEdit
                      ? accountsSelector.currentAccount.profile.role ===
                        "resident"
                      : false
                  }
                  value={selectedRole}
                  onChange={(value: string) => setSelectedRole(value)}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="resident" disabled>
                    Resident
                  </Option>
                  <Option value="personnel">Condo's Personnel</Option>
                </Select>
              </div>
            </div>
            <Form.Item
              className="col-span-2 mt-6"
              name={["phoneNumber"]}
              rules={[{ pattern: RegExp("^[0][0-9]{9}$") }]}
            >
              <TextInput title="Phone number" />
            </Form.Item>
            <Form.Item
              className="col-span-2 mt-6"
              name={["citizenNumber"]}
              rules={[{ pattern: RegExp("^[0-9]{13}$") }]}
            >
              <TextInput title="Citizen number" />
            </Form.Item>
          </FormCard>

          <div className="flex justify-end mt-9">
            <Button
              color="primary"
              className="px-12 font-roboto text-sm"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Card>
      </Form>
    </Fragment>
  );
};

export default AddAccountPage;
