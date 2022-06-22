import { request } from "~/utils";
import { UpdateByCmIDAPIResponse } from "~/types";

export const updateFaultByCmId = async (
  cmId: number,
  action: "start" | "close"
): Promise<UpdateByCmIDAPIResponse> => {
  const response = await request<UpdateByCmIDAPIResponse>(`handler/faults`, {
    method: "PUT",
    body: {
      cmId,
      action,
    },
  });

  return response;
};
