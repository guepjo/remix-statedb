import { CreateNewFaultTypes, UpdateByCmIDAPIResponse } from "~/types";
import { request } from "~/utils";

export const createFault = async (
  newFaultData: CreateNewFaultTypes
): Promise<UpdateByCmIDAPIResponse> => {
  const response = await request<UpdateByCmIDAPIResponse>("/handler/faults", {
    method: "POST",
    body: newFaultData,
  });

  return response;
};
