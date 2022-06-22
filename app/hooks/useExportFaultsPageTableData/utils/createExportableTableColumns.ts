import { cloneDeep } from 'lodash';
import { FaultsTableColumn } from 'components/FaultsTable/TableColumns';

/**
 * @description
 * This function is to filter out table rows that we don't want to be part of our spreadsheet data.
 * And also has logic for adding/removing renaming columns for the CSV Export
 *
 * @example
 * There are table columns that we may not want to export. For example, on the homepage,
 * where we have the faults table, there is a column called `Action` that contains
 * Button's and that data is not exportable.
 *
 */
export const createExportableColumns = (columns: FaultsTableColumn[]) => {
  const cols = cloneDeep(columns);
  const exportableColumns = cols.filter((column) => {
    const isColumnVisible = column.visible;

    if (column.title === 'Action') {
      // In the table UI this is 'Action', but in the CSV we need to be called 'Actionable'
      column.title = 'Actionable';
    }

    return isColumnVisible;
  });

  return exportableColumns;
};
