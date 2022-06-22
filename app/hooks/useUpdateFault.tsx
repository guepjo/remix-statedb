import React from "react";
import { notification } from "antd";
import { APIErrorMessage } from "~/components/APIErrorMessage";
import { useMutation, useQueryClient } from "react-query";
import { FaultsService } from "~/services";
import { UpdateByCmIDAPIResponse } from "~/types";
import { RQ_QUERY_KEY } from "~/utils";

export const useUpdateFault = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cmId,
      action,
    }: {
      cmId: number;
      action: "start" | "close";
    }) => {
      if (typeof cmId !== "number")
        throw new Error("Please provide a cm_id value");
      if (["start", "close"].includes(action) === false)
        throw new Error("Please provide a valid action value");

      const response = await FaultsService.updateFaultByCmId(cmId, action);

      return response;
    },
    onSuccess: (response: UpdateByCmIDAPIResponse) => {
      notification.success({
        key: `useUpdateFault-success`,
        message: "Successfully Updated Fault",
        description: response.message,
      });
      /**
       * After we've successfully updated the fault,
       * invalidate previous `useGetFaults` data so the UI
       * will re-render with the new data.
       */
      queryClient.invalidateQueries({
        predicate: (queryKey) => {
          return queryKey.queryKey.includes(RQ_QUERY_KEY.useGetFaults);
        },
      });
    },
    onError: (error) => {
      console.error(`[useUpdateFault]: `, error);

      notification.error({
        key: `useUpdateFault-error`,
        message: "Error Updating Fault",
        description: <APIErrorMessage />,
      });
    },
  });
};
