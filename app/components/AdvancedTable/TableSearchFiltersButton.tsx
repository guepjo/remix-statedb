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
import {
  FABRIC_GROUPS,
  FABRIC_OPTIONS,
} from "~/components/NewFaultsForm/constants";
import { useSearchFiltersForm } from "~/hooks";
import { getFMALAPIDocsURL } from "~/utils";
import { TableSearchDateFiltersButton } from "./TableSearchDateFiltersButton";

/**
 * @description
 * A button, which when clicked opens a search filter form.
 */
const TableSearchFiltersButton = () => {
  const [form] = Form.useForm();
  const searchFilterForm = useSearchFiltersForm(form);
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
          form={form}
          layout="vertical"
          id="new-fault-form"
          onFinish={(formFieldValues) => {
            searchFilterForm.handleFormSubmit(formFieldValues);
          }}
          validateMessages={validateMessages}
          initialValues={searchFilterForm.DEFAULT_FORM_VALUES}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="actionable"
                label="Actionable"
                data-testid="search-filters-actionable"
              >
                <Select
                  placeholder="Is the action actionable?"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.actionable}
                >
                  {["yes", "no"].map((option) => (
                    <Select.Option key={option} value={option} name="action">
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="application"
                label="Application"
                data-testid="search-filters-application"
              >
                <Select
                  placeholder="Select application"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.application}
                >
                  {searchFilterForm.autocompleteList.applications.map(
                    (option) => (
                      <Select.Option
                        key={option}
                        value={option}
                        name="application"
                      >
                        {option}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="check_id"
                label="Check ID"
                data-testid="search-filters-check-id"
              >
                <Select
                  placeholder="Select check id"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.check_id}
                >
                  {searchFilterForm.autocompleteList.checkIds.map((option) => (
                    <Select.Option key={option} value={option} name="check_id">
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cm_id"
                label="CM ID"
                data-testid="search-filters-cm-id"
              >
                <Input
                  placeholder="CM ID"
                  name="cm_id"
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.cm_id}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12} style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "0",
                  right: "10px",
                  display: "flex",
                  alignItems: "center",
                  zIndex: "1000",
                }}
              >
                <p
                  style={{
                    fontWeight: "250",
                    marginRight: "1rem",
                    marginBottom: "0",
                  }}
                >
                  My Faults
                </p>
                <Switch
                  size="small"
                  checked={searchFilterForm.isMyFaultsSwitchButtonEnabled}
                  onChange={() => {
                    searchFilterForm.setIsMyFaultsSwitchButtonEnabled(
                      !searchFilterForm.isMyFaultsSwitchButtonEnabled
                    );
                  }}
                  data-testid="search-filters-my-faults-switch"
                />
              </span>
              <Form.Item
                name="created_by"
                label="Created By User"
                tooltip={
                  <>
                    <p>
                      This will search for CMs and Faults created by the
                      username entered
                      <br />
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
                rules={[
                  {
                    required: false,
                    min: 3,
                    validateTrigger: "onBlur",
                    message: `Please enter a valid ldap username`,
                  },
                ]}
              >
                <Input
                  placeholder={
                    searchFilterForm.isMyFaultsSwitchButtonEnabled
                      ? searchFilterForm.currentUser.username
                      : "LDAP username"
                  }
                  data-testid="search-filters-created-by-input"
                  name="created_by"
                  allowClear
                  disabled={searchFilterForm.isMyFaultsSwitchButtonEnabled}
                  defaultValue={searchFilterForm.faultsQueryParams.created_by}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date Filter"
                tooltip={
                  <>
                    <p>
                      Filter Dates by Relative Time Range or Absolute Time Range
                    </p>
                  </>
                }
              >
                <TableSearchDateFiltersButton formInstance={form} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="detection_system"
                label="Detection System"
                data-testid="search-filters-detection-system"
              >
                <Select
                  placeholder="Select a system"
                  showSearch
                  allowClear
                  defaultValue={
                    searchFilterForm.faultsQueryParams.detection_system
                  }
                >
                  {searchFilterForm.autocompleteList.detectionSystems.map(
                    (option) => (
                      <Select.Option
                        key={option}
                        value={option}
                        name="detection_system"
                      >
                        {option}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="environment"
                label="Environment"
                data-testid="search-filters-environment"
              >
                <Select
                  placeholder="Select an environment"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.environment}
                >
                  {["STG", "PROD", "CORP"].map((option) => (
                    <Select.Option
                      key={option}
                      value={option}
                      name="detection_system"
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
                name="fabric"
                label="Fabric"
                data-testid="search-filters-fabric"
              >
                <Select
                  placeholder="Ex: prod-lor1"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.fabric}
                >
                  {FABRIC_OPTIONS.map((option) => (
                    <Select.Option
                      key={option.value}
                      value={option.value}
                      name="fabric"
                    >
                      {option.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fabric_group"
                label="Fabric Group"
                data-testid="search-filters-fabric-group"
              >
                <Select
                  placeholder="Ex: ei"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.fabric_group}
                >
                  {FABRIC_GROUPS.map((option) => (
                    <Select.Option
                      key={option}
                      value={option}
                      name="fabric_group"
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
                name="fault_type"
                label="Fault Type"
                data-testid="search-filters-fault-type"
              >
                <Select
                  placeholder="Select a fault type"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.fault_type}
                >
                  {searchFilterForm.autocompleteList.faultTypes.map(
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
              <Form.Item
                name="hostname"
                label="Hostname"
                data-testid="search-filters-hostname"
                rules={[
                  {
                    required: false,
                    min: 8,
                    validateTrigger: "onBlur",
                    message: `Value does not match expected format. Example(s): lca1-app5225.stg.linkedin.com`,
                  },
                ]}
              >
                <Input
                  placeholder="hostname"
                  name="hostname"
                  type="text"
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.hostname}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="inops_filters"
                label="Inops Filter"
                data-testid="search-filters-inops-filter"
                rules={[
                  {
                    required: false,
                    min: 6,
                    validateTrigger: "onBlur",
                    message: `Value does not match expected format. Example values:
                      Filter with single inops field: {"model": "smc"}\n
                      Filter with multiple inops field: {  "manufacturer": "micro",  "site": "lor1",  "ru": 14}`,
                  },
                ]}
                tooltip={
                  <>
                    <p>
                      Example(s): <br />
                      Filter with single inops field:{" "}
                      <code> {`{"model": "smc"}`}</code> <br />
                      Filter with multiple inops field:{" "}
                      <code>
                        {" "}
                        {`{  "manufacturer": "micro",  "site": "lor1",  "ru": 14}`}
                      </code>{" "}
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
                <Input
                  placeholder={`{"manufacturer": "micro","site": "lor1","ru": 14}`}
                  type="text"
                  name="inops_filters"
                  allowClear
                  defaultValue={
                    searchFilterForm.faultsQueryParams.inops_filters
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location"
                data-testid="search-filters-location"
                rules={[
                  {
                    required: false,
                    min: 8,
                    validateTrigger: "onBlur",
                    message: `Value does not match expected format. Example value: LTX1:G:711:1`,
                  },
                ]}
                tooltip={
                  <>
                    <p>
                      Example: <code>LTX1:H:709:32</code> <br />
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
                <Input
                  placeholder="Example: LTX1:H:709:32"
                  type="text"
                  name="location"
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.location}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="site"
                label="Site"
                data-testid="search-filters-site"
              >
                <Select
                  placeholder="Select a site"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.site}
                >
                  {["lva1", "lca1", "lor1", "ltx1"].map((option) => (
                    <Select.Option key={option} value={option} name="site">
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                data-testid="search-filters-status"
              >
                <Select
                  placeholder="Select status"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.status}
                >
                  {["open", "closed", "all"].map((option) => (
                    <Select.Option key={option} value={option} name="status">
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
                name="team"
                label="Team"
                data-testid="search-filters-team"
              >
                <Select
                  placeholder="Select team"
                  showSearch
                  allowClear
                  defaultValue={searchFilterForm.faultsQueryParams.team}
                >
                  {searchFilterForm.autocompleteList.teams.map((option) => (
                    <Select.Option key={option} value={option} name="team">
                      {option}
                    </Select.Option>
                  ))}
                </Select>
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
