export type FaultType =
  | 'disk'
  | 'fan'
  | 'fusion'
  | 'hba'
  | 'memory'
  | 'mobo'
  | 'network'
  | 'nic'
  | 'ntp'
  | 'nvme'
  | 'nvme_hgst'
  | 'nvme_intel'
  | 'nvme_reboot'
  | 'power'
  | 'virident';

export type PageTypes = {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_records: number;
};

export type InopsDataType = {
  cabinet: string;
  cage: string;
  created_time?: number;
  device_id?: number;
  environment: string;
  fabric: string;
  fabric_group: string;
  location: string;
  manufacturer: string;
  model: string;
  multiproducts: string[];
  ru?: number;
  services: string[];
  site: string;
  state: string;
  template_group: string;
  template_name: string;
  warranty_expiration?: number;
  warranty_start?: number;
};

export type FaultAPIDataType = {
  check_id: string;
  component: string;
  created: string;
  created_by: string;
  description: string;
  detection_system: string;
  fault_type: string;
  health_check_url: string;
  is_manual: boolean;
  jira_ticket: string;
  jira_url: string;
  updated: string;
  team: string;
};

export type CMAPIData = {
  actionable: string;
  app_owners: string[];
  apps: string[];
  check_ids: string[];
  cm_id: number;
  cm_uuid: string;
  created: string;
  created_by: string;
  fault_types: string[];
  faults: FaultAPIDataType[];
  hooks_enabled: boolean;
  hooks_phase_name: string;
  hooks_phase_status: string;
  hooks_plan_id: string;
  hostname: string;
  inops_data: InopsDataType;
  last_updated_by: string;
  status: string;
  total_faults: number;
  updated: string;
  workflow_state: string;
};

export type CMByHostnameAPIData = {
  fault: FaultAPIDataType;
} & CMAPIData;

export type FaultAPIResponse = {
  count: number;
  host_: string;
  location: string;
  message: string;
  page: PageTypes;
  data: CMAPIData[];
};

export type GetFaultByHostnameAPIResponse = {
  count: number;
  host_: string;
  location: string;
  message: string;
  page: PageTypes;
  data: GetFaultByHostnameAPIResponseDataTypes;
};

export type GetFaultByHostnameAPIResponseDataTypes = {
  all: CMByHostnameAPIData[];
  closed: CMByHostnameAPIData[];
  inopsData: InopsDataType;
  open: CMByHostnameAPIData[];
};

type UpdateByCmIDAPIResponseDataTypes = CMAPIData & {
  hooks_enabled: boolean;
  hooks_plan_id: string;
  last_updated_by: string;
};

export type UpdateByCmIDAPIResponse = {
  count: number;
  host_: string;
  location: string;
  message: string;
  page: PageTypes | null;
  data: UpdateByCmIDAPIResponseDataTypes[];
};

type NewFaultGeneralTypes = {
  component: string;
  fault_type?: string;
  team?: string;
  description?: string;
};

export type CreateNewFaultTypes = {
  hostname: string;
} & NewFaultGeneralTypes;

export type CreateNewFaultsTypes = {
  hostnames: string[];
} & NewFaultGeneralTypes;

export type UpdateFaultRequestBody = {
  cm_id: string;
  action: 'start' | 'close';
};

export type PromiseErrorTypes = {
  detail: {
    loc: string[];
    msg: string;
    type: string;
  }[];
};

export type FaultColorTypes =
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'blue'
  | 'geekblue'
  | 'cyan'
  | 'turquoise'
  | 'purple';

export type FaultTypeTypes = 'open' | 'closed' | 'all';

export type FaultMetaDataAPIResponse = {
  applications: string[];
  checkIds: string[];
  detectionSystems: string[];
  faultTypes: string[];
  teams: string[];
  hostnames: string[];
};
