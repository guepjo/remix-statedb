import React from "react";
import { Button, Popover, Select, Tooltip } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import {
  TableExportOption,
  useExportFaultsPageTableData,
} from "~/hooks/useExportFaultsPageTableData/useExportFaultsPageTableData";
import { CMAPIData } from "~/types";
import { FaultsTableColumn } from "./TableColumns";

type FaultsTableCSVExportButtonProps = {
  tableColumns: FaultsTableColumn[];
  tableData: CMAPIData[];
};

/**
 * @description
 * This CSV export button is specifically used for the homepage's Faults table.
 * The export requirements for this table and the "Faults Per Host" page
 * are quite different hence the separation.
 * For example
 * - this button can export `current_view` and `everything`, while the "Faults Per Host" page only ever exports the current view.
 * - this button uses a popover, with different menu items that than the "Faults Per Host" page.
 */
export const FaultsTableCSVExportButton = ({
  tableColumns,
  tableData,
}: FaultsTableCSVExportButtonProps) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = React.useState(false);
  const [shouldEnableFaultsExportQuery, setShouldEnableFaultsExportQuery] =
    React.useState(false);
  const [exportOption, setExportOption] =
    React.useState<TableExportOption>("current_view");

  const exportFaultsTableDataInfo = useExportFaultsPageTableData(
    exportOption,
    tableColumns,
    {
      enabled: shouldEnableFaultsExportQuery,
      onSettled: () => {
        toggleCsvExportMenu();
      },
    }
  );

  /**
   * @description
   * Open/Closes the table export menu.
   */
  const toggleCsvExportMenu = () => {
    setIsExportMenuOpen(!isExportMenuOpen);
    setShouldEnableFaultsExportQuery(false); // Esnsure we can't accidentally export data twice (sometimes react rerenders)
  };
  /**
   * @description
   * This is immediately called after the user clicks the export button.
   * Initially we disable the query, until the user has clicked the export option
   * and only then do we fire off our API call fetch the freshest table data that is
   * related to the queryParams in the URL
   */
  const handleEnableExportTableData = () => {
    setShouldEnableFaultsExportQuery(true);
  };

  /**
   * @description
   * Changes the export method to be used for the table (current_view or everything).
   */
  const handleExporOptionChange = React.useCallback(
    (option: TableExportOption) => {
      setExportOption(option);
    },
    []
  );

  return (
    <div className="CsvButton">
      <Tooltip title="Download Table Data to CSV">
        <Popover
          arrowPointAtCenter
          placement="bottomRight"
          title="Export Table Data"
          overlayStyle={{ width: "350px" }}
          trigger="click"
          visible={isExportMenuOpen}
          onVisibleChange={toggleCsvExportMenu}
          content={
            <>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>Export Criteria</p>
                <Select
                  style={{ width: 150 }}
                  defaultValue="current_view"
                  onChange={handleExporOptionChange}
                >
                  <Select.Option value="current_view">
                    Current View
                  </Select.Option>
                  <Select.Option value="everything">Everything</Select.Option>
                </Select>
              </div>

              <footer
                style={{
                  marginLeft: "auto",
                  width: "fit-content",
                  marginTop: 50,
                }}
              >
                <Button
                  style={{ marginRight: 15 }}
                  onClick={toggleCsvExportMenu}
                >
                  Cancel
                </Button>

                <Button
                  type="primary"
                  onClick={handleEnableExportTableData}
                  disabled={tableData.length === 0}
                  loading={exportFaultsTableDataInfo.isFetching}
                >
                  Export
                </Button>
              </footer>
            </>
          }
        >
          <div style={{ textAlign: "center" }}>
            <Button
              aria-label="Export to CSV"
              type="text"
              icon={<FileExcelOutlined />}
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            />
          </div>
        </Popover>
      </Tooltip>
    </div>
  );
};

export default FaultsTableCSVExportButtonProps;
