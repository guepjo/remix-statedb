import { Layout, Menu } from "antd";
import Profile from "../UserProfile/profile";
import React from "react";
import { LDAPUser } from "~/types";

type TopNavigationProps = {
  user?: LDAPUser;
};

const { Header } = Layout;

const TopNavigation = (props: TopNavigationProps) => (
  <nav
    className="TopNavigation"
    data-testid="TopNavigation"
    style={{
      display: "flex",
      alignItems: "center",
      padding: "8px 16px",
    }}
  >
    header
    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
      <Profile />
    </div>
  </nav>
);

export default TopNavigation;
