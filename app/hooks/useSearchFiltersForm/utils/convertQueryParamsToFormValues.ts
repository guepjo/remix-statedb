import {
  FormattedQueryParamTypes,
  GetFaultsQueryParams,
} from "~/hooks/useGetFaults";
// import { convertUtcDateToLocalMomentObject } from "utils";

export type DateFilterType = {
  by: "created" | "updated";
  qualifier: "between" | "before" | "after";
  value: string | string[];
};

export type QueryParams = {
  [key in keyof FormattedQueryParamTypes]: string;
};

/**
 * @description
 * Convert the query params map into values
 */
export const covertQueryParamsToFormValues = (
  urlSearchParamsMap: QueryParams
) => {
  const result: GetFaultsQueryParams = {};

  if (urlSearchParamsMap?.name) {
    result.name = urlSearchParamsMap.name;
  }

  if (urlSearchParamsMap?.department) {
    result.department = urlSearchParamsMap.department;
  }

  if (urlSearchParamsMap?.age) {
    result.age = urlSearchParamsMap.age;
  }

  // if (urlSearchParamsMap?.cm_id) {
  //   result.cm_id = urlSearchParamsMap.cm_id;
  // }

  // if (urlSearchParamsMap.cm_status) {
  //   result.cm_status = urlSearchParamsMap.cm_status;
  // }

  // if (urlSearchParamsMap.created_by) {
  //   result.created_by = urlSearchParamsMap.created_by;
  // }

  /**
   * @description
   * Convert date values to moment objects
   * -----------------------------------------
   * For `date_filter` param we need to convert the JSON string to a local `Moment` object
   * so we can pass that to our DatePicker component on our form. The date value(s)
   * in `date_filter` are formatted at UTC date strings.
   *
   * NOTE: Examples below show UTC datetime converted to PST (California) datetime
   *
   * Example 1:
   * urlSearchParams.date_filter = '{"by":"created","qualifier":"between","value":["2022-06-07 22:00:00","2022-06-08 22:00:00"]}'
   * formattedValueForDatePickerUIComponent = [moment('2022-06-07 15:00:00 '), moment('2022-06-08 15:00:00')]
   * Example 2:
   * urlSearchParams.date_filter = '{"by":"created","qualifier":"after","value":"2022-06-07 22:00:00"}'
   * formattedValueForDatePickerUIComponent = moment('2022-06-07 15:00:00')
   * Example 3:
   * urlSearchParams.date_filter = '{"by":"updated","qualifier":"before","value":"2022-06-09 02:00:00"}'
   * formattedValueForDatePickerUIComponent = moment('2022-06-08 19:00:00')
   */
  // if (urlSearchParamsMap.date_filter) {
  //   const dateFilter = JSON.parse(
  //     urlSearchParamsMap.date_filter as string
  //   ) as DateFilterType;
  //   const { value, qualifier, by } = dateFilter;

  //   result.date_filter_by = by;

  //   if (qualifier === "between" && Array.isArray(value)) {
  //     const startDate = value[0];
  //     const endDate = value[1];

  //     const startDateUTCToLocalDate =
  //       convertUtcDateToLocalMomentObject(startDate);
  //     const endDateUTCToLocalDate = convertUtcDateToLocalMomentObject(endDate);

  //     result.date_filter_after = startDateUTCToLocalDate;
  //     result.date_filter_before = endDateUTCToLocalDate;
  //   } else if (qualifier === "after") {
  //     const startDateUTCToLocalDate = convertUtcDateToLocalMomentObject(
  //       value as string
  //     );

  //     result.date_filter_after = startDateUTCToLocalDate;
  //   } else if (qualifier === "before") {
  //     const endDateUTCToLocalDate = convertUtcDateToLocalMomentObject(
  //       value as string
  //     );

  //     result.date_filter_before = endDateUTCToLocalDate;
  //   }
  // }

  if (urlSearchParamsMap.detection_system) {
    result.detection_system = urlSearchParamsMap.detection_system;
  }

  if (urlSearchParamsMap.environment) {
    result.environment = urlSearchParamsMap.environment;
  }

  if (urlSearchParamsMap.fabric) {
    result.fabric = urlSearchParamsMap.fabric;
  }

  if (urlSearchParamsMap.fabric_group) {
    result.fabric_group = urlSearchParamsMap.fabric_group;
  }

  if (urlSearchParamsMap.fault_type) {
    result.fault_type = urlSearchParamsMap.fault_type;
  }

  if (urlSearchParamsMap.hostname) {
    result.hostname = urlSearchParamsMap.hostname;
  }

  if (urlSearchParamsMap.inops_filters) {
    result.inops_filters = urlSearchParamsMap.inops_filters;
  }

  if (urlSearchParamsMap.location) {
    result.location = urlSearchParamsMap.location;
  }
  if (urlSearchParamsMap.page_size) {
    result.page_size = urlSearchParamsMap.page_size;
  }

  if (urlSearchParamsMap.site) {
    result.site = urlSearchParamsMap.site;
  }

  if (urlSearchParamsMap.sort_by) {
    result.sort_by = urlSearchParamsMap.sort_by;
  }

  if (urlSearchParamsMap.sort_order) {
    result.sort_order = urlSearchParamsMap.sort_order;
  }

  if (urlSearchParamsMap.status) {
    result.status = urlSearchParamsMap.status;
  }

  if (urlSearchParamsMap.start_page) {
    result.start_page = urlSearchParamsMap.start_page;
  }

  if (urlSearchParamsMap.team) {
    result.team = urlSearchParamsMap.team;
  }

  return result;
};
