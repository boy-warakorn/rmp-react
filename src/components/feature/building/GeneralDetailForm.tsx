import { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import { HeadingText4 } from "@components/global/typography/Typography";
import { GeneralDetail } from "@pages/buildings/crud/AddBuildingPage";
import React, { ChangeEvent, Fragment } from "react";

interface GeneralDetailFormProps {
  generalDetails: GeneralDetail;
  onInputChange(
    e: ChangeEvent<HTMLInputElement>,
    name: keyof GeneralDetail
  ): void;
}

const GeneralDetailForm = ({
  generalDetails,
  onInputChange,
}: GeneralDetailFormProps) => {
  return (
    <Fragment>
      <HeadingText4>Detail</HeadingText4>
      <FormCard className="grid grid-cols-4 gap-x-4 mt-4">
        <div className="col-span-2">
          <TextInput
            value={generalDetails.buildingName}
            title="Building name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onInputChange(e, "buildingName")
            }
          />
        </div>
        <div className="col-span-2">
          <TextInput
            value={generalDetails.roomPrefix}
            title="Room prefix (e.g. BP, A and AB)"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onInputChange(e, "roomPrefix")
            }
          />
        </div>
        <div className="col-span-4"></div>
        <div className="col-span-2 mt-6">
          <TextInput
            value={generalDetails.baseCommonCharge}
            title="Base common charge"
            suffix="Baht"
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onInputChange(e, "baseCommonCharge")
            }
            min={0}
          />
        </div>
        <div className="col-span-2 mt-6">
          <TextInput
            value={generalDetails.costPerMonth}
            title="Default cost per month"
            suffix="Baht"
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onInputChange(e, "costPerMonth")
            }
            min={0}
          />
        </div>
        <div className="col-span-4"></div>
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
  );
};

export default GeneralDetailForm;
