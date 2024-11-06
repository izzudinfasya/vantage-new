import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Drawer,
  Row,
  Col,
  Typography,
  Divider,
  Badge,
} from "antd";
import { Link } from "react-router-dom";
import {
  MenuOutlined,
  //   UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
// import logo from "../assets/logo.png";
import emptyCart from "../../assets/empty-cart.png";
import { useCart } from "components/cartContext";
import vantageLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

interface CustomHeaderProps {
  onLogout: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ onLogout }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const showCartDrawer = () => setCartDrawerVisible(true);
  const hideCartDrawer = () => setCartDrawerVisible(false);

  useEffect(() => {
    if (cartDrawerVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cartDrawerVisible]);

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

  const { cartItems, removeItem, editItem } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.discountPrice * item.quantity; // Calculate subtotal based on discount price and quantity
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal(); // You can add additional charges here if needed
  };

  const totalPrice = calculateTotal();

  const navigate = useNavigate();

  const handleProcessOrder = () => {
    if (cartItems && cartItems.length > 0) {
      const orderData = cartItems.map((productData) => ({
        id: productData.id,
        title: productData.title,
        images: [productData.images[productData.images.length - 1]], // Ambil gambar dengan indeks terbesar
        qty: productData.quantity,
        originalPrice: productData.originalPrice,
        discountPrice: productData.discountPrice,
        discount: productData.originalPrice - productData.discountPrice,
        selectedSize: productData.selectedSize,
      }));

      navigate(`/checkout`, {
        state: {
          product: orderData, // Mengirimkan array orderData
        },
      });
      hideCartDrawer();
    } else {
      console.error("Cart is empty or not initialized.");
    }
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
            src={vantageLogo}
            alt="Avatar"
            style={{
              width: "120px",
              height: "30px",
            }}
          />
        </a>
        {/* Right: Login and Cart Icons */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge
            count={
              cartItems.length > 0
                ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
                : 0
            }
            style={{
              backgroundColor: cartItems.length > 0 ? "red" : "transparent",
              fontSize: "8px",
              height: "15px",
              minWidth: "15px",
              lineHeight: "15px",
            }}
            offset={[-15, 10]}
          >
            <Button
              onClick={showCartDrawer}
              type="link"
              style={{ color: "black" }}
            >
              <ShoppingCartOutlined style={{ fontSize: "18px" }} />
            </Button>
          </Badge>
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
        {/* <a href="/" rel="noopener noreferrer" style={{ color: "black" }}>
          NEW COLLECTION
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
          href="/home"
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
            src={vantageLogo}
            alt="Avatar"
            style={{
              width: "150px",
              height: "40px",
            }}
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
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "30px", // Adjust gap as needed
            lineHeight: "64px",
            background: "none",
          }}
        >
          <Col style={{ display: "flex", alignItems: "center" }}>
            <Badge
              count={
                cartItems.length > 0
                  ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
                  : 0
              }
              style={{
                backgroundColor: cartItems.length > 0 ? "red" : "transparent", // Changed to red for visibility
                fontSize: "8px",
                height: "15px",
                minWidth: "15px",
                lineHeight: "15px",
              }}
              offset={[-40, 0]}
            >
              <div
                onClick={showCartDrawer}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                <ShoppingCartOutlined
                  style={{
                    color: "black",
                    marginRight: "8px",
                    fontSize: "18px",
                  }}
                />
                Cart
              </div>
            </Badge>
          </Col>

          <Col style={{ display: "flex", alignItems: "center" }}>
            <Link
              to="#"
              onClick={onLogout}
              style={{
                display: "flex",
                alignItems: "center",
                color: "red",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              <LogoutOutlined style={{ color: "red", marginRight: "8px" }} />
              Logout
            </Link>
          </Col>
        </Row>
      </div>

      <Drawer
        closable={false}
        placement="right"
        onClose={hideCartDrawer}
        open={cartDrawerVisible}
        width={400}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Cart ({cartItems.length})
            </span>
            <Button
              onClick={hideCartDrawer}
              style={{ border: "none", background: "transparent" }}
            >
              ✕
            </Button>
          </div>
        }
        bodyStyle={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {cartItems.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "75vh",
                padding: "20px",
              }}
            >
              <img
                src={emptyCart}
                alt="empty cart"
                style={{ height: "150px", marginBottom: "10px" }}
              />
              <Text strong style={{ fontSize: "18px" }}>
                Empty Cart
              </Text>
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                Your cart is still empty. Explore the various interesting
                products we have prepared for you.
              </p>
              <Link to="/home">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                    marginTop: "20px",
                    transition: "background-color 0.3s, border-color 0.3s",
                    height: "50px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "gray";
                    e.currentTarget.style.borderColor = "gray";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "black";
                    e.currentTarget.style.borderColor = "black";
                  }}
                  onClick={() => {
                    hideCartDrawer();
                  }}
                >
                  <b>CONTINUE SHOPPING</b>
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Notification Section */}
              <div
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {totalPrice < 200000 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <WarningOutlined
                        style={{
                          color: "#4a90f1",
                          fontSize: "30px",
                          marginRight: "20px", // Margin to the right of the icon
                        }}
                      />
                      <div>
                        <Text
                          style={{
                            fontSize: "13px",
                            color: "black",
                            display: "block",
                            fontWeight: "400",
                          }}
                        >
                          You need to spend more than IDR{" "}
                          {(200000 - totalPrice).toLocaleString("id-ID")} to get
                        </Text>
                        <Text
                          style={{
                            color: "#4a90f1",
                            fontWeight: "bold",
                            display: "block",
                            fontSize: "16px",
                          }}
                        >
                          FREE STANDARD SHIPPING
                        </Text>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <CheckCircleOutlined
                        style={{
                          color: "#00b27d",
                          fontSize: "30px",
                          marginRight: "20px",
                        }}
                      />
                      <div>
                        <Text
                          style={{
                            color: "#00b27d",
                            fontWeight: "bold",
                            display: "block",
                          }}
                        >
                          FREE STANDARD SHIPPING!
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "400",
                            display: "block",
                          }}
                        >
                          You get free standard shipping to your home.
                        </Text>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <Divider style={{ marginBottom: 20, marginTop: 0 }} />
              {cartItems.map((item: any, index: any) => (
                <React.Fragment key={item.id}>
                  <Row
                    gutter={16}
                    align="middle"
                    style={{ padding: "10px", marginBottom: "10px" }}
                  >
                    <Col span={8}>
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[3]
                            : "fallback_image_url"
                        }
                        alt={item.title}
                        style={{
                          width: "100px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </Col>
                    <Col span={10}>
                      <Text strong style={{ fontSize: "16px" }}>
                        {item.title}
                      </Text>
                      <div
                        style={{
                          marginTop: "5px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Text style={{ fontSize: "14px", color: "#888" }}>
                          {item.selectedSize}
                        </Text>
                        <Text style={{ fontSize: "14px", color: "#888" }}>
                          {item.quantity}x
                        </Text>
                        <Text style={{ fontSize: "14px", color: "#888" }}>
                          IDR {item.discountPrice}
                        </Text>
                      </div>
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                      <Row justify="end" align="middle">
                        <Col>
                          <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => editItem(item.id)}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          />
                        </Col>
                        <Divider
                          type="vertical"
                          style={{ backgroundColor: "#d9d9d9" }}
                        />
                        <Col>
                          <Button
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={() =>
                              removeItem(item.id, item.selectedSize)
                            }
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              <Divider />
            </>
          )}
        </div>
        {/* Section for Total only if below 200.000 */}
        {cartItems.length > 0 && (
          <>
            {totalPrice < 200000 ? (
              <Row style={{ padding: "5px" }}>
                <Col span={12}>
                  <Text strong style={{ fontSize: "18px" }}>
                    Total:
                  </Text>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Text strong style={{ fontSize: "18px" }}>
                    IDR {totalPrice.toLocaleString("id-ID")}
                  </Text>
                </Col>
              </Row>
            ) : (
              <>
                <Row style={{ padding: "5px" }}>
                  <Col span={12}>
                    <Text>Subtotal:</Text>
                  </Col>
                  <Col
                    span={12}
                    style={{ textAlign: "right", fontWeight: "500" }}
                  >
                    <Text>IDR {totalPrice.toLocaleString("id-ID")}</Text>
                  </Col>
                </Row>
                <Row style={{ padding: "5px" }}>
                  <Col span={12}>
                    <Text>Shipping Fee:</Text>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Text strong style={{ color: "#00b27d" }}>
                      FREE
                    </Text>
                  </Col>
                </Row>
                <Divider style={{ margin: "5px 0" }} />
                <Row style={{ padding: "5px" }}>
                  <Col span={12}>
                    <Text strong style={{ fontSize: "18px" }}>
                      Total:
                    </Text>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Text strong style={{ fontSize: "18px" }}>
                      IDR {totalPrice.toLocaleString("id-ID")}
                    </Text>
                  </Col>
                </Row>
              </>
            )}
            <Button
              type="primary"
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: isHovered ? "#32b89e" : "#00b27d",
                borderColor: isHovered ? "#32b89e" : "#00b27d",
                borderRadius: "6px",
                transition: "background-color 0.3s, border-color 0.3s",
                marginTop: "5px",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleProcessOrder}
            >
              <b>PROCESS ORDER</b>
            </Button>
          </>
        )}
      </Drawer>

      {/* Drawer for mobile screens */}
      <Drawer
        closable={false}
        placement="left"
        width={400}
        open={drawerVisible}
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              onClick={hideDrawer}
              style={{
                cursor: "pointer",
                fontSize: "16px",
                color: "black",
                marginRight: "12px",
              }}
            >
              ✕
            </span>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              VANTAGE
            </span>
          </div>
        }
      >
        <Link
          to="#"
          onClick={onLogout}
          style={{ color: "red", fontSize: "18px" }}
        >
          Logout
        </Link>
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
