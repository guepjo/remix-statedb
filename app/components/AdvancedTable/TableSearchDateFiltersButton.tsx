import React from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Radio,
  Row,
  Select,
  Tooltip,
  Popover,
  Tabs,
  FormInstance,
} from "antd";
import moment from "moment";
import { QuestionCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { getFMALAPIDocsURL } from "~/utils";

type DateUnitTypes = "minutes" | "hours" | "days" | "months" | "years";

export type DatePresetValues =
  | "5-minutes-ago"
  | "15-minutes-ago"
  | "30-minutes-ago"
  | "1-hours-ago"
  | "3-hours-ago"
  | "6-hours-ago"
  | "12-hours-ago"
  | "24-hours-ago"
  | "2-days-ago"
  | "7-days-ago"
  | "30-days-ago"
  | "90-days-ago"
  | "6-months-ago"
  | "1-years-ago";

const TIME_PRESET_OPTIONS = [
  { title: "Last 5 minutes", value: "5-minutes-ago" },
  { title: "Last 15 minutes", value: "15-minutes-ago" },
  { title: "Last 30 minutes", value: "30-minutes-ago" },
  { title: "Last 1 hour", value: "1-hours-ago" },
  { title: "Last 3 hours", value: "3-hours-ago" },
  { title: "Last 6 hours", value: "6-hours-ago" },
  { title: "Last 12 hours", value: "12-hours-ago" },
  { title: "Last 24 hours", value: "24-hours-ago" },
  { title: "Last 2 days", value: "2-days-ago" },
  { title: "Last 7 days", value: "7-days-ago" },
  { title: "Last 30 days", value: "30-days-ago" },
  { title: "Last 90 days", value: "90-days-ago" },
  { title: "Last 6 months", value: "6-months-ago" },
  { title: "Last 1 year", value: "1-years-ago" },
];

const DateFilterContent = ({
  formInstance,
}: {
  formInstance: FormInstance<any>;
}) => {
  const datePresetValueChange = (values: DatePresetValues) => {
    const timePreset = values.split("-");
    const amountOfTimeToSubtract = Number(timePreset[0]);
    const unitOfTimeToSubtract = timePreset[1] as DateUnitTypes;

    const dateNow = moment();
    const dateFromNow = moment().subtract(
      amountOfTimeToSubtract,
      unitOfTimeToSubtract
    );

    formInstance.setFieldsValue({
      date_filter_after: dateFromNow,
      date_filter_before: dateNow,
    });
  };

  return (
    <>
      <Tabs defaultActiveKey="absolute-date-filter">
        <Tabs.TabPane
          tab={
            <>
              Absolute Time
              <Tooltip
                title={
                  <>
                    <b>Providing only 1 value</b>
                    <p>
                      When both the &quot;start&quot; and &quot;end&quot; date
                      values are provided, a &quot;between&quot; date filter
                      search is applied.
                      <br />
                      <br />
                      <b>Providing 2 values</b>
                      <br />
                      When only one of the date values is provided, a
                      &quot;start&quot; or &quot;end&quot; date may be applied.
                      <br />
                      <br />
                      For example:
                      <br />
                      - providing only a &quot;start&quot; date will make a
                      &quot;before this date&quot; search
                      <br />
                      - providing only a &quot;end&quot; date will make a
                      &quot;after this date&quot; search
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
              >
                <QuestionCircleOutlined
                  style={{
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.45)",
                    marginLeft: ".5rem",
                  }}
                />
              </Tooltip>
            </>
          }
          key="absolute-date-filter"
        >
          <Row gutter={[16, 16]}>
            <Col>
              <Form.Item
                name="date_filter_by"
                label="Filter By"
                data-testid="search-filters-date-filter-by"
                colon={false}
                labelAlign="left"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Radio.Group name="date_filter_by" size="small">
                  <Radio value="created" style={{ fontWeight: "250" }}>
                    Created
                  </Radio>
                  <Radio value="updated" style={{ fontWeight: "250" }}>
                    Updated
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="date_filter_after"
                data-testid="search-filters-date-filter-after"
                label="Start Date"
                colon={false}
                labelAlign="left"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <DatePicker
                  placeholder="Start Date"
                  style={{ width: "200px" }}
                  showTime
                />
              </Form.Item>
              <Form.Item
                name="date_filter_before"
                data-testid="search-filters-date-filter-before"
                label="End Date"
                colon={false}
                labelAlign="left"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <DatePicker
                  placeholder="End Date"
                  style={{ width: "200px" }}
                  showTime
                />
              </Form.Item>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <>
              Relative Time
              <Tooltip
                title={
                  <>
                    Uses relative time ranges to search between a relative time
                    and your current time
                  </>
                }
              >
                <QuestionCircleOutlined
                  style={{
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.45)",
                    marginLeft: ".5rem",
                  }}
                />
              </Tooltip>
            </>
          }
          key="relative-date-filter"
        >
          <Row gutter={[16, 16]}>
            <Col>
              <Form.Item
                name="date_filter_by"
                label="Filter By"
                data-testid="search-filters-date-filter-by"
                colon={false}
                labelAlign="left"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Radio.Group name="date_filter_by" size="small">
                  <Radio value="created" style={{ fontWeight: "250" }}>
                    Created
                  </Radio>
                  <Radio value="updated" style={{ fontWeight: "250" }}>
                    Updated
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col>
              {/* The 'Form.Item Selector' field below is only used to create "preset" time values to modify our
        'date_filter' DatePicker fields.

        Some examples of these "preset" time values are: "5 minutes ago", "1 day ago", "30 days ago", etc.

        We do not need to a 'name' attribute for the field below since it's value
        will not be passed into our API request. */}
              <Form.Item
                label="Relative Time Ranges"
                data-testid="search-filters-date-filter-time"
                colon={false}
                labelAlign="left"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Select
                  showSearch
                  size="middle"
                  className="date-filters-preset-select-button"
                  style={{ width: 200 }}
                  placeholder="Select Time"
                  onChange={datePresetValueChange}
                  allowClear
                >
                  {TIME_PRESET_OPTIONS.map((time) => (
                    <Select.Option
                      key={time.value}
                      data-testid={`search-filters-date-filter-time-${time.value}`}
                      value={time.value}
                    >
                      {time.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export const TableSearchDateFiltersButton = ({
  formInstance,
}: {
  formInstance: FormInstance<any>;
}) => {
  return (
    <Popover
      content={<DateFilterContent formInstance={formInstance} />}
      trigger="click"
      placement="bottomRight"
    >
      <Button
        data-testid="search-filters-date-filter-button"
        style={{ width: "100%" }}
      >
        <ClockCircleOutlined /> Show Date Filters
      </Button>
    </Popover>
  );
};
