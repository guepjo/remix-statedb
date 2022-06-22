import React from "react";
import { Button, Popover, Tooltip } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { useExportFaultsPerHostPageTableData } from "~/hooks/useExportFaultsPerHostPageTableData/useExportFaultsPerHostPageTableData";
import { CMByHostnameAPIData } from "~/types";
import { FaultsPerHostTableColumn } from "./TableColumns";

type FaultsPerHostTableDataExportButtonProps = {
  tableColumns: FaultsPerHostTableColumn[];
  tableData: CMByHostnameAPIData[];
};

/**
 * @description
 * A button that is shown on our data table that enables users
 * the ability to export the table data into CSV file.
 */
export const FaultsPerHostTableDataExportButton = ({
  tableColumns = [],
  tableData = [],
}: FaultsPerHostTableDataExportButtonProps) => {
  const exportTableData = useExportFaultsPerHostPageTableData();
  const [isExportMenuOpen, setIsExportMenuOpen] = React.useState(false);
  const toggleCsvExportMenu = () => setIsExportMenuOpen(!isExportMenuOpen);

  const handleExportTableData = () => {
    exportTableData.mutate({ tableColumns, tableData });
    toggleCsvExportMenu();
  };

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
              <footer
                style={{
                  marginLeft: "auto",
                  width: "fit-content",
                  marginTop: 10,
                }}
              >
                <Button
                  style={{ marginRight: 15 }}
                  onClick={toggleCsvExportMenu}
                >
                  Cancel
                </Button>

                <Button type="primary" onClick={handleExportTableData}>
                  Export
                </Button>
              </footer>
            </>
          }
        >
          <div style={{ textAlign: "center" }}>
            <Button
              disabled={tableData.length === 0}
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

export default FaultsPerHostTableDataExportButton;
