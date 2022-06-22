import { FaultsTableColumn, TABLE_COLUMNS } from 'components/FaultsTable/TableColumns';
import { cloneDeep } from 'lodash';
import { createExportableColumns } from './createExportableTableColumns';

describe('createExportableColumns', () => {
  test('it should filter out columns that are marked not visible', () => {
    const tableColumns = cloneDeep(TABLE_COLUMNS).map((col: FaultsTableColumn) => {
      return { ...col, visible: false };
    });
    const exportableColumns1 = createExportableColumns(tableColumns);

    expect(exportableColumns1.length).toBe(0);
  });
  test('it should not filter out columns that are marked visible', () => {
    const tableColumns = cloneDeep(TABLE_COLUMNS).map((col: FaultsTableColumn) => {
      return { ...col, visible: true };
    });
    const exportableColumns = createExportableColumns(tableColumns);

    expect(exportableColumns.length).toBe(tableColumns.length);
  });

  test('it should rename `Action` column name to `Actionable`', () => {
    const tableColumns = cloneDeep(TABLE_COLUMNS).map((col: FaultsTableColumn) => {
      return { ...col, visible: true };
    });
    const exportableColumns = createExportableColumns(tableColumns);
    const doesContainActionbleColumn =
      exportableColumns.find((col) => {
        return col.title === 'Actionable';
      })?.title === 'Actionable';

    const doesNotContainActionColumn =
      exportableColumns.find((col) => {
        return col.title === 'Action';
      }) === undefined;

    expect(doesContainActionbleColumn).toBe(true);
    expect(doesNotContainActionColumn).toBe(true);
  });
});
