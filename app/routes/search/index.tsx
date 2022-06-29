import React from "react";
import SideNavigation from "~/components/SideNavigation/SideNavigation";
import TopNavigation from "~/components/TopNavigation/TopNavigation";
import FaultSearchPage from "~/pages/FaultSearchPage/FaultSearchPage";
import AppLayout from "~/layout/AppLayout";
import { json, redirect } from "@remix-run/node";
import { getEmployees } from "~/models/employee.server";
import { useLoaderData } from "@remix-run/react";
import { useGetFaultsQueryParams } from "~/hooks/useGetFaultsQueryParams";
import { Employees, LoaderData } from "~/types/data";
import { searchFilter } from "~/utils/searchFilter";

export async function loader({ request }) {
  const data = await getEmployees();

  const filteredData = searchFilter(data, request);

  return json<LoaderData>({ Employees: filteredData });
}

const Search = (): JSX.Element => {
  return (
    <>
      <AppLayout
        topNav={<TopNavigation />}
        sideNav={<SideNavigation />}
        content={<FaultSearchPage />}
      />
    </>
  );
};

export default Search;
