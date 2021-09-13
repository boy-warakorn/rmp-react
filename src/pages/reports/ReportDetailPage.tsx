import Card, { FormCard } from "@components/global/Card";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
  SubHeadingText1,
} from "@components/global/typography/Typography";
import React, { Fragment } from "react";
import { useParams } from "react-router";

const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Report Detail</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <HeadingText4>
          <span className="font-bold">From Room Number: </span>
          {id}
        </HeadingText4>
        <FormCard className="mt-4">
          <SubHeadingText1 className="font-montserratBold">
            Received: <span className="font-montserrat">20 July 2020</span> at{" "}
            <span className="font-montserrat">08:00 PM</span>
          </SubHeadingText1>
          <BodyText1 className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            nihil a possimus delectus nemo dolorum harum quibusdam! Vero enim,
            repellendus odio accusantium laudantium fugit, ipsa magni, pariatur
            esse quibusdam voluptas! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consequatur alias, ipsam laboriosam reiciendis
            eligendi animi unde accusamus illo numquam ab neque vero ut autem
            consequuntur tenetur itaque maiores facere iste!
          </BodyText1>
        </FormCard>
      </Card>
    </Fragment>
  );
};

export default ReportDetailPage;
