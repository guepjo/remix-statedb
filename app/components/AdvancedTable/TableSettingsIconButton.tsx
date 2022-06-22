import React from "react";
import { Button, Checkbox, Popover, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { FaultsPerHostTableColumn } from "~/components/FaultsPerHostTable/TableColumns";
import { FaultsTableColumn } from "~/components/FaultsTable/TableColumns";

type TableSettingsIconButtonProps = {
  tableColumns: FaultsPerHostTableColumn[] | FaultsTableColumn[];
  handleToggleTableColumnVisbility: (
    column: FaultsPerHostTableColumn | FaultsTableColumn
  ) => void;
  handleResetTableColumnVisibility: () => void;
};

/**
 * @description
 * A popover menu that displays the data table columns and allows the user to toggle the visibility of each column.
 */
const TableSettingsIconButton = ({
  tableColumns,
  handleToggleTableColumnVisbility,
  handleResetTableColumnVisibility,
}: TableSettingsIconButtonProps) => {
  return (
    <>
      <Tooltip title="Column Settings">
        <Popover
          trigger={["click"]}
          placement="bottomRight"
          arrowPointAtCenter
          title={
            <div style={{ textAlign: "center" }}>
              <Button
                type="link"
                onClick={() => {
                  handleResetTableColumnVisibility();
                }}
                size="small"
                block
              >
                Reset
              </Button>
            </div>
          }
          content={
            <ul className="advanced-table-row-list">
              {tableColumns?.map((column, index) => {
                return (
                  <li key={(column?.title as string) || index}>
                    <Checkbox
                      checked={(column as any).visible !== false}
                      onChange={() => {
                        handleToggleTableColumnVisbility(column);
                      }}
                    >
                      {column.title}
                    </Checkbox>
                  </li>
                );
              })}
            </ul>
          }
        >
          <Button
            data-testid="table-settings-button"
            icon={<SettingOutlined />}
            title="settings"
            type="text"
          />
        </Popover>
      </Tooltip>
    </>
  );
};

export default TableSettingsIconButton;
