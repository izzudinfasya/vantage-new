import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  FileDoneOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import logoBig from "../../assets/logo.png";
import logoSmall from "../../assets/logo-email.png";
import "../admin/sidebarAdmin.css";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const logo = collapsed ? logoSmall : logoBig;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation(); // Get current location

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Render sidebar only if not in mobile view
  if (isMobile) return null;

  // Dynamically set the selected key based on the current path
  const getSelectedKey = () => {
    if (location.pathname.includes("/admin/product")) return "2";
    if (location.pathname.includes("/admin/waiting-list")) return "3";
    if (location.pathname.includes("/admin/none")) return "4";
    if (location.pathname.includes("/admin/*")) return "5";
    return "1"; // Default to Dashboard
  };

  return (
    <Sider
      width={collapsed ? 80 : 200}
      collapsed={collapsed}
      style={{
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: collapsed ? "40px" : "100%",
          }}
        />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]} // Set selected key dynamically
        style={{ height: "100vh", borderRight: 0, padding: "10px" }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/admin">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
          <Link to="/admin/product">Manage Product</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserAddOutlined />}>
          <Link to="/admin/waiting-list">Waiting List</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
          <Link to="/admin/none">Orders</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FileDoneOutlined />}>
          <Link to="/admin/*">Reports</Link>{" "}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
