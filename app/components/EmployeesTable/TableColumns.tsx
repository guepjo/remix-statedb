import { Table } from "antd";
import type { Employees } from "~/types/data";
import type { AdvancedTableColumnType } from "~/components/AdvancedTable/types";

const HOSTNAME_DETAILS_BASE_URL = "/search/host?";

const getUsernameFaultCountHashMap = (faults: Employees[]) => {
  const faultCountHashMap: { [key: string]: number } = {};

  for (const fault of faults) {
    const { name } = fault;

    if (faultCountHashMap[name]) {
      faultCountHashMap[name] += 1;
    } else {
      faultCountHashMap[name] = 1;
    }
  }

  return faultCountHashMap;
};

const UsernameFaultCountTable = ({ faults }: { faults: Employees[] }) => {
  const FAULT_COUNT_TABLE_COLUMNS = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
  ];
  const usernameFaultCountHashMap = getUsernameFaultCountHashMap(faults);
  const arrayOfUsernameFaultCount = Object.entries(
    usernameFaultCountHashMap
  ).map(([key, value]) => ({
    username: key,
    count: value,
  }));

  return (
    <>
      <p style={{ marginBottom: "4px", color: "#fff", fontWeight: "400" }}>
        Faults Created
      </p>
      <Table
        columns={FAULT_COUNT_TABLE_COLUMNS}
        dataSource={arrayOfUsernameFaultCount}
        size="small"
        pagination={false}
        className="UsernameFaultCount"
      />
    </>
  );
};

export type FaultsTableColumn = AdvancedTableColumnType<any>;
export const TABLE_COLUMNS: FaultsTableColumn[] = [
  {
    title: "Name",
    dataIndex: "name",
    visible: true,
    key: "name",
    sorter: true,
  },
  {
    title: "Age",
    dataIndex: "age",
    visible: true,
    key: "age",
    defaultSortOrder: "descend",
    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 3,
    },
  },
  {
    title: "Department",
    dataIndex: "department",
    visible: true,
    key: "dep",
    sorter: true,
  },
];
