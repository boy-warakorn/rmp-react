import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import {
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import { Steps, Form, Divider } from "antd";
import Button from "@components/global/Button";
import React, { ChangeEvent, Fragment, useState } from "react";

const { Step } = Steps;

interface GeneralDetail {
  buildingName: string;
  roomPrefix: string;
  baseCommonCharge: string;
  address: string;
}

const AddBuildingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [generalDetails, setGeneralDetails] = useState<GeneralDetail>({
    buildingName: "",
    roomPrefix: "",
    baseCommonCharge: "",
    address: "",
  });

  const isBtnDisabled =
    !generalDetails.address ||
    !generalDetails.baseCommonCharge ||
    !generalDetails.roomPrefix ||
    !generalDetails.buildingName;

  const onNextStep = () => {
    if (currentStep !== 1) setCurrentStep(currentStep + 1);
  };

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof GeneralDetail
  ) => setGeneralDetails({ ...generalDetails, [name]: e.target.value });

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Add Building</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <Steps
          current={currentStep}
          className="px-28"
          onChange={(current) => setCurrentStep(current)}
        >
          <Step
            title="General Building Detail"
            className="font-montserratMedium"
          />
          <Step
            title="Room Building Detail"
            className="font-montserratMedium"
          />
        </Steps>
        <Divider />
        <Form className="mt-6">
          {currentStep === 0 ? (
            <Fragment>
              <HeadingText4>Detail</HeadingText4>
              <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
                <div className="col-span-2">
                  <TextInput
                    value={generalDetails.buildingName}
                    title="Building name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onInputChange(e, "buildingName")
                    }
                  />
                </div>
                <div className="col-span-1">
                  <TextInput
                    value={generalDetails.roomPrefix}
                    title="Room prefix"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onInputChange(e, "roomPrefix")
                    }
                  />
                </div>
                <div className="col-span-5"></div>
                <div className="col-span-2 mt-6">
                  <TextInput
                    value={generalDetails.baseCommonCharge}
                    title="Base common charge"
                    suffix="THB"
                    type="number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onInputChange(e, "baseCommonCharge")
                    }
                  />
                </div>
                <div className="col-span-6"></div>
                <div className="col-span-4 mt-6">
                  <TextInput
                    title="Address"
                    value={generalDetails.address}
                    rows={5}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onInputChange(e, "address")
                    }
                  />
                </div>
              </FormCard>
            </Fragment>
          ) : (
            <div></div>
          )}
        </Form>
        <div className="flex justify-end mt-9">
          {currentStep !== 0 && (
            <Button
              color="primary"
              className="px-12 font-roboto text-sm mr-4"
              htmlType="submit"
              onClick={onPrevStep}
            >
              Prev
            </Button>
          )}

          <Button
            color="primary"
            className="px-12 font-roboto text-sm"
            htmlType={currentStep === 1 ? "submit" : ""}
            onClick={isBtnDisabled ? () => {} : onNextStep}
            isDisabled={isBtnDisabled}
          >
            {currentStep === 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default AddBuildingPage;
