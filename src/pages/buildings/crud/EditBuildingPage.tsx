import Card, { FormCard } from "@components/global/Card";
import TextInput from "@components/global/form/TextInput";
import {
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import Button from "@components/global/Button";
import { Form, notification } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import RepositoriesFactory from "@repository/RepositoryFactory";
import {
  BuildingRepository,
  UpdateBuildingDto,
} from "@repository/BuildingRepository";
import { useForm } from "antd/lib/form/Form";
import Loading from "@components/global/Loading";

const EditBuildingPage = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const buildingRepository = RepositoriesFactory.get(
    "building"
  ) as BuildingRepository;
  const form = useForm();

  useEffect(() => {
    fetchBuilding();
    // eslint-disable-next-line
  }, []);

  const fetchBuilding = async () => {
    try {
      setIsLoading(true);
      const currentBuilding = await buildingRepository.getBuilding(id);
      if (currentBuilding) {
        form[0].setFieldsValue({
          buildingName: currentBuilding.buildingName,
          roomPrefix: currentBuilding.roomPrefix,
          commonCharge: currentBuilding.baseCommonCharge,
          costPerMonth: currentBuilding?.costPerMonth,
          address: currentBuilding.address,
        });
      }
      setIsLoading(false);
    } catch (error) {}
  };

  const onSubmit = async () => {
    try {
      const formValue = form[0].getFieldsValue();
      const updateBuildingDto: UpdateBuildingDto = {
        buildingName: formValue.buildingName,
        roomPrefix: formValue.roomPrefix,
        baseCommonCharge: formValue.baseCommonCharge,
        defaultCostPerMonth: formValue.costPerMonth,
        address: formValue.address,
      };
      setIsLoading(true);
      await buildingRepository.editBuilding(id, updateBuildingDto);
      notification.success({
        duration: 2,
        message: "Success",
        description: "Edit Building Success",
      });
      history.goBack();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Edit Building</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <Form form={form[0]} onFinish={onSubmit}>
          <HeadingText4>Detail</HeadingText4>
          <FormCard className="grid grid-cols-8 gap-x-4 mt-4">
            <Form.Item
              className="col-span-2"
              rules={[{ required: true }]}
              name="buildingName"
            >
              <TextInput title="Building name" />
            </Form.Item>
            <Form.Item
              className="col-span-2"
              rules={[{ required: true }]}
              name="roomPrefix"
            >
              <TextInput title="Room Prefix" disabled />
            </Form.Item>
            <div className="col-span-4"></div>
            <Form.Item
              className="col-span-2"
              rules={[{ required: true }]}
              name="commonCharge"
            >
              <TextInput title="Base common charge" disabled />
            </Form.Item>
            <Form.Item
              className="col-span-2"
              rules={[{ required: true }]}
              name="costPerMonth"
            >
              <TextInput title="Default cost per month" disabled />
            </Form.Item>
            <div className="col-span-4"></div>
            <Form.Item
              className="col-span-4"
              rules={[{ required: true }]}
              name="address"
            >
              <TextInput title="Address" rows={5} />
            </Form.Item>
          </FormCard>
          <div className="flex justify-end mt-9">
            <Button
              color="primary"
              className="px-12 font-roboto text-sm"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Fragment>
  );
};

export default EditBuildingPage;
