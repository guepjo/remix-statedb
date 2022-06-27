import React, { useState } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { notification } from "antd";
import { useSearchParams } from "react-router-dom";
// import { FaultAPIResponse } from "types";
import { APIErrorMessage } from "~/components/APIErrorMessage";
// import { FaultsService } from "services";
import { RQ_QUERY_KEY } from "~/utils";
import { GetFaultsURLQueryParams } from "~/hooks/useGetFaultsQueryParams";
import {
  getformattedFaultsQueryParams,
  GetFaultsQueryParams,
} from "./utils/formatFaultsQueryParams";
import { Employees } from "~/types/data";

/**
 * @description
 * Default url values when the page loads with no params.
 * Note: the reason the valuesa are all strings is because values
 * grabbed from the URL are always strings (standard browser behavior).
 * The conversion from string to actual values happens later, before we make
 * a real API call to the backend
 */
const DEFAULT_GET_FAULTS_QUERY_PARAMS: GetFaultsURLQueryParams = {
  status: "open",
  sort_by: "created",
  page_size: "10",
  start_page: "10",
  sort_order: "desc",
};

/**
 * @description
 * This hooks fetches the faults from the API.
 * Typically the way this hook is used:
 * - grab url search params values from URL & pass the values to this
 */
export const useGetFaults = (
  queryParams: GetFaultsQueryParams,
  /**
   * @description
   * This flag enables this hook to update the URL with the query param values.
   * This is most useful for scenarios like:
   * a user loading the app without any query params, thus pre-populate with the default values
   *
   * However, there are scenarios where we don't want the URL to update (hence this boolean flag)
   * and we simply want to use this hook for making an API call to get the data. For example,
   * when we export our table data using the CSV button, we don't want to update the URL
   * as it will change what's currently in view. This scenario is more evident for the CSV Export
   * case where a user exports "everyything"; in this scenario we use this very same hook to fetch
   * the data, but we don't want to update the URL.
   */
  shouldUpdateURL = true,
  data: Employees[],
  configOptions: UseQueryOptions<any> = {}
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const existingSearchParams = Object.fromEntries(searchParams); // required, sometimes react might be behind 1 render cycle & pass in `queryParams` value that is 1 render cycle behind; here I'm grabbing the params directly from URL to circumevent this
  const formattedQueryParams = getformattedFaultsQueryParams({
    ...(DEFAULT_GET_FAULTS_QUERY_PARAMS as any),
    ...existingSearchParams,
    ...queryParams,
  });
  const paramsString = new URLSearchParams(
    formattedQueryParams as Record<string, string>
  ).toString();

  /**
   * @description
   * This hook ensures is updated on URL changes only; see the items in the dependency array.
   * Without the dependency array, we can get into an infinite loop.
   * We want to update the URL anytime we make a search for faults & if the `shouldUpdateUrl` is enabled.
   */
  React.useEffect(() => {
    if (shouldUpdateURL) {
      setSearchParams(paramsString);
    }
  }, [paramsString, setSearchParams, shouldUpdateURL]);

  const [searchedArray, setSearchedArray] = React.useState(data);
  let searchedName: Employees[] = [];
  const searchedTotal: Employees[] = [];
  console.log(data);

  if (formattedQueryParams.name) {
    data.forEach((d: Employees) => {
      Object.values(d).every((onlyValues, valIndex) => {
        if (
          d.name
            .toLowerCase()
            .includes(
              formattedQueryParams.name
                ? formattedQueryParams.name.toLowerCase()
                : d.name.toLowerCase()
            )
        ) {
          searchedName.push(d);
        }
      });
    });
    //setSearchedArray(searchedData);
  } else {
    searchedName = data;
  }
  let searchedAge: Employees[] = [];

  if (formattedQueryParams.age) {
    data.forEach((d: Employees) => {
      Object.values(d).every((onlyValues, valIndex) => {
        if (
          d.age
            .toString()
            .includes(
              formattedQueryParams.age
                ? formattedQueryParams.age.toLowerCase()
                : d.age.toString()
            )
        ) {
          searchedAge.push(d);
        }
      });
    });
    //setSearchedArray(searchedData);
  } else {
    searchedAge = data;
  }

  let searchedDep: Employees[] = [];

  if (formattedQueryParams.department) {
    data.forEach((d: Employees) => {
      Object.values(d).every((onlyValues, valIndex) => {
        if (
          d.department
            .toLowerCase()
            .includes(
              formattedQueryParams.department
                ? formattedQueryParams.department.toLowerCase()
                : d.department
            )
        ) {
          searchedDep.push(d);
        }
      });
    });
    //setSearchedArray(searchedData);
  } else {
    searchedDep = data;
  }

  data.forEach((d: Employees) => {
    if (
      searchedAge.includes(d) &&
      searchedName.includes(d) &&
      searchedDep.includes(d)
    ) {
      searchedTotal.push(d);
    }
  });
  //setSearchedArray(searchedTotal);

  // const response = useQuery({
  //   queryKey: [RQ_QUERY_KEY.useGetFaults, paramsString],
  //   queryFn: () => searchedTotal, //FaultsService.getFaults(paramsString),
  //   onError: (error) => {
  //     console.error(`[${RQ_QUERY_KEY.useGetFaults}]: `, error);
  //     notification.error({
  //       key: `${RQ_QUERY_KEY.useGetFaults}-error-${paramsString}`,
  //       message: "Error fetching faults",
  //       description: <APIErrorMessage />,
  //     });
  //   },
  //   keepPreviousData: true,
  //   ...configOptions,
  // });

  console.log("use get fault", searchedTotal);
  return searchedTotal; //response
};
