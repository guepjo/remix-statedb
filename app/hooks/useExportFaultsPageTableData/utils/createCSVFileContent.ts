import { FaultsTableColumn } from 'components/FaultsTable/TableColumns';
import { CMAPIData } from 'types';

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
export const createCSVFileContent = (tableData: CMAPIData[], columns: FaultsTableColumn[]): string[][] => {
  const csvFileData: string[][] = [];

  for (const record of tableData) {
    for (const fault of record.faults) {
      // NOTE: There should be a CSV row for each 'fault' in 'record.faults'
      const rowData: string[] = [];

      for (const column of columns) {
        const { title } = column;
        let cellData = '';

        if (title === 'CM ID') {
          cellData = record.cm_id.toString();
        } else if (title === 'Created At') {
          cellData = record.created;
        } else if (title === 'Hostname') {
          cellData = record.hostname;
        } else if (title === 'Location') {
          cellData = record.inops_data.location;
        } else if (title === 'Created By') {
          cellData = fault.created_by;
        } else if (title === 'Jira') {
          cellData = fault.jira_ticket;
        } else if (title === 'Detection System') {
          cellData = fault.detection_system;
        } else if (title === 'Check ID') {
          cellData = fault.check_id;
        } else if (title === 'Fault Types') {
          cellData = fault.fault_type;
        } else if (title === 'Teams') {
          cellData = fault.team;
        } else if (title === 'Applications') {
          cellData = record.apps.map((app) => app).join(',');
        } else if (title === 'Actionable') {
          const isActionable = record.actionable === 'yes';

          cellData = isActionable.toString();
        }
        rowData.push(cellData);
      }
      csvFileData.push(rowData);
    }
  }

  return csvFileData;
};
