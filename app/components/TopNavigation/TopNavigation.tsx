import { Layout, Menu } from "antd";
import React from "react";

const { Header } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const TopNavigation = () => (
  <nav
    className="TopNavigation"
    data-testid="TopNavigation"
    style={{
      display: "flex",
      alignItems: "center",
      padding: "8px 16px",
    }}
  >
    Top Navigation
  </nav>
);

export default TopNavigation;
