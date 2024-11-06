import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  collapsed: boolean; // Prop definition
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const logo = collapsed ? logoSmall : logoBig;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
          }}
        />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
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
          <Link to="/admin/none">Reports</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
