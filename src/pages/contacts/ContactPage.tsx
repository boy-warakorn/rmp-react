import Card from "@components/global/Card";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import TextButton from "@components/global/TextButton";
import { ContactRepository } from "@repository/ContactRepository";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { contactSelector } from "@stores/contacts/selector";
import { setContacts } from "@stores/contacts/slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const ContactPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const contact = useSelector(contactSelector);
  const contactRepository = RepositoriesFactory.get(
    "contact"
  ) as ContactRepository;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const contacts = await contactRepository.getContacts();
      if (contacts) {
        dispatch(setContacts(contacts));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 50,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 50,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      width: 50,
    },

    {
      title: "Manage",
      dataIndex: "manage",
      width: 50,
      fixed: "right",
      render: (_: any, record: any) => (
        <TextButton
          className="text-primary"
          title="View Detail"
          onClick={() => history.push(`/contacts/${record.id}`)}
        />
      ),
    },
  ] as any;

  return (
    <Card className="col-span-12 mt-3 p-9">
      <HeaderTable
        title="All Contacts"
        buttonTitle="Add new contact"
        onClick={() => history.push("/contacts/add")}
        haveFilter={false}
      />
      <CustomTable
        className="mt-6"
        columns={columns}
        dataSource={contact.contacts}
        loading={isLoading}
      />
    </Card>
  );
};

export default ContactPage;
