import { getEmployees } from "~/models/employee.server";

export type Employees = {
  name: string;
  age: number;
  department: string;
  key: number;
};

export type LoaderData = {
  Employees: Awaited<ReturnType<typeof getEmployees>>;
};
