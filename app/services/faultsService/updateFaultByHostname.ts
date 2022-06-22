import { UpdateByCmIDAPIResponse } from "~/types";
import { request } from "~/utils";

export const updateFaultsByHostname = async (
  hostname: string,
  action: "start" | "close"
): Promise<UpdateByCmIDAPIResponse> => {
  const response = await request<UpdateByCmIDAPIResponse>(
    `handler/fault_hostname/${hostname}`,
    {
      method: "PUT",
      body: {
        action,
      },
    }
  );

  return response;
};
