import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { FaultsService } from "~/services";
import { CreateNewFaultsTypes } from "~/types";
import { APIErrorMessage, ExternalLinkIcon } from "~/components";
import { notification } from "antd";
import { RQ_QUERY_KEY } from "~/utils";

const HOSTNAME_DETAILS_BASE_URL = "/search/host?";

const AnchorElement = ({ hostname }: { hostname: string }) => {
  return (
    <>
      <a
        data-testid="hostname-column-host-details-link"
        href={`${HOSTNAME_DETAILS_BASE_URL}hostname=${hostname}`}
        target="_blank"
        rel="noreferrer"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginRight: ".5rem" }}>{hostname}</span>
        <span style={{ width: "14px", display: "flex" }}>
          <ExternalLinkIcon />
        </span>
      </a>
    </>
  );
};

export const useCreateFault = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      newFaultData,
    }: {
      newFaultData: CreateNewFaultsTypes;
    }) => {
      const response = await FaultsService.createAllFaults(newFaultData);

      return response;
    },
    onSuccess: (responses) => {
      for (const response of responses) {
        const { hostname } = response.data[0];

        notification.success({
          key: `useCreateFault-success-${hostname}`,
          message: `Fault created`,
          description: <AnchorElement hostname={hostname} />,
        });
      }
      /**
       * After we have successfully created the fault,
       * invalidate the `useGetFaults` query in the background so the newest
       * fault data seemelessly appears in the UI.
       */
      queryClient.invalidateQueries({
        predicate: (queryKey) => {
          return queryKey.queryKey.includes(RQ_QUERY_KEY.useGetFaults);
        },
      });
    },
    onError: (error) => {
      console.error(`[useCreateFault]: `, error);

      notification.error({
        key: "create-fault-error",
        message: "Error Creating New Fault",
        description: <APIErrorMessage />,
      });
    },
  });
};
