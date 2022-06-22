import {
  GetFaultByHostnameAPIResponse,
  GetFaultByHostnameAPIResponseDataTypes,
} from "~/types";
import { request } from "~/utils";
import { INOPS_DEFAULT_DATA } from "./constants";

export const DEFAULT_GET_FAULT_BY_HOSTNAME_DATA_RESPONSE: GetFaultByHostnameAPIResponseDataTypes =
  {
    all: [],
    closed: [],
    inopsData: INOPS_DEFAULT_DATA,
    open: [],
  };

export const getFaultsByHostname = async (
  params: string
): Promise<GetFaultByHostnameAPIResponseDataTypes> => {
  const response = await request<GetFaultByHostnameAPIResponse>(
    `/handler/faults/host?${params}`
  );

  return response.data || DEFAULT_GET_FAULT_BY_HOSTNAME_DATA_RESPONSE;
};
