import { FaultMetaDataAPIResponse } from "~/types";
import { request } from "~/utils";

/**
 * @description
 * Fetch meta data about faults. Primary use case for this endpoind is to get an aggregate summary of certain parts of the fault data.
 * Foe example, I want to know all the possible unique values for `applications`, `check_ids`, `detection_systems`, `fault_types` etc..
 * This meta data summary is used in some of our form's `<Select>` dropdown menu's so we can display to the user all possible correct values
 * they can choose when either searching for faults or creating a fault ticket.
 */
export const getFaultsMetaData =
  async (): Promise<FaultMetaDataAPIResponse> => {
    const response = await request<FaultMetaDataAPIResponse>(
      "/handler/faults_meta_data"
    );

    return response;
  };
