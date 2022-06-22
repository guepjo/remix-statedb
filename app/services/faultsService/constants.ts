import { FaultMetaDataAPIResponse, InopsDataType } from "~/types";

/**
 * @description
 * This values is used when we attempt to grab the faults meta data from localStorage
 * and it fails. We use this as a fallbacl
 */
export const initialFaulsMetaDataValue: FaultMetaDataAPIResponse = {
  applications: [],
  checkIds: [],
  detectionSystems: [],
  faultTypes: [],
  hostnames: [],
  teams: [],
};

export const INOPS_DEFAULT_DATA: InopsDataType = {
  cabinet: "",
  cage: "",
  created_time: undefined,
  device_id: undefined,
  environment: "",
  fabric: "",
  fabric_group: "",
  location: "",
  manufacturer: "",
  model: "",
  multiproducts: [],
  ru: undefined,
  services: [],
  site: "",
  state: "",
  template_group: "",
  template_name: "",
  warranty_expiration: undefined,
  warranty_start: undefined,
};
