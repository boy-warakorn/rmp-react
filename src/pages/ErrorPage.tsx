import { Result } from "antd";
import Button from "@components/global/Button";
import React from "react";
import { useHistory } from "react-router";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <Result
      className="col-span-12"
      status="error"
      title="Request Failed"
      subTitle="Please wait some minutes before resubmitting."
      extra={[
        <Button onClick={() => history.replace("/home")}>
          Go to Homepage
        </Button>,
      ]}
    ></Result>
  );
};

export default ErrorPage;
