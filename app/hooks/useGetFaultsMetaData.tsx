import React from "react";
import { notification } from "antd";
import { APIErrorMessage } from "~/components/APIErrorMessage";
import { useQuery } from "react-query";
import { FaultsService } from "~/services";
import { LS_KEY, RQ_QUERY_KEY } from "~/utils";

export const useGetFaultsMetaData = () => {
  const response = useQuery({
    queryKey: [RQ_QUERY_KEY.useGetFaultsMetaData],
    queryFn: () => FaultsService.getFaultsMetaData(),
    onError: (error) => {
      console.error(`[${RQ_QUERY_KEY.useGetFaultsMetaData}]:`, error);
      notification.error({
        key: `${RQ_QUERY_KEY.useGetFaultsMetaData}-error`,
        message: "Error Getting Faults Meta Data",
        description: <APIErrorMessage />,
      });
    },
    onSuccess: (APIResponse) => {
      const apiData = JSON.stringify(APIResponse);

      window.localStorage.setItem(LS_KEY.APP__DATA_FAULTS_META_DATA, apiData);

      return APIResponse;
    },
  });

  return response;
};
