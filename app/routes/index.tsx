import React, { FC } from "react";
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
