type Employees = {
  name: string;
  age: number;
  department: string;
  key: number;
};

export async function getEmployees(): Promise<Array<Employees>> {
  return [
    { name: "Adam", age: 20, department: "Engineering", key: 1 },
    { name: "Ben", age: 40, department: "Engineering", key: 2 },
    { name: "Cal", age: 24, department: "Engineering", key: 3 },
    { name: "Daniela", age: 34, department: "Engineering", key: 4 },
    { name: "Eddie", age: 20, department: "Engineering", key: 5 },
    // I recommend adding about 20 more mock items
  ];
}
