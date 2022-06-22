import type { Employees } from "~/types/data";
import { AdvancedTable } from "../AdvancedTable";

type EmployeesTableProps = {
  data: any;
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
    // sorter: {
    //   compare: (a, b) => a.math - b.math,
    //   multiple: 2,
    // },
  },
  //   {
  //     title: "Location",
  //     dataIndex: "location",
  //     // sorter: {
  //     //   compare: (a, b) => a.english - b.english,
  //     //   multiple: 1,
  //     // },
  //   },
];

const EmployeesTable = (props: EmployeesTableProps) => {
  return (
    <>
      <AdvancedTable dataSource={props.data} columns={columns} />
    </>
  );
};

export default EmployeesTable;
