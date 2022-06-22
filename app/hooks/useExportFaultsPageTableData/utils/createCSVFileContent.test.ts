import { CMAPIData } from 'types';
import { TABLE_COLUMNS } from 'components/FaultsTable/TableColumns';
import { createCSVFileContent } from './createCSVFileContent';

const CM_ITEMS: CMAPIData[] = [
  {
    cm_id: 323,
    created: '2022-03-23 13:47:22',
    updated: '2022-03-23 13:47:22',
    created_by: 'rbhanot',
    last_updated_by: '',
    cm_uuid: 'c35e5842-aaaf-11ec-aca9-ac1f6bd50e76',
    status: 'CREATED',
    hostname: 'lca1-app6294.corp.linkedin.com',
    inops_data: {
      device_id: 819293,
      state: 'Production',
      fabric: 'corp-lca1',
      fabric_group: 'corp',
      environment: '',
      warranty_start: 1527750000,
      warranty_expiration: 1622444400,
      created_time: 1529352095,
      site: 'LCA1',
      cage: 'B',
      cabinet: '1018',
      ru: 9,
      location: 'LCA1:B:1018:9',
      template_name: 'SM-DENSE-020',
      template_group: 'App node, 64G',
      model: 'Fat Twin Server Module',
      manufacturer: 'SuperMicro',
      multiproducts: ['esp-job'],
      services: ['esp-job'],
    },
    apps: ['esp-job'],
    app_owners: [],
    actionable: 'yes',
    workflow_state: 'Get Server Ready',
    hooks_phase_name: '',
    hooks_phase_status: '',
    hooks_plan_id: '',
    hooks_enabled: false,
    fault_types: ['nvme'],
    check_ids: ['cli_created_nvme'],
    total_faults: 1,
    faults: [
      {
        created_by: 'rbhanot',
        check_id: 'cli_created_nvme',
        detection_system: 'manual',
        health_check_url: '',
        fault_type: 'nvme',
        team: 'dctechs',
        description: 'Manual fault created for lca1-app6294.corp.linkedin.com - nvme',
        is_manual: true,
        component: '',
        jira_ticket: '',
        jira_url: '',
        created: '2022-03-23 13:47:22',
        updated: '2022-03-23 13:47:22',
      },
      {
        created_by: 'kreber',
        check_id: 'cli_created_memory',
        detection_system: 'manual',
        health_check_url: '',
        fault_type: 'memory',
        team: 'dctechs',
        description: 'testing',
        is_manual: true,
        component: 'test',
        jira_ticket: '',
        jira_url: '',
        created: '2022-04-19 19:21:29',
        updated: '2022-04-19 19:21:29',
      },
    ],
  },
  {
    cm_id: 324,
    created: '2022-03-23 13:47:22',
    updated: '2022-03-23 13:47:23',
    created_by: 'rbhanot',
    last_updated_by: '',
    cm_uuid: 'c3bf72ee-aaaf-11ec-967e-ac1f6bd50e76',
    status: 'CREATED',
    hostname: 'lca1-app5838.corp.linkedin.com',
    inops_data: {
      device_id: 1188038,
      state: 'Production',
      fabric: 'corp-lca1',
      fabric_group: 'CORP',
      environment: '',
      warranty_start: 1564642800,
      warranty_expiration: 1659423600,
      created_time: 1565033937,
      site: 'LCA1',
      cage: 'B',
      cabinet: '108',
      ru: 3,
      location: 'LCA1:B:108:3',
      template_name: 'DELL-DENSE-030-NVME-SSD',
      template_group: 'App node, 64G',
      model: 'DL C6420',
      manufacturer: 'Dell',
      multiproducts: ['tm2-orca-job'],
      services: ['tm2-orca-job'],
    },
    apps: ['tm2-orca-job'],
    app_owners: [],
    actionable: 'yes',
    workflow_state: 'Get Server Ready',
    hooks_phase_name: '',
    hooks_phase_status: '',
    hooks_plan_id: '',
    hooks_enabled: false,
    fault_types: ['network'],
    check_ids: ['cli_created_network'],
    total_faults: 1,
    faults: [
      {
        created_by: 'rbhanot',
        check_id: 'cli_created_network',
        detection_system: 'manual',
        health_check_url: '',
        fault_type: 'network',
        team: 'sysops',
        description: 'Manual fault created for lca1-app5838.corp.linkedin.com - network',
        is_manual: true,
        component: '',
        jira_ticket: '',
        jira_url: '',
        created: '2022-03-23 13:47:22',
        updated: '2022-03-23 13:47:22',
      },
    ],
  },
];

describe('createCSVFileContent', () => {
  test('should return an array with an array of strings', () => {
    const faultsCSVFileContent = createCSVFileContent(CM_ITEMS, TABLE_COLUMNS);

    expect(faultsCSVFileContent).toBeInstanceOf(Array);
    expect(faultsCSVFileContent.every((row) => Array.isArray(row)));
    expect(
      faultsCSVFileContent.every((row) => {
        return row.every((item) => typeof item === 'string');
      }),
    ).toBe(true);
  });

  test('the number of items in the row should correspond to the number of available table columns', () => {
    const faultsCSVFileContent = createCSVFileContent(CM_ITEMS, TABLE_COLUMNS);

    expect(
      faultsCSVFileContent.every((row) => {
        return row.length === TABLE_COLUMNS.length;
      }),
    ).toBe(true);
  });

  test('should create a new csv row for each fault item in original data', () => {
    const faultsCSVFileContent = createCSVFileContent(CM_ITEMS, TABLE_COLUMNS);
    const numberOfFaultsInOriginalData = CM_ITEMS.flatMap((CM_ITEM) => {
      return CM_ITEM.faults;
    }).length;

    expect(faultsCSVFileContent.length).toBe(numberOfFaultsInOriginalData);
  });
});
