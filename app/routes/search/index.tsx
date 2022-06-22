import React, { FC } from "react";
import { Button, Divider } from "antd";
import SideNavigation from "~/components/SideNavigation/SideNavigation";
import TopNavigation from "~/components/TopNavigation/TopNavigation";
import FaultSearchPage from "~/pages/FaultSearchPage/FaultSearchPage";
import AppLayout from "~/layout/AppLayout";
import { json, redirect } from "@remix-run/node";
import { getEmployees } from "~/models/employee.server";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
  Employees: Awaited<ReturnType<typeof getEmployees>>;
};

export async function loader({ request }) {
  return json<LoaderData>({ Employees: await getEmployees() });
}

const Search = (): JSX.Element => {
  //const { currentUser, login, logout } = useAuth();
  const { Employees } = useLoaderData<LoaderData>();
  //console.log(Employees);

  return (
    <>
      <AppLayout
        topNav={<TopNavigation />}
        sideNav={<SideNavigation />}
        content={<FaultSearchPage pageData={Employees} key="faultpage" />}
      />
    </>
  );
};

export default Search;
