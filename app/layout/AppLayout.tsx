import React from "react";
import { Layout } from "antd";

type AppLayoutProps = {
  topNav: React.ReactNode;
  sideNav: React.ReactNode;
  content: React.ReactNode;
};

const AppLayout = ({ topNav, sideNav, content }: AppLayoutProps) => {
  return (
    <>
      {topNav}
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          {sideNav}
          <Layout.Content style={{ margin: "0 16px" }}>
            {content}
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
