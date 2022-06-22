import { getHealthCheckURL, getHostInfoToolURL, getInopsURL, getJiraTicketURL, getStoruCmIdDetailsURL } from './url';

describe('getHealthCheckURL', () => {
  test(`should return get URL from object`, () => {
    const data = [
      {
        check_id: '',
        component: '',
        created: '',
        created_by: '',
        description: '',
        detection_system: '',
        fault_type: '',
        health_check_url: 'https://test-health-check-url.com',
        is_manual: true,
        jira_ticket: '',
        jira_url: '',
        updated: '',
        team: '',
      },
    ];
    const url = getHealthCheckURL(data);

    expect(url).toEqual('https://test-health-check-url.com');
  });
});

describe('getHostInfoToolURL', () => {
  test(`should return url`, () => {
    const url = getHostInfoToolURL('example.com');

    expect(url).toEqual('https://host-information-tool.corp.linkedin.com//?host=example.com');
  });
});
describe('getInopsURL', () => {
  test(`should return url`, () => {
    const url = getInopsURL('example.com');

    expect(url).toEqual('https://inops.corp.linkedin.com/inops/devices/list?name=CONTAINS+example.com');
  });
});
describe('getJiraTicketURL', () => {
  test(`should return url`, () => {
    const url = getJiraTicketURL('test-123');

    expect(url).toEqual('https://jira01.corp.linkedin.com:8443/browse/test-123');
  });
});
