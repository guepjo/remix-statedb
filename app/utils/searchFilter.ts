import { Employees } from "~/types/data";

export const searchFilter = (data: Employees[], request: any) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const filtern: Employees[] = [];
  const filtera: Employees[] = [];
  const filterd: Employees[] = [];
  data.forEach((d) => {
    if (
      d.name
        .toLowerCase()
        .includes(
          search.get("name")
            ? search.get("name").toLowerCase()
            : d.name.toLowerCase()
        )
    ) {
      filtern.push(d);
    }
  });
  data.forEach((d) => {
    if (
      d.age
        .toString()
        .toLowerCase()
        .includes(
          search.get("age")
            ? search.get("age").toString().toLowerCase()
            : d.age.toString().toLowerCase()
        )
    ) {
      filtera.push(d);
    }
  });
  data.forEach((d) => {
    if (
      d.department
        .toLowerCase()
        .includes(
          search.get("department")
            ? search.get("department").toString().toLowerCase()
            : d.department.toLowerCase()
        )
    ) {
      filterd.push(d);
    }
  });

  const searchedTotal: Employees[] = [];
  data.forEach((d) => {
    if (filtern.includes(d) && filtera.includes(d) && filterd.includes(d)) {
      searchedTotal.push(d);
    }
  });

  return searchedTotal;
};
