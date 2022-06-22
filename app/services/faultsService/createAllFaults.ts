import { CreateNewFaultsTypes, UpdateByCmIDAPIResponse } from "~/types"; // TODO ensure all API types to types folder
import { createFault } from "./createFault";

export const createAllFaults = async (
  newFaultsData: CreateNewFaultsTypes
): Promise<UpdateByCmIDAPIResponse[]> => {
  const { hostnames } = newFaultsData;
  const responses = [];

  // loop for each hostname
  for (const hostname of hostnames) {
    const newFaultData = { ...newFaultsData, hostname };

    // eslint-disable-next-line no-await-in-loop
    const response = await createFault(newFaultData);

    responses.push(response);
  }

  return responses;
};
