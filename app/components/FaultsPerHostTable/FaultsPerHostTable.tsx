import React from "react";
import { Select, Button, Tooltip } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { NewFaultsForm } from "~/components/NewFaultsForm";
import AdvancedTable from "~/components/AdvancedTable/AdvancedTable";
import TableSettingsIconButton from "~/components/AdvancedTable/TableSettingsIconButton";
import { useUpdateFaultsByHostname } from "~/hooks";
import { CMByHostnameAPIData, FaultTypeTypes } from "~/types";
import { FaultsTableColumn } from "~/components/FaultsTable/TableColumns";
import FaultsPerHostTableDataExportButton from "./FaultsPerHostTableDataExportButton";
import { FaultsPerHostTableColumn } from "./TableColumns";
import "./FaultsPerHostTable.css";

const FaultsPerHostFaultsTable = ({
  isLoading = false,
  hostname,
  handleRefresh,
  isValidHostname,
  columns = [],
  openFaultsTableData = [],
  closedFaultsTableData = [],
  allFaultsTableData = [],
}: {
  isLoading: boolean;
  hostname: string;
  handleRefresh: () => void;
  isValidHostname: boolean;
  columns: FaultsPerHostTableColumn[];
  openFaultsTableData: CMByHostnameAPIData[];
  closedFaultsTableData: CMByHostnameAPIData[];
  allFaultsTableData: CMByHostnameAPIData[];
}) => {
  const [cmStatus, setCMStatus] = React.useState<FaultTypeTypes>("open");
  const [tableColumns, setTableColumns] =
    React.useState<FaultsPerHostTableColumn[]>(columns);
  const updateFaultsByHostname = useUpdateFaultsByHostname();
  let tableData: CMByHostnameAPIData[] = [];

  if (cmStatus === "open") tableData = openFaultsTableData;
  if (cmStatus === "closed") tableData = closedFaultsTableData;
  if (cmStatus === "all") tableData = allFaultsTableData;

  const isFaultActionable =
    tableData && tableData.length > 0 && tableData[0].actionable === "yes";
  // User should only be able to Update Fault when looking at 'Open' CMs
  const disableIsFaultActionable =
    cmStatus !== "open" || !isFaultActionable || tableData.length < 1;
  const showFaultActionButton = isValidHostname && cmStatus !== "all";

  const actionLabel =
    cmStatus === "open" ? tableData[0]?.workflow_state || "Closed" : "Closed";
  // If a "isFaultActionable" === true, there should be only two possible values for workflow_state – "Get Server Ready" and "Resolve Fault".
  // If a Faults workflow_state is "Get Server Ready", our "actionType" should be "start",
  // else our action value will default to "close".
  // Reference: https://jira01.corp.linkedin.com:8443/browse/SDI-3300

  const isGetServerReadyAction = /get server ready/i.test(actionLabel);
  const isResolveFaultAction = /resolve fault/i.test(actionLabel);

  const resolveFaultActionButtonStyles = !disableIsFaultActionable
    ? {
        color: "#679504",
        borderColor: "#8ac705",
        marginRight: "1rem",
        minWidth: "124px",
      }
    : {
        color: "#679504",
        borderColor: "#8ac705",
        opacity: ".4",
        marginRight: "1rem",
        minWidth: "124px",
      };

  const actionType = isGetServerReadyAction ? "start" : "close";

  const handleUpdateFaultsByHostname = () => {
    updateFaultsByHostname.mutate({
      hostname,
      action: actionType,
    });
    handleRefresh();
  };

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
    const updatedTableColumnItems = columns?.map(
      (col: FaultsPerHostTableColumn) => {
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

  /**
   * @description
   * When the CM status is changed from the select,
   * update the state to re-render the page with the cm's
   * that meet the new CM status value
   */
  const handleCMStatusSelectChange = (value: FaultTypeTypes) => {
    setCMStatus(value);
  };

  return (
    <>
      <AdvancedTable
        data-testid="faults-table-data-section"
        className="faults-search-table"
        columns={columns as any[]}
        dataSource={tableData}
        rowKey="key"
        size="small"
        loading={isLoading}
        cardProps={{
          title: "Faults Data",
          headStyle: { borderBottom: "none", fontSize: "16px" },
        }}
        TableHeader={
          <>
            <div className="advanced-table-header">
              {isValidHostname && hostname && (
                <p>{tableData.length} matched result(s)</p>
              )}
              <div className="advanced-table-header-defaults">
                <Button
                  style={{ marginRight: 10 }}
                  onClick={handleRefresh}
                  disabled={
                    !isValidHostname || updateFaultsByHostname.isLoading
                  }
                  loading={isLoading}
                  icon={<SyncOutlined />}
                >
                  Refresh
                </Button>

                <Select
                  data-testid="faults-per-host-cm-status"
                  showSearch
                  size="middle"
                  defaultValue="open"
                  value={cmStatus}
                  className="cm-select-button"
                  style={{ width: 140, marginRight: 10 }}
                  onChange={handleCMStatusSelectChange}
                  disabled={!isValidHostname}
                >
                  <Select.Option value="open">Open CMs</Select.Option>
                  <Select.Option value="closed">Closed CMs</Select.Option>
                  <Select.Option value="all">All CMs</Select.Option>
                </Select>

                {showFaultActionButton && (
                  <Tooltip
                    title={disableIsFaultActionable ? "Not Actionable" : null}
                  >
                    <Button
                      data-testid="faults-per-host-action-button"
                      type="primary"
                      htmlType="button"
                      ghost
                      disabled={
                        disableIsFaultActionable ||
                        updateFaultsByHostname.isLoading ||
                        isLoading
                      }
                      loading={updateFaultsByHostname.isLoading}
                      onClick={handleUpdateFaultsByHostname}
                      style={
                        isResolveFaultAction
                          ? resolveFaultActionButtonStyles
                          : { marginRight: 10, minWidth: "124px" }
                      }
                    >
                      {actionLabel}
                    </Button>
                  </Tooltip>
                )}

                <NewFaultsForm />
                <FaultsPerHostTableDataExportButton
                  tableColumns={tableColumns}
                  tableData={tableData}
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

export default FaultsPerHostFaultsTable;
