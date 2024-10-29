import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Drawer } from "antd";
import {
  MenuOutlined,
  //   UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo.png";

const { Header } = Layout;

const CustomHeader: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Header
      className={hasScrolled ? "Header scrolled" : "Header"}
      style={{
        backgroundColor: "white",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 999,
        position: "sticky",
        top: 0,
      }}
    >
      {/* Mobile: Menu Icon and Logo */}
      <div
        className="mobile-header"
        style={{
          display: "none",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Menu Icon and Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: "16px" }} />}
            onClick={showDrawer}
            style={{
              color: "black",
              marginRight: "10px",
            }}
          />
        </div>

        <a
          href="/home"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "120px",
              objectFit: "contain",
              maxWidth: "150px",
            }}
          />
        </a>
        {/* Right: Login and Cart Icons */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="link" style={{ color: "black" }}>
            <ShoppingCartOutlined style={{ fontSize: "18px" }} />
          </Button>
          {/* <Button type="link" style={{ color: "black" }}>
            <UserOutlined style={{ fontSize: "18px" }} />
          </Button> */}
        </div>
      </div>

      {/* Left: NEW COLLECTION for desktop view */}
      <div
        className="desktop-menu"
        style={{
          display: "none",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "30px",
        }}
      >
        <a href="/" rel="noopener noreferrer" style={{ color: "black" }}>
          NEW COLLECTION
        </a>
        {/* <a href="/" rel="noopener noreferrer" style={{ color: "black" }}>
          PROMO
        </a> */}
      </div>
      {/* Center: Logo for desktop view */}
      <div
        className="desktop-logo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <a
          href="/"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "150px", objectFit: "contain", maxWidth: "150px" }}
          />
        </a>
      </div>

      {/* Right: Search, Login, Cart for desktop view */}
      <div
        className="desktop-actions"
        style={{
          display: "none",
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Input.Search
          placeholder="Search"
          style={{
            marginRight: "20px",
            width: 170,
            color: "black",
          }}
        />
        <Button type="link" style={{ color: "black" }}>
          <ShoppingCartOutlined style={{ fontSize: "24px" }} />
          <p>CART</p>
        </Button>
        {/* <Button type="link" style={{ color: "black" }}>
          <UserOutlined style={{ fontSize: "24px" }} />
          <p>LOGIN</p>
        </Button> */}
      </div>

      {/* Drawer for mobile screens */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={hideDrawer}
        open={drawerVisible}
        className="mobile-menu"
      >
        <Input.Search
          placeholder="Search"
          style={{ marginBottom: "20px", width: "100%", color: "black" }}
        />
        <a href="/" rel="noopener noreferrer">
          <div
            style={{
              color: "black",
              fontSize: "16px",
              fontWeight: 450,
            }}
          >
            NEW COLLECTION
          </div>
        </a>
        <a href="/" rel="noopener noreferrer">
          <div
            style={{
              color: "black",
              fontSize: "16px",
              fontWeight: 450,
            }}
          >
            PROMO
          </div>
        </a>
      </Drawer>

      <style>
        {`
        .Header.scrolled {
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .desktop-new-collection {
            display: none !important; 
          }
          .desktop-logo {
            display: none !important;
          }
          .desktop-actions {
            display: none !important;  
          }
          .mobile-header {
            display: flex !important;
          }
        }

        @media (min-width: 769px) {
        .desktop-menu {
            display: flex !important; 
        }
        .desktop-logo {
            display: flex !important; 
        }
        .desktop-actions {
            display: flex !important; 
        }
        .mobile-header {
            display: none !important;
        }
        }

      `}
      </style>
    </Header>
  );
};

export default CustomHeader;
