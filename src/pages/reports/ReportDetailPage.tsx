import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import Button from "@components/global/Button";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
  SubHeadingText1,
} from "@components/global/typography/Typography";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { ReplyReportDto, ReportRepository } from "@repository/ReportRepository";
import { reportSelector } from "@stores/reports/selector";
import { setReport } from "@stores/reports/slice";
import Loading from "@components/global/Loading";
import { Form } from "antd";
import dayjs from "dayjs";
import { useForm } from "antd/lib/form/Form";
import { isObjectEmpty } from "@utils/isObjEmpty";

const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const reportsRepository = RepositoriesFactory.get(
    "report"
  ) as ReportRepository;
  const report = useSelector(reportSelector);
  const form = useForm();

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line
  }, []);

  const onFinish = async () => {
    const formValue = form[0].getFieldsValue();
    let replyDto: ReplyReportDto = {
      detail: formValue.detail,
    };
    try {
      setIsLoading(true);
      await reportsRepository.replyReport(id, replyDto);
      history.goBack();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReport = async () => {
    try {
      setIsLoading(true);
      const reportResponse = await reportsRepository.getReport(id);
      if (reportResponse) {
        dispatch(setReport(reportResponse));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onResolveReport = async () => {
    try {
      setIsLoading(true);
      await reportsRepository.resolveReport(id);
      history.goBack();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading || isObjectEmpty(report.currentReport) ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Report Detail</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <HeadingText4>
          <span className="font-bold">From Room Number: </span>
          {report.currentReport.roomNumber}
        </HeadingText4>
        <FormCard className="mt-4">
          <HeadingText4>
            <span className="font-montserratBold">Title:</span>{" "}
            {report.currentReport.content.title}
          </HeadingText4>
          <SubHeadingText1 className="font-montserratBold mt-2">
            Received:{" "}
            <span className="font-montserrat">
              {dayjs(report.currentReport.requestedDate).format("D-MMMM-YYYY")}
            </span>{" "}
            at{" "}
            <span className="font-montserrat">
              {dayjs(report.currentReport.requestedDate).format("HH:MM A")}
            </span>
          </SubHeadingText1>
          <BodyText1 className="mt-2">
            {report.currentReport.content.detail}
          </BodyText1>
        </FormCard>
        <HeadingText4 className="mt-9">
          <span className="font-bold">Reply to this report</span>
        </HeadingText4>
        <Form form={form[0]} onFinish={onFinish}>
          <FormCard className="mt-4">
            {report.currentReport.status !== "pending" ? (
              <Fragment>
                <HeadingText4>
                  <span className="font-bold">Paragraph: </span>
                </HeadingText4>
                <BodyText1 className="mt-2">
                  {report.currentReport.content.respondDetail}
                </BodyText1>
              </Fragment>
            ) : (
              <Form.Item rules={[{ required: true }]} name="detail">
                <TextInput title="Paragraph" rows={7} />
              </Form.Item>
            )}
          </FormCard>
          {report.currentReport.status !== "resolved" && (
            <div className="flex justify-end mt-9">
              <Button
                onClick={onResolveReport}
                color="primary"
                className={`px-12 font-roboto text-sm ${
                  report.currentReport.status === "responded" ? "" : "mr-4"
                }`}
              >
                Mark as Resolved
              </Button>
              {report.currentReport.status === "responded" ? (
                <div></div>
              ) : (
                <Button
                  color="primary"
                  className="px-12 font-roboto text-sm"
                  htmlType="submit"
                >
                  Submit
                </Button>
              )}
            </div>
          )}
        </Form>
      </Card>
    </Fragment>
  );
};

export default ReportDetailPage;
