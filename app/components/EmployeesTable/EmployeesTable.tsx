import { PaginationProps, TablePaginationConfig } from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import type { Employees } from "~/types/data";
import { AdvancedTable } from "../AdvancedTable";
import TableSettingsIconButton from "~/components/AdvancedTable/TableSettingsIconButton";
import { FaultsTableColumn } from "./TableColumns";
import React from "react";

type EmployeesTableProps = {
  data: any;
  tablePagination: PaginationProps;
  columns: FaultsTableColumn[];
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => void;
};

const EmployeesTable = (props: EmployeesTableProps) => {
  const [tableColumns, setTableColumns] = React.useState<FaultsTableColumn[]>(
    props.columns
  );

  /**
   * @description
   * Called when the user clicks a column name in our column visibilibity dropdown menu.
   */
  const handleToggleTableColumnVisbility = (
    clickedColumnItem: FaultsTableColumn
  ) => {
    if (!clickedColumnItem) return;

    const updatedTableColumnItems = tableColumns?.map((column) => {
      if (column.title === clickedColumnItem.title) {
        column.visible = !column.visible;
      }

      return column;
    });

    setTableColumns(updatedTableColumnItems);
  };

  /**
   * @description
   * When a user clicks the reset button it will revert the table column visibility state
   * to our default state.
   */
  const handleResetTableColumnVisibility = () => {
    const updatedTableColumnItems = tableColumns?.map(
      (col: FaultsTableColumn) => {
        // We want to hide our 'Applications' and 'Updated At' column by default on page load
        if (col.title === "Applications" || col.title === "Updated At") {
          col.visible = false;
        } else {
          col.visible = true;
        }

        return col;
      }
    );

    setTableColumns(updatedTableColumnItems);
  };

  return (
    <>
      <AdvancedTable
        dataSource={props.data}
        columns={(tableColumns as any[]) || []}
        tablePagination={props.tablePagination}
        handleTableChange={props.handleTableChange}
        TableHeader={
          <>
            <div className="advanced-table-header">
              <TableSettingsIconButton
                tableColumns={tableColumns}
                handleToggleTableColumnVisbility={
                  handleToggleTableColumnVisbility
                }
                handleResetTableColumnVisibility={
                  handleResetTableColumnVisibility
                }
              />
            </div>
          </>
        }
      />
    </>
  );
};

export default EmployeesTable;
