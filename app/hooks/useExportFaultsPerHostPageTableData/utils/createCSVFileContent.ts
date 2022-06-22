import { FaultsPerHostTableColumn } from 'components/FaultsPerHostTable/TableColumns';
import { CMByHostnameAPIData } from 'types';
import { getArrayofUniqueElements, getArrayofUniqueObjects } from 'utils';

/**
 * @description
 * Formats our CSV file so that is an array with an array of strings – this is the format we need to pass
 * into our 'papaparse' CSV generator library.
 *
 * Ensure's that every fault of each CM, has it's own row for the generated CSV.
 *
 * Example: – An Array of Objects
 *   Input
 *    [
 *       {
 *        cm: '123',
 *        faults: [{faultName: 'fault1'}, {faultName: 'fault2'}]   // <-- This CM has 2 faults
 *       },
 *       {
 *        cm: '456',
 *        faults: [{faultName: 'fault3'}]   // <-- This CM has 1 fault
 *       }
 *     ]
 *
 *   Output – An Array that contains an Array of Strings
 *    [
 *      [ '123', 'fault1' ],   // <-- One row for first fault of CM '123'
 *      [ '123', 'fault2' ]    // <-- One row for second fault of CM '123'
 *      [ '456', 'fault3' ]    // <-- One row for first and only fault of CM '456'
 *    ]
 */
export const createCSVFileContent = (
  tableData: CMByHostnameAPIData[],
  columns: FaultsPerHostTableColumn[],
): string[][] => {
  const csvFileData: string[][] = [];

  for (const record of tableData) {
    // There should be a 1 row for each fault for a CM: https://linkedin-randd.slack.com/archives/C02SV2DUTRA/p1650291480651499
    const rowData: string[] = [];

    for (const column of columns) {
      let cellData = '';

      if (column.title === 'CM ID') {
        cellData = record.cm_id.toString();
      } else if (column.title === 'Check ID') {
        cellData = record.check_ids.map((checkID) => checkID).join(',');
      } else if (column.title === 'Fault Types') {
        cellData = record.fault_types.map((faultType) => faultType).join(',');
      } else if (column.title === 'Teams') {
        const teams = record.faults.map((fault) => fault.team);
        const uniqueTeams = getArrayofUniqueElements(teams);

        cellData = uniqueTeams.join(',');
      } else if (column.title === 'Jira') {
        let jiraTickets = record.faults.map((fault) => fault.jira_ticket);

        jiraTickets = getArrayofUniqueObjects(jiraTickets);
        cellData = jiraTickets.join(',');
      } else if (column.title === 'Component') {
        cellData = record.fault.component;
      } else if (column.title === 'Description') {
        cellData = record.fault.description;
      } else if (column.title === 'Created By') {
        cellData = record.created_by;
      } else if (column.title === 'Created At') {
        cellData = record.created;
      }

      rowData.push(cellData);
    }
    csvFileData.push(rowData);
  }

  return csvFileData;
};
