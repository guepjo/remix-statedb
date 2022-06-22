import { unparse } from 'papaparse';
import { cloneDeep } from 'lodash';
import { CMByHostnameAPIData } from 'types';
import { FaultsPerHostTableColumn } from 'components/FaultsPerHostTable/TableColumns';
import { getCurrentLocalDateAsString } from 'utils';
import { createExportableTableColumns } from './createExportableTableColumns';
import { createCSVFileContent } from './createCSVFileContent';

/**
 * @description
 * This generates a CSV file using the Ant's table data & table columns data.
 * This specific function is tailored for the needs of the Faults Per Host Page's table
 * which has different requirements than the Faults Homepage table.
 *
 * NOTE
 * I tried to generalize the table export export method, but found it too complex & confusing at the time
 * I highly recommend we keep the export methods for each table on their own.
 * This way:
 * - changing/updating the export behavior only affects 1 table
 * - keeps logic, "easier" to follow compared to trying to keep all the business logic in 1 method
 *
 * @example
 * https://codesandbox.io/s/ant-table-csv-export-papaparse-example-h1tc6b?file=/src/components/FaultsTable/index.tsx
 */
export const exportFaultsPerHostPageTableData = (
  tableData: CMByHostnameAPIData[],
  columns: FaultsPerHostTableColumn[],
) => {
  if (!tableData || tableData.length === 0 || !columns || columns?.length === 0) return;
  const tableRows = cloneDeep(tableData);
  const exportableTableColumns = createExportableTableColumns(columns);

  console.log(`tableRows`, tableData);
  const fields: string[] = exportableTableColumns.map((column) => column.title as string);
  const csvFileContent = createCSVFileContent(tableRows, columns);

  const csv = unparse({ fields, data: csvFileContent });
  const blob = new Blob([csv]);
  const a = window.document.createElement('a');
  const nowDate = getCurrentLocalDateAsString();

  a.href = window.URL.createObjectURL(blob);
  a.download = `faults_${nowDate}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
