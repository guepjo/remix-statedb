import React from "react";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Tooltip,
} from "antd";
import { FilterOutlined, QuestionCircleOutlined } from "@ant-design/icons";
// import { FABRIC_GROUPS, FABRIC_OPTIONS } from 'components/NewFaultsForm/constants';
import { useSearchFiltersForm } from "~/hooks/useSearchFiltersForm";
import { formatFormDataOnSubmit } from "~/hooks/useSearchFiltersForm/utils";
import { useLoaderData } from "@remix-run/react";
import { LoaderData } from "~/types/data";
// import { getFMALAPIDocsURL } from "utils";
// import { TableSearchDateFiltersButton } from './TableSearchDateFiltersButton';

type TableSearchFiltersButtonProps = {
  data: any;
};

/**
 * @description
 * A button, which when clicked opens a search filter form.
 */
const TableSearchFiltersButton = (props: TableSearchFiltersButtonProps) => {
  const [form] = Form.useForm();
  const data = useLoaderData<LoaderData>();

  const searchFilterForm = useSearchFiltersForm({
    formInstance: form,
    data: props.data,
  });
  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
      <Button
        className="search-filters-button"
        data-testid="search-filters-button"
        type="default"
        icon={<FilterOutlined />}
        onClick={searchFilterForm.toggleSearchFiltersMenu}
        size="middle"
      >
        Search Filters
      </Button>

      <Drawer
        title="Faults - Search Filters"
        visible={searchFilterForm.isSearchFiltersFormOpen}
        data-testid="search-filters-drawer"
        onClose={searchFilterForm.toggleSearchFiltersMenu}
        width={750}
        extra={
          <>
            <Tooltip
              placement="left"
              title={
                <>
                  {/* <p>
                    For more information on the permitted <code>statedb-api</code> values, consider viewing the swagger
                    API documentation page:
                  </p> */}
                  {/* <a
                    href={getFMALAPIDocsURL().url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {getFMALAPIDocsURL().shortText}
                  </a> */}
                </>
              }
            >
              <QuestionCircleOutlined style={{ fontSize: 20 }} />
            </Tooltip>
          </>
        }
      >
        <Form
          form={form}
          layout="vertical"
          id="new-fault-form"
          onFinish={(formFieldValues) => {
            searchFilterForm.handleFormSubmit(formFieldValues);
            //searchFilterForm.toggleSearchFiltersMenu();
            console.log("form field avlues", formFieldValues);
          }}
          method="GET"
          validateMessages={validateMessages}
          initialValues={searchFilterForm.DEFAULT_FORM_VALUES}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                data-testid="search-filters-name"
              >
                <Input
                  placeholder="Employee name"
                  name="name"
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                data-testid="search-filters-department"
              >
                <Select
                  placeholder="Select a department"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.department}
                >
                  {[
                    "Engineering",
                    "Sales",
                    "Finance",
                    "Marketing",
                    "Legal",
                  ].map((option) => (
                    <Select.Option
                      key={option}
                      value={option}
                      name="department"
                    >
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="age"
                label="age"
                data-testid="search-filters-age"
                // rules={[
                //   {
                //     required: false,
                //     min: 8,
                //     validateTrigger: "onBlur",
                //     message: `Value does not match expected format. Example(s): lca1-app5225.stg.linkedin.com`,
                //   },
                // ]}
              >
                <Input
                  placeholder="age"
                  name="age"
                  type="number"
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.age}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider style={{ marginTop: 40 }} />
          <Row
            gutter={16}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Tooltip
              placement="top"
              title="This resets the form above, resets the search filters to their default state, including reseting the URL state."
            >
              <Button
                onClick={searchFilterForm.clearForm}
                style={{ marginRight: "auto" }}
              >
                Clear Form Fields
              </Button>
            </Tooltip>

            <Button
              onClick={searchFilterForm.toggleSearchFiltersMenu}
              style={{ marginRight: "1rem" }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default TableSearchFiltersButton;
