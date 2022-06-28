import React, { FC } from "react";
import { Button, Divider } from "antd";
import SideNavigation from "~/components/SideNavigation/SideNavigation";
import TopNavigation from "~/components/TopNavigation/TopNavigation";
import FaultSearchPage from "~/pages/FaultSearchPage/FaultSearchPage";
import AppLayout from "~/layout/AppLayout";
import { json, redirect } from "@remix-run/node";
import { getEmployees } from "~/models/employee.server";
import { useLoaderData } from "@remix-run/react";
import { TABLE_COLUMNS } from "~/components/EmployeesTable/TableColumns";
import { useGetFaults } from "~/hooks/useGetFaults";
import { useGetFaultsQueryParams } from "~/hooks/useGetFaultsQueryParams";
import { Employees, LoaderData } from "~/types/data";

export async function loader({ request }) {
  const data = await getEmployees();

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
            ? search.get("name").toString().toLowerCase()
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

  return json<LoaderData>({ Employees: searchedTotal });
}

const Search = (): JSX.Element => {
  //const { currentUser, login, logout } = useAuth();
  const [faultsQueryParams, setSearchParams] = useGetFaultsQueryParams();

  const { Employees } = useLoaderData<LoaderData>();
  const getFaultsInfo = useGetFaults({ ...faultsQueryParams }, true, Employees);
  const tableData = getFaultsInfo;
  //console.log(Employees);

  return (
    <>
      <AppLayout
        topNav={<TopNavigation />}
        sideNav={<SideNavigation />}
        content={
          <FaultSearchPage
            pageData={tableData}
            key="faultpage"
            columns={TABLE_COLUMNS}
          />
        }
      />
    </>
  );
};

export default Search;
