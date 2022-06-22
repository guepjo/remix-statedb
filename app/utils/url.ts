import { FaultAPIDataType } from "~/types/data/faults";

const DEVELOPMENT_ENV = window.location.href.includes(".prod.")
  ? "prod"
  : "stg";

const JIRA_URL_PREFIX = "https://jira01.corp.linkedin.com:8443/browse/";
const HOST_INFO_TOOL_URL_PREFIX =
  "https://host-information-tool.corp.linkedin.com//?host=";
const INOPS_URL_PREFIX =
  "https://inops.corp.linkedin.com/inops/devices/list?name=CONTAINS+";
const STORU_CM_ID_DETAILS_PREFIX = `https://storu.${DEVELOPMENT_ENV}.linkedin.com/#/ticket/details`;

export const getHostInfoToolURL = (hostname: string): string => {
  return HOST_INFO_TOOL_URL_PREFIX + hostname;
};

export const getInopsURL = (hostname: string): string => {
  return INOPS_URL_PREFIX + hostname;
};

/**
 * @description
 * Get the health_check_url for a given fault item.
 */
export const getHealthCheckURL = (data: FaultAPIDataType[]): string | null => {
  const itemsWithHealthCheckURL = data.find(
    (fault) => fault.health_check_url !== ""
  );

  if (!itemsWithHealthCheckURL) {
    return null;
  } else {
    return itemsWithHealthCheckURL.health_check_url;
  }
};

export const getJiraTicketURL = (jiraNumber: string): string => {
  return JIRA_URL_PREFIX + jiraNumber;
};

export const getStoruCmIdDetailsURL = (cmId: number, cmUuid: string) => {
  return `${STORU_CM_ID_DETAILS_PREFIX}/${cmId}/${cmUuid}`;
};

/**
 * @description
 * Returns API docs url with the correct environment type
 * @example
 * getFMALAPIDocsURL() === `https://faults.[ENV_IS_AUTOMAGICALLY_INSERTED_HERE].linkedin.com/api/v1/docs`
 */
export const getFMALAPIDocsURL = () => {
  const isStagingEnv =
    window.location.href.includes("stg") ||
    window.location.href.includes("localhost");

  return {
    url: `https://faults.${
      isStagingEnv ? "stg" : "prod"
    }.linkedin.com/api/v1/docs`,
    shortText: `faults.${
      isStagingEnv ? "stg" : "prod"
    }.linkedin.com/api/v1/docs`,
  };
};

export const FMALRunbookURL = {
  url: `http://go/fmal-ui-runbook`,
  shortText: `go/fmal-ui-runbook`,
};
