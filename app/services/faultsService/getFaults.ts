import { FaultAPIResponse } from "~/types";
import { request } from "~/utils";

export const getFaults = async (params: string): Promise<FaultAPIResponse> => {
  const response = await request<FaultAPIResponse>(`/handler/faults?${params}`);
  // response.data is returned as an empty object if there are no matches found
  // if no matches are found, return an empty array
  const data = response?.data.length ? response?.data : [];

  return { ...response, data };
};
