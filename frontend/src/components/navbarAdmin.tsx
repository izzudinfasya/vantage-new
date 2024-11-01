import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { LogoutOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
          {React.createElement(MenuFoldOutlined, {
            style: { fontSize: "18px" },
          })}
        </div>
        <Menu
          mode="horizontal"
          theme="light"
          style={{
            lineHeight: "64px",
            background: "none",
            border: "none",
            flex: 1, // Allow the menu to take available space
            justifyContent: "flex-end", // Align menu items to the right
          }}
        >
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined style={{ color: "red" }} />}
          >
            <Link to="/password" style={{ color: "red" }}>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
