import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

const CM_STATUS_DEFAULT = "open";
const PAGE_SIZE_DEFAULT = "10";
const SORT_BY_DEFAULT = "created";
const SORT_ORDER_DEFAULT = "desc";
const START_PAGE_DEFAULT = "1";

/**
 * @description
 * Possible query param values from the URL.
 * By default, all values you retrieve from a URL are strings per standard browser API behavior.
 * The conversion of these values to their actual propert types occurs elsewhere in our
 * code, before we actually submit our API call to the backend.
 */
export type GetFaultsURLQueryParams = {
  actionable?: string;
  application?: string;
  check_id?: string;
  cm_id?: string;
  created_by?: string;
  date_filter?: string;
  detection_system?: string;
  environment?: string;
  fabric?: string;
  fabric_group?: string;
  fault_type?: string;
  hostname?: string;
  inops_filters?: string;
  location?: string;
  site?: string;
  team?: string;
  // Default query param values below; we will populate the URL with if the user has landed on the page without query params
  cm_status?: string;
  page_size?: string;
  start_page?: string;
  status?: string;
  sort_by?: string;
  sort_order?: string;
};

export const DEFAULT_GET_FAULTS_QUERY_PARAMS = {
  status: CM_STATUS_DEFAULT,
  page_size: PAGE_SIZE_DEFAULT,
  sort_by: SORT_BY_DEFAULT,
  sort_order: SORT_ORDER_DEFAULT,
  start_page: START_PAGE_DEFAULT,
};

/**
 * @description
 * This type was grabbed from react-router-dom.
 * For some reason typescript is not inferring the type
 * so I needed to copy it by hovering over the `setSearchParams` value
 * inside the `useGetFaultsQueryParams` hook
 */
type SetSearchParams = (
  nextInit: URLSearchParamsInit,
  navigateOptions?:
    | {
        replace?: boolean | undefined;
        state?: any;
      }
    | undefined
) => void;

/**
 * @description
 * Grabs the query params from the URL.
 * If there are no query param values in the URL, this returns back a defaults set of query params values.
 *
 * This hook primarily exists to abstract the logic of checking & grabbing the query params of the URL &
 * setting their default values.
 */
export const useGetFaultsQueryParams = (): [
  GetFaultsURLQueryParams,
  SetSearchParams
] => {
  // if (window.location.pathname !== '/search') {
  //   throw new Error(`useGetFaultsQueryParams can called on the ${window.location.host}/search path`);
  // }

  const [searchParams, setSearchParams] = useSearchParams();
  const existingURLSearchParams = Object.fromEntries(
    searchParams
  ) as GetFaultsURLQueryParams;
  const results: GetFaultsURLQueryParams = {
    ...DEFAULT_GET_FAULTS_QUERY_PARAMS,
    ...existingURLSearchParams,
  };

  return [results, setSearchParams];
};
