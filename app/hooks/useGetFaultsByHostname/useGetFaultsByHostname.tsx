import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { isEmptyValue, isValidLinkedInHostname } from 'utils';
import { FaultsService } from 'services';
import { notification } from 'antd';
import { APIErrorMessage } from 'components';

type QueryParamTypes = {
  hostname?: string | null;
  status?: 'open' | 'closed' | 'all';
};

// Removes any empty values in data object passed in
export const formatQueryParams = (data: QueryParamTypes) => {
  const formattedData = { ...data };

  Object.keys(formattedData).forEach((key) => {
    const value = formattedData[key as keyof QueryParamTypes];

    if (isEmptyValue(value)) {
      delete formattedData[key as keyof QueryParamTypes];
    }
  });

  return formattedData;
};

export const useGetFaultsByHostname = ({ queryParams = {} }: { queryParams?: QueryParamTypes }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const validHostname = isValidLinkedInHostname(queryParams.hostname || '');

  if (!validHostname && queryParams.hostname?.length) {
    notification.error({
      key: 'useGetFaultsByHostname-error',
      message: 'Error Fetching Faults',
      description: 'Invalid Hostname',
    });
  }

  queryParams = formatQueryParams(queryParams);

  const paramsString = new URLSearchParams(queryParams as Record<string, string>).toString();

  // Ensure the URL is updated only when the value of the paramsString changes.
  // Without this guard, we can get in an infinite loop.
  // We want to update the URL anytime we make a search for faults.
  React.useEffect(() => {
    setSearchParams(paramsString);
  }, [paramsString]);

  const response = useQuery({
    queryKey: ['useGetFaultsByHostname', paramsString],
    queryFn: () => FaultsService.getFaultsByHostname(paramsString),
    onError: (error) => {
      console.error(`[useGetFaultsByHostname]: `, error);

      notification.error({
        key: 'useGetFaultsByHostname-error',
        message: 'Error Getting Faults',
        description: <APIErrorMessage />,
      });
    },
    enabled: validHostname,
  });

  return response;
};
