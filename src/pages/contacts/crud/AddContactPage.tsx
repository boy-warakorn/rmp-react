import Button from "@components/global/Button";
import Card, { FormCard } from "@components/global/Card";
import { Select, Form } from "antd";
import TextInput from "@components/global/form/TextInput";
import {
  HeadingText3,
  HeadingText4,
  BodyText1,
} from "@components/global/typography/Typography";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import RepositoriesFactory from "@repository/RepositoryFactory";
import {
  ContactRepository,
  CreateContactDto,
} from "@repository/ContactRepository";
import Loading from "@components/global/Loading";
import { useHistory, useParams } from "react-router";
import { setContact } from "@stores/contacts/slice";

const { Option } = Select;

const AddContactPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const [role, setRole] = useState("developer");
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const contactRepository = RepositoriesFactory.get(
    "contact"
  ) as ContactRepository;
  const form = useForm();
  const path = window.location.pathname.split("/")[3];

  useEffect(() => {
    if (path === "edit") {
      setIsEdit(true);
      fetchContact();
    }
    // eslint-disable-next-line
  }, []);

  const fetchContact = async () => {
    try {
      setIsLoading(true);
      const contact = await contactRepository.getContact(id);
      if (contact) {
        dispatch(setContact(contact));
        form[0].setFieldsValue({
          name: contact.name,
          address: contact.address,
          email: contact.email,
          phoneNumber: contact.phoneNumber,
        });
        setRole(contact.role);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    const formValue = form[0].getFieldsValue();
    const contactDto: CreateContactDto = {
      name: formValue.name,
      address: formValue.address,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      role: role,
    };
    setIsLoading(true);
    try {
      if (isEdit) {
        await contactRepository.editContact(id, contactDto);
      } else {
        await contactRepository.createContact(contactDto);
      }
      history.goBack();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onChangeTab = (value: string) => setRole(value);

  return isLoading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>{isEdit ? `Edit Contact` : `New Contact`}</HeadingText3>
      </div>
      <Form className="col-span-12" form={form[0]}>
        <Card className="p-9">
          <HeadingText4>Details</HeadingText4>
          <FormCard className="grid grid-cols-6 gap-x-4 mt-4">
            <Form.Item
              name={["name"]}
              rules={[{ required: true }]}
              className="col-span-2"
            >
              <TextInput title="Name" />
            </Form.Item>
            <div className="col-span-1">
              <div className="flex flex-col">
                <BodyText1 className="font-bold mb-2">Role</BodyText1>
                <Select value={role} onChange={onChangeTab}>
                  <Option value="developer">Developer</Option>
                  <Option value="engineer">Engineer</Option>
                  <Option value="technician">Technician</Option>
                  <Option value="resident-owner">Resident owner</Option>
                  <Option value="salesperson">Salesperson</Option>
                  <Option value="janitor">Janitor</Option>
                </Select>
              </div>
            </div>
            <div className="col-span-3"></div>
            <Form.Item
              name={["address"]}
              rules={[{ required: true }]}
              className="col-span-2 mt-6"
            >
              <TextInput title="Address" rows={3} />
            </Form.Item>
            <Form.Item
              name={["email"]}
              rules={[{ type: "email" }]}
              className="col-span-1 mt-6"
            >
              <TextInput title="Email" />
            </Form.Item>
            <Form.Item
              name={["phoneNumber"]}
              rules={[{ pattern: RegExp("^[0][0-9]{9}$") }]}
              className="col-span-1 mt-6"
            >
              <TextInput title="Phone number" />
            </Form.Item>
          </FormCard>
          <div className="flex justify-end mt-9">
            <Button
              color="primary"
              className="px-12 font-roboto text-sm"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </Card>
      </Form>
    </Fragment>
  );
};

export default AddContactPage;
