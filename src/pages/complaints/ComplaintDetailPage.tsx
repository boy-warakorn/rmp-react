import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import Button from "@components/global/Button";
import {
  BodyText1,
  HeadingText3,
  HeadingText4,
  SubHeadingText1,
} from "@components/global/typography/Typography";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { ReplyReportDto, ReportRepository } from "@repository/ReportRepository";
import { reportSelector } from "@stores/reports/selector";
import { setReport } from "@stores/reports/slice";
import Loading from "@components/global/Loading";
import { Form, notification, Spin, Modal } from "antd";
import dayjs from "dayjs";
import { useForm } from "antd/lib/form/Form";
import { isObjectEmpty } from "@utils/isObjEmpty";

const ComplaintDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resolveReason, setResolveReason] = useState<string | undefined>(
    undefined
  );
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
      notification.success({
        duration: 2,
        message: "Success",
        description: `Reply report Success`,
      });
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

  const onResolveReport = () => {
    setIsModalVisible(true);
  };

  const onConfirmResolve = async () => {
    try {
      if (resolveReason) {
        setIsLoading(true);
        await reportsRepository.resolveReport(id, resolveReason);
        notification.success({
          duration: 2,
          message: "Success",
          description: `Resolve report Success`,
        });
        setIsModalVisible(false);
        history.goBack();
      }
    } catch (error) {
    } finally {
      setIsModalVisible(false);
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
          <SubHeadingText1 className="font-montserratBold mt-2 mb-2">
            Images
          </SubHeadingText1>
          <div
            className="p-4 bg-white w-full"
            style={{
              maxWidth: "100%",
              overflowX: "scroll",
              display: "inline-flex",
            }}
          >
            {report.currentReport.imgList.map((imgUrl) => (
              <img
                height={"300px"}
                width={"300px"}
                className="mr-4 object-cover"
                alt="image for postal"
                src={imgUrl}
              />
            ))}
          </div>
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
                  {!report.currentReport.content.respondDetail
                    ? "-"
                    : report.currentReport.content.respondDetail}
                </BodyText1>
              </Fragment>
            ) : (
              <Form.Item rules={[{ required: true }]} name="detail">
                <TextInput title="Paragraph" rows={7} />
              </Form.Item>
            )}
          </FormCard>
          {report.currentReport.status === "resolved" && (
            <Fragment>
              <HeadingText4 className="mt-9">
                <span className="font-bold">Resolve Detail</span>
              </HeadingText4>
              <BodyText1 className="mt-1">
                <span className="font-bold">Resolve By: </span>
                {report.currentReport.content.resolveBy}
              </BodyText1>
              <FormCard className="mt-4">
                <Fragment>
                  <HeadingText4>
                    <span className="font-bold">Detail: </span>
                  </HeadingText4>
                  <SubHeadingText1 className="font-montserratBold mt-2">
                    Resolved:{" "}
                    <span className="font-montserrat">
                      {dayjs(report.currentReport.resolvedDate).format(
                        "D-MMMM-YYYY"
                      )}
                    </span>{" "}
                    at{" "}
                    <span className="font-montserrat">
                      {dayjs(report.currentReport.resolvedDate).format(
                        "HH:MM A"
                      )}
                    </span>
                  </SubHeadingText1>
                  <BodyText1 className="mt-2">
                    {report.currentReport.content.resolveDetail}
                  </BodyText1>
                </Fragment>
              </FormCard>
            </Fragment>
          )}
          {report.currentReport.status !== "resolved" && (
            <div className="flex justify-end mt-9">
              <Button
                onClick={onResolveReport}
                color="primary"
                className={`px-12 font-roboto text-sm ${
                  report.currentReport.status === "responded" ? "" : "mr-4"
                }`}
              >
                Resolve Report
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
      <Modal
        title="Resolve Report"
        visible={isModalVisible}
        onOk={onConfirmResolve}
        onCancel={() => {
          setIsModalVisible(false);
          setResolveReason(undefined);
        }}
        okText="Confirm"
      >
        <div className="flex flex-col justify-center">
          {isLoading ? (
            <Spin />
          ) : (
            <Fragment>
              <HeadingText4 className="mb-2">
                Please inform a detail
              </HeadingText4>
              <TextInput
                title="Detail"
                rows={5}
                value={resolveReason}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setResolveReason(e.target.value)
                }
              />
            </Fragment>
          )}
        </div>
      </Modal>
    </Fragment>
  );
};

export default ComplaintDetailPage;
