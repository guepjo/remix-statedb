import React, { FC } from "react";
import { Button, Divider } from "antd";
import SideMenu from "../components/side-menu";
import TopNavigation from "../components/top-navigation";
import BasicTable from "../components/table";
import AppLayout from "../layout/app-layout";
import { redirect } from "@remix-run/node";

export async function loader({ request }) {
  return redirect("/search");
}

const AppAuthenticated = (): JSX.Element => {
  //const { currentUser, login, logout } = useAuth();

  return (
    <>
      {/* <AppLayout
        topNav={<TopNavigation />}
        sideNav={<SideMenu />}
        content={<BasicTable />}
      /> */}
    </>
  );
};

export default AppAuthenticated;
