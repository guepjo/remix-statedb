import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HddOutlined,
  QuestionCircleOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { Link } from "@remix-run/react";
import { Layout, Menu } from "antd";
import React from "react";
const { Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

export const SideNavigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Sider
      width={60}
      className="site-layout-background"
      collapsible
      collapsed={isSidebarOpen}
      onCollapse={toggleSidebar}
      collapsedWidth={64}
    >
      <div
        data-testid="side-navbar"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <Menu mode="inline">
          <Menu.Item key="1" icon={<HddOutlined style={{ fontSize: 20 }} />}>
            <Link to="search">Hardware Faults</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<RobotOutlined style={{ fontSize: 20 }} />}>
            <Link to="search/host">Faults Per Host</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default SideNavigation;
