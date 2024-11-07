import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Form,
  Input,
  Modal,
  message,
} from "antd";

const { Title, Text } = Typography;
// const { Option } = Select;

const CheckoutPage = () => {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const product = location.state?.product; // This should be an array or a single object
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shippingForm] = Form.useForm();
  // State for shipping information
  const [shippingInfo, setShippingInfo] = useState({
    name: null,
    phone: null,
    address: null,
    province: null,
    city: null,
    district: null,
    subDistrict: null,
    zipPostal: null,
  });
  const isProductArray = Array.isArray(product);

  const calculateTotal = () => {
    if (product && product.length > 0) {
      const subtotal = product.reduce((total: any, item: any) => {
        const itemTotal = item.discountPrice * item.qty;
        return total + itemTotal;
      }, 0);

      const updatedDeliveryCharge = subtotal > 200000 ? 0 : 25000;

      const total = subtotal + updatedDeliveryCharge;

      return {
        total: total.toLocaleString("id-ID"),
        deliveryCharge: updatedDeliveryCharge,
      };
    }
    return { total: "0", deliveryCharge: 0 };
  };

  const { total, deliveryCharge } = calculateTotal();

  useEffect(() => {
    const savedShippingInfo = sessionStorage.getItem("shippingInfo");

    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    }
  }, []);

  const showModal = () => {
    if (shippingInfo.name && shippingInfo.phone && shippingInfo.address) {
      shippingForm.setFieldsValue({
        name: shippingInfo.name,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        province: shippingInfo.province,
        city: shippingInfo.city,
        district: shippingInfo.district,
        subDistrict: shippingInfo.subDistrict,
        zipPostal: shippingInfo.zipPostal,
      });
    } else {
      shippingForm.resetFields();
    }

    setIsModalVisible(true);
  };

  const handleOk = () => {
    shippingForm
      .validateFields()
      .then((values) => {
        const uppercasedValues = Object.keys(values).reduce((acc, key) => {
          const value = values[key as keyof typeof values];

          if (typeof value === "string") {
            acc[key as keyof typeof values] = value.toUpperCase();
          } else {
            acc[key as keyof typeof values] = value;
          }

          return acc;
        }, {} as typeof values);

        setShippingInfo(uppercasedValues);
        sessionStorage.setItem(
          "shippingInfo",
          JSON.stringify(uppercasedValues)
        );
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const script = document.createElement("script");

    // Tentukan URL dan client key sesuai environment
    const isProduction = process.env.REACT_APP_ENV === "production";

    const clientKey = isProduction
      ? process.env.REACT_APP_CLIENT_KEY
      : process.env.REACT_APP_CLIENT_KEY;

    if (clientKey) {
      script.src = isProduction
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-client-key", clientKey);
      document.body.appendChild(script);
    } else {
      console.error(
        "Client Key is missing. Please set the key in your environment variables."
      );
    }

    // Hapus script saat komponen unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleConfirmOrder = async () => {
    const fullAddress = `${shippingInfo.address}, ${shippingInfo.subDistrict}, ${shippingInfo.district}, ${shippingInfo.city}, ${shippingInfo.province} (${shippingInfo.zipPostal})`;

    if (!fullAddress) {
      message.error("Please fill in your address before confirming the order.");
      return;
    }

    const orderItems = product.map((item: any) => ({
      id: item.id,
      title: item.title,
      selectedSize: item.selectedSize,
      price: item.discountPrice,
      qty: Number(item.qty),
    }));

    const totalAmount = Number(total.replace(/[^\d]/g, ""));
    const deliveryCharge = 25000;

    const orderData = {
      name: shippingInfo.name,
      phone: shippingInfo.phone,
      address: fullAddress,
      items: orderItems,
      deliveryCharge: deliveryCharge,
      totalAmount: totalAmount,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/create-transaction`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.token) {
        // Pastikan snap sudah tersedia di window object
        if (window.snap) {
          window.snap.pay(data.token, {
            onSuccess: function (result: any) {
              console.log("Success:", result);
              message.success("Payment Successful!");
            },
            onPending: function (result: any) {
              console.log("Pending:", result);
              message.warning("Payment Pending.");
            },
            onError: function (result: any) {
              console.log("Error:", result);
              message.error("Payment Failed.");
            },
            onClose: function () {
              console.log("Payment Modal Closed");
              message.info("Payment process closed.");
            },
          });
        } else {
          message.error("Snap.js is not loaded properly.");
        }
      } else {
        message.error(
          "There was an issue creating the order. Please try again."
        );
      }
    } catch (error) {
      console.error("Error creating Midtrans transaction:", error);
      message.error("An error occurred while confirming the order.");
    }
  };

  return (
    <div style={{ padding: "30px 0" }}>
      <Row justify="center" gutter={[16, 16]} style={{ padding: 0, margin: 0 }}>
        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
          <Title level={3} style={{ marginBottom: "30px" }}>
            <b>Checkout</b>
          </Title>
        </Col>
      </Row>
      <Row
        justify="center"
        gutter={[24, 24]}
        style={{ padding: 0, margin: 0, gap: "20px" }}
      >
        <Col
          xs={20}
          sm={20}
          md={20}
          lg={12}
          xl={12}
          style={{ padding: 0, margin: 0 }}
        >
          <Card title={<Title level={4}>Shipping Information</Title>} bordered>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                {shippingInfo.name ? (
                  <>
                    <Text strong>{shippingInfo.name}</Text>{" "}
                    <Divider
                      type="vertical"
                      style={{ backgroundColor: "#d9d9d9" }}
                    />
                    <Text>{shippingInfo.phone}</Text>
                    <br />
                    <Text style={{ fontSize: "12px" }}>
                      {shippingInfo.address}, {shippingInfo.subDistrict},{" "}
                      {shippingInfo.district}, {shippingInfo.city},{" "}
                      {shippingInfo.province}, ({shippingInfo.zipPostal})
                    </Text>
                    <br />
                  </>
                ) : (
                  <Text>No Shipping Information</Text>
                )}
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Button
                  type="link"
                  onClick={showModal}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    color: "black",
                    backgroundColor: hovered ? "#d9d9d9" : "#f0f0f0",
                    border: "none",
                    transition: "background-color 0.3s",
                  }}
                >
                  {shippingInfo.name ? "Change" : "Add"}
                </Button>
              </Col>
            </Row>
          </Card>

          <Modal
            title="Shipping Information"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Save"
            cancelText="Cancel"
            okButtonProps={{
              style: {
                backgroundColor: hovered ? "#808080" : "#000000",
                color: "#FFFFFF",
                border: "2px solid #FFFFFF",
              },
              onMouseEnter: () => setHovered(true),
              onMouseLeave: () => setHovered(false),
            }}
            cancelButtonProps={{
              style: {
                borderColor: "#000000",
                color: "#000000",
              },
              onMouseEnter: (e) => {
                const target = e.target as HTMLElement;
                target.style.borderColor = "#808080";
              },
              onMouseLeave: (e) => {
                const target = e.target as HTMLElement;
                target.style.borderColor = "#000000";
              },
            }}
            style={{ maxWidth: "80%" }}
            styles={{
              body: {
                maxHeight: "60vh",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
              },
            }}
          >
            <Form
              form={shippingForm}
              name="shippingAddress"
              initialValues={shippingInfo}
              style={{ padding: "10px 0" }}
              layout="vertical"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  style={{ height: "45px", fontSize: "16px", padding: "10px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#808080";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d9d9d9";
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  style={{ height: "45px", fontSize: "16px", padding: "10px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#808080";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d9d9d9";
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Province"
                name="province"
                rules={[
                  { required: true, message: "Please input your province!" },
                ]}
              >
                <Input
                  style={{ height: "45px", fontSize: "16px", padding: "10px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#808080";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d9d9d9";
                  }}
                />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <Input
                  style={{ height: "45px", fontSize: "16px", padding: "10px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#808080";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d9d9d9";
                  }}
                />
              </Form.Item>

              <Form.Item
                label="District"
                name="district"
                rules={[
                  { required: true, message: "Please input your district!" },
                ]}
              >
                <Input
                  style={{ height: "45px", fontSize: "16px", padding: "10px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#808080";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d9d9d9";
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Sub District"
                name="subDistrict"
                rules={[
                  {
                    required: true,
                    message: "Please input your sub district!",
                  },
                ]}
              >
                <Input
                  style={{ height: "45px", fontSize: "16px", padding: "10px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#808080";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d9d9d9";
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Zip Postal"
                name="zipPostal"
                rules={[
                  { required: true, message: "Please input your zip postal!" },
                ]}
              >
                <Input
                  style={{ height: "45px", fontSize: "16px", padding: "10px" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#808080";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d9d9d9";
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Street name, building, house number"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input.TextArea
                  style={{ height: "80px", fontSize: "16px", padding: "10px" }}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#808080";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d9d9d9";
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
        <Col
          xs={20}
          sm={20}
          md={20}
          lg={8}
          xl={8}
          style={{ padding: 0, margin: 0 }}
        >
          <Card title={<Title level={4}>Your Order</Title>} bordered>
            <Row gutter={[16, 16]}>
              {isProductArray && product.length > 0
                ? product.map((item, index) => (
                    <React.Fragment key={index}>
                      <Col span={24}>
                        <Row gutter={[16, 16]} align="middle">
                          <Col span={8}>
                            {item.images && item.images.length > 0 ? (
                              <div
                                className="image-title"
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  width: "330px",
                                }}
                              >
                                <div style={{ display: "flex", gap: "2px" }}>
                                  {item.images.map((image: any, index: any) => (
                                    <div
                                      key={index}
                                      style={{
                                        width: "80px",
                                        height: "100px",
                                        overflow: "hidden",
                                        borderRadius: "4px",
                                        border: "1px solid #d9d9d9",
                                      }}
                                    >
                                      <img
                                        src={image}
                                        alt={item.title}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                                <div style={{ marginLeft: "8px" }}>
                                  {" "}
                                  {/* Margin for spacing between images and text */}
                                  <Text strong>{item.title}</Text>
                                  <div style={{ marginTop: "4px" }}>
                                    {" "}
                                    {/* Smaller margin for size and price */}
                                    <span>Size: </span>
                                    {item.selectedSize}
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "4px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span>Price:&nbsp;</span>{" "}
                                    {/* Menambahkan spasi setelah "Price:" */}
                                    {item.discountPrice &&
                                      item.discountPrice > 0 && (
                                        <span
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          IDR{" "}
                                          {item.discountPrice.toLocaleString(
                                            "id-ID"
                                          )}
                                        </span>
                                      )}
                                    {item.originalPrice && (
                                      <span
                                        style={{
                                          textDecoration: "line-through",
                                          fontSize: "12px",
                                          color: "#999",
                                          marginLeft: item.discountPrice
                                            ? "6px"
                                            : "0",
                                        }}
                                      >
                                        IDR{" "}
                                        {item.originalPrice.toLocaleString(
                                          "id-ID"
                                        )}
                                      </span>
                                    )}
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#999",
                                        marginLeft: "6px",
                                      }}
                                    >
                                      {" "}
                                      x{item.qty}pcs
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "64px",
                                  height: "64px",
                                  borderRadius: "4px",
                                  border: "1px solid #d9d9d9",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "#f0f0f0",
                                }}
                              >
                                <Text>No Images Available</Text>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </React.Fragment>
                  ))
                : null}

              <Divider style={{ margin: "8px 0" }} />
              {deliveryCharge > 0 ? (
                <>
                  <Col span={12}>
                    <Text>Shipping Fee</Text>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Text>IDR {deliveryCharge.toLocaleString("id-ID")}</Text>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={12}>
                    <Text>Shipping Fee:</Text>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Text strong style={{ color: "#00b27d" }}>
                      FREE
                    </Text>
                  </Col>
                </>
              )}

              {/* <Col span={12}>
                <Text>Discount</Text>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text>-IDR {totalDiscount.toLocaleString("id-ID")}</Text>
              </Col> */}
              <Divider style={{ margin: "8px 0" }} />
              <Col span={12}>
                <Text strong>Total</Text>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text strong>IDR {total}</Text>
              </Col>
            </Row>
            <Button
              type="primary"
              style={{
                width: "100%",
                marginTop: "20px",
                backgroundColor: "#00b27d",
                borderColor: "#00b27d",
                height: "50px",
                borderRadius: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#32b89e";
                e.currentTarget.style.borderColor = "#32b89e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#00b27d";
                e.currentTarget.style.borderColor = "#00b27d";
              }}
              onClick={() => {
                if (!shippingInfo.address) {
                  message.error(
                    "Please fill in your address before confirming the order."
                  );
                } else {
                  handleConfirmOrder();
                }
              }}
            >
              <b>
                {" "}
                {shippingInfo.address
                  ? "CONFIRM ORDER"
                  : "PLEASE FILL IN YOUR ADDRESS"}
              </b>
            </Button>
          </Card>
        </Col>
      </Row>

      <style>
        {`
        @media (max-width: 420px) {
            .image-title {
                width: 220px !important;
            }
        }
        `}
      </style>
    </div>
  );
};

export default CheckoutPage;
