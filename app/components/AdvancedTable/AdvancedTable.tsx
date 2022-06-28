/* eslint-disable camelcase */
import React from "react";
import {
  Table,
  TableProps,
  Card,
  PaginationProps,
  TablePaginationConfig,
  CardProps,
} from "antd";
import {
  SorterResult,
  FilterValue,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import "./AdvancedTable.css";
import { useLoaderData } from "@remix-run/react";
import { LoaderData } from "~/types/data";

type AdvancedTableProps = {
  TableHeader?: React.ReactNode;
  tablePagination?: PaginationProps;
  cardProps?: CardProps;
  /**
   * @description
   * Callback executed when pagination, filters or sorter is changed
   * @docs
   * https://ant.design/components/table/#Table
   */
  handleTableChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => void;
} & TableProps<Record<string, any>>;

/**
 * @description
 * Custom version of the Ant Table component with some out of the box enhancements like:
 * - ability to show/hide columns
 * - ability to set the table's visual compactness:  "small" | "middle" | "large"
 */
const AdvancedTable = (props: AdvancedTableProps) => {
  const columns = props.columns || [];
  const tableData = props.dataSource || [];
  const tablePagination = props.tablePagination || false;
  const handleTableChange = props.handleTableChange || undefined;
  const cardProps = props.cardProps || {};
  const { Employees } = useLoaderData<LoaderData>();

  /*
  - Check if the user forgot to include `visible` key inside their columns
  - we use `visible` to show/hide columns
  */
  if (columns.some((column: any) => typeof column.visible === "undefined")) {
    throw new Error(
      "You forgot to include `visible` key inside your columns. Without it, the table will not show any columns."
    );
  }

  return (
    <>
      <section className={props.className}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Card size="small" {...cardProps}>
          {props.TableHeader}
          <Table
            bordered
            className={`advanced-table 'advanced-table-outlined`}
            rowKey={props.rowKey}
            columns={columns.filter((col: any) => col.visible) || []}
            dataSource={Employees}
            loading={props.loading || false}
            size={props.size || "small"}
            sticky
            scroll={{ x: 600, y: 1200 }}
            pagination={tablePagination}
            onChange={handleTableChange}
          />
        </Card>
      </section>
    </>
  );
};

export default AdvancedTable;
