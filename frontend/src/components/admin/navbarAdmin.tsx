import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer } from "antd";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

interface NavbarProps {
  collapsed: boolean; // Menambahkan prop untuk status sidebar
  toggleSidebar: () => void; // Fungsi untuk toggle sidebar
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, toggleSidebar }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
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

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Header style={{ background: "#fff", padding: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div
            onClick={isMobile ? showDrawer : toggleSidebar}
            style={{ cursor: "pointer" }}
          >
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
              flex: 1,
              justifyContent: "flex-end",
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

      {/* Drawer untuk Mobile */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
        width="90%"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100vh",
            borderRight: 0,
            padding: "10px",
            fontSize: "18px",
          }}
        >
          <Menu.Item
            key="1"
            icon={<HomeOutlined style={{ fontSize: "18px" }} />}
            style={{ padding: "25px 20px" }}
          >
            <Link to="/admin" style={{ marginLeft: "10px" }}>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<AppstoreAddOutlined style={{ fontSize: "18px" }} />}
            style={{ padding: "25px 20px" }}
          >
            <Link to="/admin/product" style={{ marginLeft: "10px" }}>
              Manage Stock
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<ShoppingCartOutlined style={{ fontSize: "18px" }} />}
            style={{ padding: "25px 20px" }}
          >
            <Link to="/admin" style={{ marginLeft: "10px" }}>
              Orders
            </Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<FileDoneOutlined style={{ fontSize: "18px" }} />}
            style={{ padding: "25px 20px" }}
          >
            <Link to="/admin" style={{ marginLeft: "10px" }}>
              Reports
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>

      <style>
        {`
      .ant-drawer .ant-drawer-body {
        padding: 15px !important;
      }
      `}
      </style>
    </>
  );
};

export default Navbar;
