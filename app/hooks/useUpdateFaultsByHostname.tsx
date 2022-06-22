import React from "react";
import { notification } from "antd";
import { APIErrorMessage } from "~/components/APIErrorMessage";
import { useMutation, useQueryClient } from "react-query";
import { FaultsService } from "~/services";
import { UpdateByCmIDAPIResponse } from "~/types";
import { RQ_QUERY_KEY } from "~/utils";

export const useUpdateFaultsByHostname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      hostname,
      action,
    }: {
      hostname: string;
      action: "start" | "close";
    }) => {
      if (["start", "close"].includes(action) === false)
        throw new Error("Please provide a valid action value");

      const response = await FaultsService.updateFaultsByHostname(
        hostname,
        action
      );

      return response;
    },
    onSuccess: (response: UpdateByCmIDAPIResponse) => {
      notification.success({
        key: `useUpdateFaultsByHostname-success`,
        message: "Successfully Updated Fault",
        description: response.message,
      });
      /**
       * After we have successfully updated the fault,
       * invalidate the `useGetFaults` in the background so when
       * the user navigates to the `Faults` page, the data will be fresh.
       */
      queryClient.invalidateQueries({
        predicate: (queryKey) => {
          return queryKey.queryKey.includes(RQ_QUERY_KEY.useGetFaults);
        },
      });
    },
    onError: (error) => {
      console.error(`[useUpdateFaultsByHostname]: `, error);

      notification.error({
        key: `useUpdateFaultsByHostname-error`,
        message: "Error Updating Fault",
        description: <APIErrorMessage />,
      });
    },
  });
};
