import React from "react";
import {
  Button,
  Form,
  Input,
  Drawer,
  Row,
  Col,
  Select,
  FormInstance,
  Tooltip,
} from "antd";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { CreateNewFaultsTypes } from "~/types";
import { getFMALAPIDocsURL } from "~/utils";
import { useCreateFault, useGetFaultsMetaData } from "~/hooks";

const NewFaultsForm = () => {
  const formRef = React.createRef<FormInstance>();
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const faultsMetaDataInfo = useGetFaultsMetaData();
  const createFaultAction = useCreateFault();

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };

  const handleSubmitCreateNewFault = (
    newFaultFormValues: CreateNewFaultsTypes
  ) => {
    createFaultAction.mutate(
      { newFaultData: newFaultFormValues },
      {
        onSuccess: () => {
          formRef.current?.resetFields();
          setIsFormVisible(!isFormVisible);
        },
      }
    );
  };

  const toggleDrawer = () => {
    formRef.current?.resetFields();
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <Button type="primary" onClick={toggleDrawer} icon={<PlusOutlined />}>
        New Fault
      </Button>
      <Drawer
        data-testid="NewFaultsForm"
        title="Create a New Fault"
        width={730}
        onClose={toggleDrawer}
        visible={isFormVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <>
            <Tooltip
              placement="left"
              title={
                <>
                  <p>
                    For more information on the permitted{" "}
                    <code>deadpool-api</code> values, consider viewing the
                    swagger API documentation page:
                  </p>
                  <a
                    href={getFMALAPIDocsURL().url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {getFMALAPIDocsURL().shortText}
                  </a>
                </>
              }
            >
              <QuestionCircleOutlined style={{ fontSize: 20 }} />
            </Tooltip>
          </>
        }
      >
        <Form
          ref={formRef}
          layout="vertical"
          id="new-fault-form"
          onFinish={handleSubmitCreateNewFault}
          validateMessages={validateMessages}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="hostnames"
                label="Hostnames"
                rules={[{ required: true }]}
                tooltip={
                  <>
                    <p>
                      Example: <code>ltx1-app0368.stg.linkedin.com</code> <br />
                      You can also type in multiple hostnames by hitting enter
                      after each entry
                      <br />
                      For more information on valid submittable values consider
                      referring to our API docs{" "}
                      <a
                        href={getFMALAPIDocsURL().url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {getFMALAPIDocsURL().shortText}
                      </a>
                    </p>
                  </>
                }
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="ltx1-app0368.stg.linkedin.com; hit enter for multiple"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="component"
                label="Component"
                rules={[{ required: true }]}
              >
                <Input placeholder="Component that failed" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fault_type"
                label="Fault Type"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select a Fault Type" showSearch allowClear>
                  {(faultsMetaDataInfo.data?.faultTypes || [])?.map(
                    (option) => (
                      <Select.Option
                        key={option}
                        value={option}
                        name="fault_type"
                      >
                        {option}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="team" label="Team" rules={[{ required: true }]}>
                <Select placeholder="Select a Team" showSearch allowClear>
                  {(faultsMetaDataInfo.data?.teams || []).map((team) => (
                    <Select.Option key={team} value={team} name="team">
                      {team}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter a Description for the Fault"
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={toggleDrawer}
              style={{ marginRight: "1rem" }}
              disabled={createFaultAction.isLoading}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={createFaultAction.isLoading}
              disabled={createFaultAction.isLoading}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default NewFaultsForm;
