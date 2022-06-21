import React, { FC } from "react";
import { Button, Divider } from "antd";
import SideMenu from "~/components/side-menu";
import TopNavigation from "~/components/top-navigation";
import FaultSearchPage from "~/components/fault-search";
import AppLayout from "~/layout/app-layout";
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
  console.log(Employees);

  return (
    <>
      <AppLayout
        topNav={<TopNavigation />}
        sideNav={<SideMenu />}
        content={<FaultSearchPage pageData={Employees} key="faultpage" />}
      />
    </>
  );
};

export default Search;
