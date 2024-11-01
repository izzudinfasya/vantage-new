import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import logoBig from "../assets/logo.png"; // Import your regular logo
import logoSmall from "../assets/logo-email.png";
import "../components/sidebarAdmin.css";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean; // Prop definition
  onClose: () => void; // New prop for closing the drawer
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onClose }) => {
  const logo = collapsed ? logoSmall : logoBig;

  return (
    <Sider
      width={collapsed ? 80 : 200} // Width changes based on collapsed state
      collapsed={collapsed}
      style={{
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img
          src={logo} // Update with your logo path
          alt="Logo"
          style={{
            width: collapsed ? "40px" : "100%", // Logo size changes based on collapsed state
            opacity: collapsed ? 0.7 : 1, // Adjust opacity for added effect
          }}
        />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100vh !important", borderRight: 0, padding: "10px" }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/admin" onClick={onClose}>
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
          <Link to="/admin/product" onClick={onClose}>
            Manage Stock
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
          <Link to="/admin" onClick={onClose}>
            Orders
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileDoneOutlined />}>
          <Link to="/admin" onClick={onClose}>
            Reports
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
