import React, { FC } from "react";
import SideMenu from "~/components/SideNavigation/SideNavigation";
import TopNavigation from "~/components/TopNavigation/TopNavigation";
import FaultSearch from "~/pages/FaultSearch";
import { FaultSearchPage } from "~/pages/FaultSearchPage";
import AppLayout from "~/layout/app-layout";
import { json, redirect } from "@remix-run/node";
import { getEmployees } from "~/models/employee.server";
import { useLoaderData } from "@remix-run/react";
import useAuth from "context";

type LoaderData = {
  Employees: Awaited<ReturnType<typeof getEmployees>>;
};

export async function loader({ request }) {
  return json<LoaderData>({ Employees: await getEmployees() });
}

const Search = (): JSX.Element => {
  //const { currentUser, login, logout } = useAuth();
  const { Employees } = useLoaderData<LoaderData>();
  console.log(Employees);
  //const { currentUser } = useAuth();

  return (
    <>
      <AppLayout
        topNav={<TopNavigation />}
        sideNav={<SideMenu />}
        content={<FaultSearchPage />}
      />
    </>
  );
};

export default Search;
