import { Result } from "antd";
import Button from "@components/global/Button";
import React from "react";

const ErrorPage = () => {
  return (
    <Result
      className="col-span-12"
      status="error"
      title="Request Failed"
      subTitle="Please wait some minutes before resubmitting."
      extra={[
        <Button onClick={() => window.location.reload()}>
          Go to Homepage
        </Button>,
      ]}
    ></Result>
  );
};

export default ErrorPage;
