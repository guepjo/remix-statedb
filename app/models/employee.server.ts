import { Employees } from "~/types/data";

export async function getEmployees(): Promise<Array<Employees>> {
  return [
    { name: "Adams", age: 20, department: "Engineering", key: 1 },
    { name: "Ben", age: 40, department: "Engineering", key: 2 },
    { name: "Cal", age: 24, department: "Engineering", key: 3 },
    { name: "Daniela", age: 34, department: "Engineering", key: 4 },
    { name: "Eddie", age: 20, department: "Engineering", key: 5 },
    { name: "Jones", age: 20, department: "Sales", key: 6 },
    { name: "Kamala", age: 50, department: "Legal", key: 7 },
    { name: "Bryan", age: 21, department: "Finance", key: 8 },
    { name: "Chibueze", age: 31, department: "Engineering", key: 9 },
    { name: "Mark", age: 25, department: "Sales", key: 10 },
    { name: "Sanders", age: 22, department: "Engineering", key: 11 },
    { name: "Amugina", age: 28, department: "Engineering", key: 12 },
    { name: "Charles", age: 27, department: "Legal", key: 13 },
    { name: "Francois", age: 24, department: "Engineering", key: 14 },
    { name: "Jean", age: 20, department: "Finance", key: 15 },
    { name: "Kruger", age: 23, department: "Engineering", key: 16 },
    { name: "Johnathan", age: 43, department: "Finance", key: 17 },
    { name: "Alberta", age: 45, department: "Engineering", key: 18 },
    { name: "Mary", age: 22, department: "Marketing", key: 19 },
    { name: "Alissa", age: 21, department: "Marketing", key: 20 },
    // I recommend adding about 20 more mock items
  ];
}
