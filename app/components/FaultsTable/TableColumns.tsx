/* eslint-disable camelcase */
import React from "react";
import moment from "moment";
import { Tag, Popover, Button, Typography, Tooltip, Table } from "antd";
import {
  InfoCircleOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ExternalLinkIcon, CopyToClipboardButton } from "~/components";
import { useUpdateFault } from "~/hooks";
import { AdvancedTableColumnType } from "~/components/AdvancedTable/types";
import {
  CMAPIData,
  FaultColorTypes,
  FaultType,
  FaultAPIDataType,
} from "~/types";
import {
  getArrayofUniqueElements,
  getArrayofUniqueObjects,
  getHealthCheckURL,
  getHostInfoToolURL,
  getInopsURL,
  getStoruCmIdDetailsURL,
  removeDomainFromURL,
} from "~/utils";
import "./FaultsTable.css";

const HOSTNAME_DETAILS_BASE_URL = "/search/host?";

const getUsernameFaultCountHashMap = (faults: FaultAPIDataType[]) => {
  const faultCountHashMap: { [key: string]: number } = {};

  for (const fault of faults) {
    const { created_by } = fault;

    if (faultCountHashMap[created_by]) {
      faultCountHashMap[created_by] += 1;
    } else {
      faultCountHashMap[created_by] = 1;
    }
  }

  return faultCountHashMap;
};

const UsernameFaultCountTable = ({
  faults,
}: {
  faults: FaultAPIDataType[];
}) => {
  const FAULT_COUNT_TABLE_COLUMNS = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
  ];
  const usernameFaultCountHashMap = getUsernameFaultCountHashMap(faults);
  const arrayOfUsernameFaultCount = Object.entries(
    usernameFaultCountHashMap
  ).map(([key, value]) => ({
    username: key,
    count: value,
  }));

  return (
    <>
      <p style={{ marginBottom: "4px", color: "#fff", fontWeight: "400" }}>
        Faults Created
      </p>
      <Table
        columns={FAULT_COUNT_TABLE_COLUMNS}
        dataSource={arrayOfUsernameFaultCount}
        size="small"
        pagination={false}
        className="UsernameFaultCount"
      />
    </>
  );
};

