import { Moment } from 'moment';
import { isEmptyValue, isNumberLike } from 'utils';
import { getFormattedDateQueryParams } from './getFormattedDateQueryParams';

/**
 * @example
 * See this link to view the params for fetching faults: https://faults.stg.linkedin.com/api/v1/docs
 *
 * NOTE:
 * Some these values have union types, for example, you might see a param that is 'string | number'
 * and the reason for this is that values we obtain from the URL are strings initially.
 */
export type GetFaultsQueryParams = {
  actionable?: string;
  application?: string;
  check_id?: string;
  cm_id?: number | string | undefined;
  cm_status?: string;
  created_by?: string;
  date_filter?: Array<Moment> | string | undefined;
  // the values below are not actually part of the deadpool-api
  // date_filter_{before, after} & date_filter_by are used purely in the UI
  date_filter_after?: Moment;
  date_filter_before?: Moment;
  date_filter_by?: string;
  detection_system?: string;
  environment?: string;
  fabric?: string;
  fabric_group?: string;
  fault_type?: string;
  hostname?: string;
  inops_filters?: string;
  location?: string;
  page_size?: number | string;
  site?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc' | string;
  status?: 'open' | 'closed' | 'all' | string;
  start_page?: number | string;
  team?: string;
};

export type FormattedQueryParamTypes = {
  actionable?: string;
  application?: string;
  check_id?: string;
  cm_id?: number | undefined;
  cm_status?: string;
  created_by?: string;
  date_filter?: string;
  date_filter_after?: Moment;
  date_filter_before?: Moment;
  date_filter_by?: string;
  detection_system?: string;
  environment?: string;
  fabric?: string;
  fabric_group?: string;
  fault_type?: string;
  hostname?: string | null;
  inops_filters?: string;
  location?: string;
  page_size?: number;
  site?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc' | string;
  status?: 'open' | 'closed' | 'all' | string;
  start_page?: number;
  team?: string;
};

/**
 * @description
 * Given an hashmap of key value pairs (string-string) representing query params in a url,
 * convert the query param values into their actual representation.
 * Examples
 * - convert '1' (any number) to an actual number
 */
export const getformattedFaultsQueryParams = (data: GetFaultsQueryParams): FormattedQueryParamTypes => {
  const formattedData = { ...data } as FormattedQueryParamTypes;

  const dateFilterAfter = formattedData.date_filter_after || undefined;
  const dateFilterBefore = formattedData.date_filter_before || undefined;
  const dateFilterBy = formattedData.date_filter_by || 'created'; // Default 'created'

  // handle any possible dates
  const formattedDateFilterString = getFormattedDateQueryParams({ dateFilterAfter, dateFilterBefore, dateFilterBy });

  if (formattedDateFilterString) {
    formattedData.date_filter = formattedDateFilterString;
  }

  // Ensure not to append 'date_filter_by' if no dates exist
  if (formattedData.date_filter_by && !dateFilterAfter && !dateFilterBefore) {
    delete formattedData.date_filter_by;
  }

  Object.keys(formattedData).forEach((key) => {
    let value = formattedData[key as keyof GetFaultsQueryParams];

    if (isNumberLike(value)) {
      // we need to convert numbers from the input fields to actual numbers since values grabbed from the input are stringified values
      value = parseInt(value as string, 10);
    }

    // remove empty values and 'date_filter_before' and 'date_filter_after' to avoid appending to URL Query Params
    if (isEmptyValue(value) || key === 'date_filter_before' || key === 'date_filter_after') {
      delete formattedData[key as keyof GetFaultsQueryParams];
    }

    if ((key as keyof GetFaultsQueryParams) === 'inops_filters' && value) {
      if (Object.keys(value)?.length < 1) return;
      // Do not JSON.stringify this. This value will be automatically encoded by
      // when we generate the `paramsString` inside `useGetFaults`
      formattedData.inops_filters = value as string;
    }
  });

  return formattedData;
};
