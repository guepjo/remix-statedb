import React from "react";
import { Button, Select, PaginationProps, TablePaginationConfig } from "antd";
import { NewFaultsForm } from "~/components/NewFaultsForm";
import AdvancedTable from "~/components/AdvancedTable/AdvancedTable";
import TableSettingsIconButton from "~/components/AdvancedTable/TableSettingsIconButton";
import TableSearchFiltersButton from "~/components/AdvancedTable/TableSearchFiltersButton";
import { SyncOutlined } from "@ant-design/icons";
import {
  SorterResult,
  FilterValue,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import { CMAPIData } from "~/types";
import { FaultsPerHostTableColumn } from "~/components/FaultsPerHostTable/TableColumns";
import { FaultsTableCSVExportButton } from "./FaultsTableCSVExportButton";
import { FaultsTableColumn } from "./TableColumns";
import "./FaultsTable.css";

type CmStatusTypes = "open" | "closed" | "all";

type FaultsTableProps = {
  isLoading: boolean;
  columns: FaultsTableColumn[];
  dataSource: CMAPIData[];
  handleRefreshTableData: () => void;
  cmStatus: CmStatusTypes;
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CMAPIData> | SorterResult<CMAPIData>[],
    extra: TableCurrentDataSource<CMAPIData>
  ) => void;
  handleCMStatusSelectChange: (value: CmStatusTypes) => void;
  handleResetSearchFilters: () => void;
  tablePagination: PaginationProps;
  totalSearchResults: number;
};
/**
 * @description
 * Data table that is used on the homepage.
 */
const FaultsTable = ({
  columns = [],
  dataSource = [],
  cmStatus = "open",
  isLoading,
  handleCMStatusSelectChange,
  handleResetSearchFilters,
  handleRefreshTableData,
  handleTableChange,
  tablePagination,
  totalSearchResults,
}: FaultsTableProps) => {
  const [tableColumns, setTableColumns] =
    React.useState<FaultsTableColumn[]>(columns);

  /**
   * @description
   * Called when the user clicks a column name in our column visibilibity dropdown menu.
   */
  const handleToggleTableColumnVisbility = (
    clickedColumnItem: FaultsPerHostTableColumn | FaultsTableColumn
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
        className="faults-search-table"
        columns={(tableColumns as any[]) || []}
        dataSource={dataSource || []}
        rowKey="key"
        size="small"
        loading={isLoading}
        tablePagination={tablePagination}
        handleTableChange={handleTableChange}
        TableHeader={
          <>
            <div className="advanced-table-header">
              <p>{totalSearchResults} matched result(s)</p>
              <div className="advanced-table-header-defaults">
                <TableSearchFiltersButton />
                <Button
                  style={{ marginRight: 10 }}
                  onClick={handleRefreshTableData}
                  disabled={isLoading}
                  loading={isLoading}
                  icon={<SyncOutlined />}
                >
                  Refresh
                </Button>
                <Select
                  showSearch
                  size="middle"
                  defaultValue="open"
                  value={cmStatus}
                  className="cm-select-button"
                  style={{ width: 140, marginRight: 10 }}
                  onChange={handleCMStatusSelectChange}
                >
                  <Select.Option value="open">Open CMs</Select.Option>
                  <Select.Option value="closed">Closed CMs</Select.Option>
                  <Select.Option value="all">All CMs</Select.Option>
                </Select>

                <Button
                  style={{ marginRight: 10 }}
                  onClick={handleResetSearchFilters}
                >
                  Clear Filters
                </Button>

                <NewFaultsForm />
                <FaultsTableCSVExportButton
                  tableColumns={tableColumns}
                  tableData={dataSource || []}
                />
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
            </div>
          </>
        }
      />
    </>
  );
};

export default FaultsTable;
