import { FaultsPerHostTableColumn } from 'components/FaultsPerHostTable/TableColumns';
import { cloneDeep } from 'lodash';

/**
 * @description
 * This function is to filter out table rows that we don't want to be part of our spreadsheet data.
 * Use this method to place your logic to filter out table columns per your criteria
 *
 * @example
 * There are table columns that we may not want to export. For example, on the homepage,
 * where we have the faults table, there is a column called `Action` that contains
 * Button's and that data is not exportable.
 *
 *
 * NOTE:
 * This function is similar to the one that the FaultsTable uses. However, to keep things clean, simple
 * flexible towards changing user/business requirements, maintainability & testability, as opposed
 * to trying to generalize the differences between both tables, each of our data tables have their
 * "export data" logic self contained.
 */

export const createExportableTableColumns = (columns: FaultsPerHostTableColumn[]) => {
  const cols = cloneDeep(columns);

  return cols.filter((column) => {
    const isColumnVisible = column.visible !== false;

    return isColumnVisible;
  });
};
