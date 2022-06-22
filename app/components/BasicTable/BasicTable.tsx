import { Table } from "antd";

type BasicTableProps = {
  data: any;
  key: string;
};
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    // sorter: {
    //   compare: (a, b) => a.createdBy - b.createdBy,
    //   multiple: 3,
    // },
  },
  {
    title: "Department",
    dataIndex: "department",
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

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const BasicTable = (prop: BasicTableProps) => {
  //console.log("basic table", prop.data);

  return <Table columns={columns} dataSource={prop.data} onChange={onChange} />;
};

export default BasicTable;