export type FaultsTableColumn = AdvancedTableColumnType<CMAPIData>;
export const TABLE_COLUMNS: FaultsTableColumn[] = [
  {
    title: "CM ID",
    dataIndex: "cmID",
    key: "cm_id",
    width: 72,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      const storuCmIdUrl = getStoruCmIdDetailsURL(record.cm_id, record.cm_uuid);

      return (
        <React.Fragment key={record.cm_id}>
          <a href={storuCmIdUrl} target="_blank" rel="noreferrer">
            {record.cm_id}
          </a>
        </React.Fragment>
      );
    },
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "created_by",
    width: 100,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      return (
        <React.Fragment key={record.cm_id}>
          <Tooltip title={<UsernameFaultCountTable faults={record.faults} />}>
            <UserOutlined /> {record.created_by}
          </Tooltip>
        </React.Fragment>
      );
    },
  },
  {
    title: "Hostname",
    dataIndex: "hostname",
    key: "hostname",
    width: 145,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      const hitURL = getHostInfoToolURL(record.hostname);
      const hostnameDisplayValue = removeDomainFromURL(record.hostname);

      return (
        <React.Fragment key={record.cm_id}>
          <Tooltip
            overlayInnerStyle={{ padding: "1.25rem" }}
            title={
              <>
                <strong style={{ marginBottom: "8px" }}>Host Resources:</strong>
                <a
                  data-testid="hostname-column-host-information-tool-link"
                  href={hitURL}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "14px",
                      display: "flex",
                      marginRight: ".5rem",
                    }}
                  >
                    <InfoCircleOutlined />
                  </span>
                  <code>Host Info</code>
                </a>
                <a
                  data-testid="hostname-column-host-details-link"
                  href={`${HOSTNAME_DETAILS_BASE_URL}hostname=${record.hostname}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      width: "14px",
                      display: "flex",
                      marginRight: ".5rem",
                    }}
                  >
                    <RobotOutlined />
                  </span>
                  <code>Host Faults</code>
                </a>
              </>
            }
          >
            <span
              data-testid="hostname-column-host-details-text"
              style={{ color: "#1890ff" }}
            >
              {hostnameDisplayValue}
            </span>
          </Tooltip>
          <CopyToClipboardButton stringToCopy={record.hostname} />
        </React.Fragment>
      );
    },
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    width: 105,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      const inopsUrl = getInopsURL(record.hostname);
      const locationDisplayValue = removeDomainFromURL(
        record.inops_data.location
      );

      return (
        <React.Fragment key={record.cm_id}>
          <a
            data-testid="location-column-inops-link"
            href={inopsUrl}
            rel="noreferrer"
            target="_blank"
          >
            {locationDisplayValue}
          </a>
        </React.Fragment>
      );
    },
  },
  {
    // Default sort order will be by "Created At"
    title: "Created At",
    dataIndex: "created",
    key: "created",
    width: 95,
    defaultSortOrder: "descend",
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      return (
        <React.Fragment key={record.cm_id}>
          {moment(record.created).startOf("second").fromNow()}
        </React.Fragment>
      );
    },
  },
  {
    title: "Updated At",
    dataIndex: "updated",
    key: "updated",
    width: 95,
    sorter: true,
    visible: false,
    render: (_, record): React.ReactNode => {
      return (
        <React.Fragment key={record.cm_id}>
          {moment(record.updated).startOf("second").fromNow()}
        </React.Fragment>
      );
    },
  },
  {
    title: "Jira",
    dataIndex: "jiraTickets",
    key: "jira_ticket",
    width: 120,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      const jiraTickets = record.faults.map((fault) => {
        const { jira_ticket = "", jira_url = "" } = fault;

        return { jira_ticket, jira_url };
      });

      const uniqueJiraTickets = getArrayofUniqueObjects(jiraTickets);

      return uniqueJiraTickets.map((jiraTicket, index) => {
        const { jira_ticket = "", jira_url = "" } = jiraTicket;

        return (
          <div key={jira_ticket || index} style={{ display: "block" }}>
            {jiraTicket ? (
              <a
                data-testid="jira-column-jira-link"
                href={jira_url}
                rel="noreferrer"
                target="_blank"
              >
                {jira_ticket}
              </a>
            ) : (
              <span style={{ color: "lightgray" }}>-</span>
            )}
          </div>
        );
      });
    },
  },
  {
    title: "Detection System",
    dataIndex: "detectionSystems",
    key: "detection_system",
    width: 130,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      const detectionSystems = record.faults.map(
        (fault) => fault.detection_system
      );
      const uniqueDetectionSystems = getArrayofUniqueElements(detectionSystems);

      return (
        <>
          {uniqueDetectionSystems.map((detectionSystem, index) => {
            return (
              <React.Fragment key={detectionSystem}>
                <div style={{ marginBottom: 5 }}>
                  <Popover content={detectionSystem}>
                    <Tag
                      style={{
                        maxWidth: "100px",
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
                        {detectionSystem}
                      </Typography.Text>
                    </Tag>
                  </Popover>
                </div>
              </React.Fragment>
            );
          })}
        </>
      );
    },
  },
  {
    title: "Check ID",
    dataIndex: "checkIds",
    key: "check_id",
    width: 100,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      const checkUrl = getHealthCheckURL(record.faults);

      return (
        <>
          {record.check_ids.map((checkId, index) => {
            return (
              <React.Fragment key={checkId || index}>
                <div style={{ marginBottom: 5 }}>
                  <Popover content={checkId}>
                    {checkUrl ? (
                      <a
                        data-testid="checkid-column-link"
                        href={checkUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Tag
                          style={{
                            padding: ".25rem .5rem",
                            textTransform: "uppercase",
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
                          <span style={{ width: "12px", display: "flex" }}>
                            <ExternalLinkIcon />
                          </span>
                        </Tag>
                      </a>
                    ) : null}

                    {!checkUrl ? (
                      <Tag
                        style={{
                          padding: ".25rem .5rem",
                          textTransform: "uppercase",
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
                      </Tag>
                    ) : null}
                  </Popover>
                </div>
              </React.Fragment>
            );
          })}
        </>
      );
    },
  },
  {
    title: "Fault Types",
    dataIndex: "faultTypes",
    key: "fault_type",
    width: 100,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      return record.fault_types.map((faultType, index) => {
        return (
          <React.Fragment key={faultType || index}>
            <div style={{ marginBottom: 5 }}>
              <Popover content={faultType}>
                <Tag
                  style={{
                    padding: ".25rem .5rem",
                    textTransform: "uppercase",
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
                    {faultType}
                  </Typography.Text>
                </Tag>
              </Popover>
            </div>
          </React.Fragment>
        );
      });
    },
  },
  {
    title: "Teams",
    dataIndex: "teams",
    key: "team",
    width: 90,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      const teams = record.faults.map((fault) => fault.team);
      const uniqueTeams = getArrayofUniqueElements(teams);

      return uniqueTeams.map((team, index) => {
        const tagColor = team === "dctechs" ? "blue" : "green";

        return (
          <React.Fragment key={team || index}>
            <div style={{ marginBottom: 5 }}>
              <Tag
                color={tagColor}
                style={{
                  width: "auto",
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
                  {team}
                </Typography.Text>
              </Tag>
            </div>
          </React.Fragment>
        );
      });
    },
  },
  {
    title: "Applications",
    dataIndex: "apps",
    key: "apps",
    width: 140,
    sorter: true,
    // We want to hide our 'Applications' column by default on page load
    visible: false,
    render: (_, record): React.ReactNode => {
      if (!record.apps.length) {
        <span style={{ color: "lightgray" }}>-</span>;
      }

      return record.apps.map((app, index) => (
        <React.Fragment key={app}>
          <Popover content={app}>
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
                  {app}
                </Typography.Text>
              </Tag>
            </div>
          </Popover>
        </React.Fragment>
      ));
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "actionable",
    width: 150,
    sorter: true,
    visible: true,
    render: (_, record): React.ReactNode => {
      const cmId = record.cm_id;
      const isActionable = record.actionable === "yes";
      const actionLabel = record.workflow_state;
      const isGetServerReadyAction = /get server ready/i.test(actionLabel);
      const isResolveFaultAction = /resolve fault/i.test(actionLabel);
      const isClosedFaultAction = /closed/i.test(actionLabel);
      const isPendingApprovalsAction = /pending approvals/i.test(actionLabel);
      const actionType = isGetServerReadyAction ? "start" : "close";

      const GetServerReadyButton = () => {
        const postFaultAction = useUpdateFault();

        return (
          <Button
            type="primary"
            htmlType="button"
            disabled={!isActionable}
            loading={postFaultAction.isLoading}
            onClick={() => {
              postFaultAction.mutate({
                cmId,
                action: actionType,
              });
            }}
          >
            {actionLabel}
          </Button>
        );
      };
      const ResolveFaultButton = () => {
        const postFaultAction = useUpdateFault();
        const styles = isActionable
          ? { color: "#679504", borderColor: "#8ac705" }
          : {
              color: "#679504",
              borderColor: "#8ac705",
              opacity: ".4",
            };

        return (
          <Button
            type="primary"
            ghost
            htmlType="button"
            disabled={!isActionable}
            loading={postFaultAction.isLoading}
            style={styles}
            onClick={() => {
              postFaultAction.mutate({
                cmId,
                action: actionType,
              });
            }}
          >
            {actionLabel}
          </Button>
        );
      };

      const ClosedFaultButton = () => {
        const postFaultAction = useUpdateFault();

        return (
          <Button
            type="ghost"
            htmlType="button"
            disabled={!isActionable}
            loading={postFaultAction.isLoading}
            onClick={() => {
              postFaultAction.mutate({
                cmId,
                action: actionType,
              });
            }}
          >
            {actionLabel}
          </Button>
        );
      };

      const PendingApprovalButton = () => {
        const postFaultAction = useUpdateFault();

        return (
          <Button
            type="ghost"
            htmlType="button"
            disabled={!isActionable}
            loading={postFaultAction.isLoading}
            onClick={() => {
              postFaultAction.mutate({
                cmId,
                action: actionType,
              });
            }}
          >
            {actionLabel}
          </Button>
        );
      };

      return (
        <>
          {isGetServerReadyAction ? <GetServerReadyButton /> : null}
          {isResolveFaultAction ? <ResolveFaultButton /> : null}
          {isClosedFaultAction ? <ClosedFaultButton /> : null}
          {isPendingApprovalsAction ? <PendingApprovalButton /> : null}
        </>
      );
    },
  },
];
