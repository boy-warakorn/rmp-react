import Card from "@components/global/Card";
import HeaderTable from "@components/global/table/HeaderTable";
import CustomTable from "@components/global/table/Table";
import TextButton from "@components/global/TextButton";
import React from "react";
import { useHistory } from "react-router";

const ContactPage = () => {
  const history = useHistory();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },

    {
      title: "Manage",
      dataIndex: "manage",
      width: 50,
      render: (_: any, record: any) => (
        <TextButton
          className="text-primary"
          style={{ width: "max-content" }}
          title="View Detail"
          onClick={() => history.push(`/contacts/${record.id}`)}
        />
      ),
    },
  ];

  return (
    <Card className="col-span-12 mt-3 p-9">
      <HeaderTable
        title="All Contacts"
        buttonTitle="Add new contact"
        onClick={() => history.push("/contacts/add")}
      />
      <CustomTable
        className="mt-6"
        columns={columns}
        dataSource={[
          {
            id: "boy123",
            key: "1",
            name: "Boy",
            role: "Developer",
            phoneNumber: "012-345-6789",
            index: 1,
          },
          {
            id: "ohn123",
            key: "2",
            name: "Ohn",
            role: "Developer",
            phoneNumber: "012-345-6789",
            index: 2,
          },
        ]}
      />
    </Card>
  );
};

export default ContactPage;
