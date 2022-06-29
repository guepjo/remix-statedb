import React, { useEffect, useRef } from "react";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Input,
  Row,
  Form as AntForm,
  Select,
  Switch,
  Tooltip,
} from "antd";
import { Form, useSearchParams } from "@remix-run/react";
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
  const [form] = AntForm.useForm();
  let formRef = useRef<HTMLFormElement>(null);
  const searchFilterForm = useSearchFiltersForm({
    formInstance: form,
    formRef: formRef,
  });
  const [params] = useSearchParams();
  let isAdding = true;
  useEffect(() => {
    formRef.current?.reset();
    //searchFilterForm.toggleSearchFiltersMenu;
  }, [isAdding]);

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
      >
        <Form id="new-fault-form" ref={formRef} method="get">
          <Row gutter={16}>
            <Col span={12}>
              <AntForm.Item
                name="name"
                label="Name"
                data-testid="search-filters-name"
              >
                <Input
                  placeholder="Employee name"
                  name="name"
                  allowClear
                  defaultValue={(params.get("name") as string) || ""}
                />
              </AntForm.Item>
            </Col>
            <Col span={12}>
              <AntForm.Item
                name="department"
                label="Department"
                data-testid="search-filters-department"
              >
                <Select
                  placeholder="Select a department"
                  showSearch
                  allowClear
                  defaultValue={(params.get("department") as string) || ""}
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
              </AntForm.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <AntForm.Item
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
                  defaultValue={(params.get("age") as string) || ""}
                />
              </AntForm.Item>
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

            <Button
              type="primary"
              htmlType="submit"
              onClick={searchFilterForm.toggleSearchFiltersMenu}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default TableSearchFiltersButton;
