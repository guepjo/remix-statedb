/* eslint-disable camelcase */
import React from "react";
import { Tag, Popover, Typography, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { ExternalLinkIcon } from "~/components/ExternalLinkIcon";
import {
  getStoruCmIdDetailsURL,
  sortDatesNumericallyComparitor,
  getLocalTimezoneFromUTCTimezone,
} from "~/utils";
import { CMByHostnameAPIData, FaultType } from "~/types";
import { AdvancedTableColumnType } from "~/components/AdvancedTable/types";

export type FaultsPerHostTableColumn =
  AdvancedTableColumnType<CMByHostnameAPIData>;
export const TABLE_COLUMNS: FaultsPerHostTableColumn[] = [
  {
    title: "CM ID",
    dataIndex: "cm_id",
    width: 100,
    visible: true,
    render: (_, record): React.ReactNode => {
      const storuCmIdUrl = getStoruCmIdDetailsURL(record.cm_id, record.cm_uuid);

      return (
        <a href={storuCmIdUrl} target="_blank" rel="noreferrer">
          {record.cm_id}
        </a>
      );
    },
  },
  {
    title: "Check ID",
    dataIndex: ["fault", "check_id"],
    width: 150,
    visible: true,
    render: (_, record): React.ReactNode => {
      const checkId = record.fault.check_id;
      const isValidUrl = record.fault.health_check_url.includes("://")
        ? record.fault.health_check_url
        : null;

      return (
        <>
          <Popover content={checkId}>
            <div style={{ marginBottom: 5 }}>
              {isValidUrl ? (
                <a
                  data-testid="checkid-column-link"
                  href={isValidUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ maxWidth: "175px" }}
                >
                  <Tag
                    style={{
                      padding: ".25rem .5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text
                      ellipsis
                      style={{
                        maxWidth: "100%",
                        color: "inherit",
                        textTransform: "uppercase",
                      }}
                    >
                      {checkId}
                    </Typography.Text>

                    <span
                      style={{
                        width: "12px",
                        display: "flex",
                        marginLeft: ".5rem",
                      }}
                    >
                      <ExternalLinkIcon />
                    </span>
                  </Tag>
                </a>
              ) : null}
              {!isValidUrl ? (
                <Tag
                  style={{
                    padding: ".25rem .5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text
                    style={{
                      maxWidth: 130,
                      color: "inherit",
                      textTransform: "uppercase",
                    }}
                    ellipsis
                  >
                    {checkId}
                  </Typography.Text>
                </Tag>
              ) : null}
            </div>
          </Popover>
        </>
      );
    },
  },
  {
    title: "Fault Types",
    dataIndex: ["fault", "fault_type"],
    width: 150,
    visible: true,
    render: (_, record): React.ReactNode => {
      const faultType = record.fault.fault_type as FaultType;

      return (
        <div style={{ marginBottom: 5 }}>
          <Tag
            style={{
              maxWidth: "130px",
              padding: ".25rem .5rem",
            }}
          >
            <Typography.Text
              ellipsis
              style={{
                maxWidth: "100%",
                color: "inherit",
                textTransform: "uppercase",
              }}
            >
              {faultType}
            </Typography.Text>
          </Tag>
        </div>
      );
    },
  },
  {
    title: "Teams",
    dataIndex: ["fault", "team"],
    width: 150,
    visible: true,
    render: (_, record): React.ReactNode => {
      const tagColor = record.fault.team === "dctechs" ? "blue" : "green";

      return (
        <div style={{ marginBottom: 5 }}>
          <Tag
            color={tagColor}
            style={{
              width: "auto",
              maxWidth: "130px",
              padding: ".25rem .5rem",
            }}
          >
            <Typography.Text
              ellipsis
              style={{
                maxWidth: "100%",
                color: "inherit",
                textTransform: "uppercase",
              }}
            >
              {record.fault.team}
            </Typography.Text>
          </Tag>
        </div>
      );
    },
  },
  {
    title: "Jira",
    dataIndex: "fault",
    width: 125,
    visible: true,
    render: (_, record): React.ReactNode => {
      const { jira_ticket, jira_url } = record.fault;

      return (
        <>
          {jira_ticket && (
            <a
              data-testid="jira-column-jira-link"
              href={jira_url}
              rel="noreferrer"
              target="_blank"
            >
              {jira_ticket}
            </a>
          )}
        </>
      );
    },
  },
  {
    title: "Component",
    dataIndex: ["fault", "component"],
    visible: true,
    render: (_, record): React.ReactNode => {
      return record.fault.component;
    },
  },
  {
    title: "Description",
    dataIndex: ["fault", "description"],
    visible: true,
    render: (_, record): React.ReactNode => {
      return record.fault.description;
    },
  },
  {
    title: "Created By",
    dataIndex: ["fault", "created_by"],
    width: 150,
    visible: true,
    render: (_, record): React.ReactNode => (
      <>
        <UserOutlined /> {record.fault.created_by}
      </>
    ),
  },
  {
    title: (
      <>
        Created At
        <Tooltip title="Date is shown in user's local timezone">
          <InfoCircleOutlined style={{ marginLeft: ".5rem" }} />
        </Tooltip>
      </>
    ),
    dataIndex: ["fault", "created"],
    width: 180,
    sorter: (a: CMByHostnameAPIData, b: CMByHostnameAPIData) =>
      sortDatesNumericallyComparitor(a.created, b.created),
    visible: true,
    render: (_, record): React.ReactNode => {
      const localTime = getLocalTimezoneFromUTCTimezone(record.fault.created);

      return <>{localTime}</>;
    },
  },
];
