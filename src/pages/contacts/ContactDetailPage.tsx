import Button from "@components/global/Button";
import Card from "@components/global/Card";
import Loading from "@components/global/Loading";
import OutlineButton from "@components/global/OutlineButton";
import {
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { ContactRepository } from "@repository/ContactRepository";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { contactSelector } from "@stores/contacts/selector";
import { setContact } from "@stores/contacts/slice";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

const ContactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const contact = useSelector(contactSelector);
  const contactRepository = RepositoriesFactory.get(
    "contact"
  ) as ContactRepository;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchContactDetail();
    // eslint-disable-next-line
  }, []);

  const fetchContactDetail = async () => {
    try {
      setIsLoading(true);
      const contactResponse = await contactRepository.getContact(id);
      if (contactResponse) {
        dispatch(setContact(contactResponse));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = () => {
    confirm({
      title: "Do you want to delete this contact?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        confirmDelete();
      },
      width: "40vw",
    });
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      await contactRepository.deleteContact(id);
      setIsLoading(false);
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
        <HeadingText3>Contact Detail</HeadingText3>
      </div>
      <Card className="p-9 col-span-12">
        <div className="grid grid-cols-8 gap-y-3">
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Name</HeadingText4>
          </div>
          <div className="col-span-7 font-roboto">
            {contact.currentContact.name}
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Address</HeadingText4>
          </div>
          <div className="col-span-7 font-roboto">
            {contact.currentContact.address}
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Role</HeadingText4>
          </div>
          <div className="col-span-7 font-roboto">
            {contact.currentContact.role}
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Email</HeadingText4>
          </div>
          <div className="col-span-7 font-roboto">
            {contact.currentContact.email}
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Phone Number</HeadingText4>
          </div>
          <div className="col-span-7 font-roboto">
            {contact.currentContact.phoneNumber}
          </div>
        </div>
        <div className="flex justify-end mt-9">
          <Button color="danger" className="px-12 mr-4" onClick={onDelete}>
            Delete
          </Button>
          <OutlineButton
            className="px-12 "
            onClick={() => history.push(`/contacts/${id}/edit`)}
          >
            Edit
          </OutlineButton>
        </div>
      </Card>
    </Fragment>
  );
};

export default ContactDetailPage;
