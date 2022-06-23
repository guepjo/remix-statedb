import { PaginationProps, TablePaginationConfig } from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import type { Employees } from "~/types/data";
import { AdvancedTable } from "../AdvancedTable";

type EmployeesTableProps = {
  data: any;
  tablePagination: PaginationProps;
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => void;
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    visible: true,
  },
  {
    title: "Age",
    dataIndex: "age",
    visible: true,

    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 3,
    },
  },
  {
    title: "Department",
    dataIndex: "department",
    visible: true,
    sorter: {
      compare: (a, b) => a.department > b.department,
      multiple: 2,
    },
  },
];

const EmployeesTable = (props: EmployeesTableProps) => {
  return (
    <>
      <AdvancedTable
        dataSource={props.data}
        columns={columns}
        tablePagination={props.tablePagination}
        handleTableChange={props.handleTableChange}
      />
    </>
  );
};

export default EmployeesTable;
