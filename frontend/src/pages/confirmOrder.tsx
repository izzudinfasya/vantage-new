import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
  Radio,
} from "antd";
import { PayCircleOutlined, CreditCardOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ConfirmOrder = () => {
  const [hovered, setHovered] = useState(false);
  //   const [form] = Form.useForm();
  const location = useLocation();
  const product = location.state?.product; // This should be an array or a single object
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shippingForm] = Form.useForm();

  // State for shipping information
  const [shippingInfo, setShippingInfo] = useState({
    name: null,
    phone: null,
    address: null,
  });

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentFormVisible, setPaymentFormVisible] = useState(false);

  const discount = product[0].discount;
  const isProductArray = Array.isArray(product);
  const deliveryCharge = 0;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const calculateTotal = () => {
    if (isProductArray && product.length > 0) {
      const subtotal = product.reduce(
        (total, item) => total + item.originalPrice * Number(item.qty),
        0
      );

      const total = subtotal + deliveryCharge - discount;

      return total.toLocaleString("id-ID");
    }
    return "0"; // Jika tidak ada produk, kembalikan 0
  };

  const showModal = () => {
    shippingForm.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    shippingForm
      .validateFields()
      .then((values) => {
        setShippingInfo(values); // Set the shipping information
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePaymentMethodChange = (e: any) => {
    setPaymentMethod(e.target.value);
    setPaymentFormVisible(true);
  };

  return (
    <div style={{ padding: "30px 0" }}>
      <Row justify="center" gutter={[16, 16]} style={{ padding: 0, margin: 0 }}>
        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
          <Title level={3} style={{ marginBottom: "30px" }}>
            <b>Confirm Order</b>
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
                    <Text>{shippingInfo.name}</Text>
                    <br />
                    <Text>{shippingInfo.phone}</Text>
                    <br />
                    <Text>{shippingInfo.address}</Text>
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
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              style: {
                backgroundColor: "#000000",
                color: "#FFFFFF",
                borderColor: "#000000",
              },
              onMouseEnter: (e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = "#808080";
                target.style.borderColor = "#808080";
              },
              onMouseLeave: (e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = "#000000";
                target.style.borderColor = "#000000";
              },
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
                label="Address"
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

          {/* Payment Method Selection */}
          <Card
            title={<Title level={4}>Payment Method</Title>}
            bordered
            style={{ marginTop: "20px" }}
          >
            <Form layout="vertical">
              <Form.Item>
                <Radio.Group
                  onChange={handlePaymentMethodChange}
                  value={paymentMethod}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Radio value="creditCard" style={{ marginBottom: "8px" }}>
                      <CreditCardOutlined />
                      <span style={{ marginLeft: "8px" }}>
                        Debit / Credit Card
                      </span>
                    </Radio>
                    <Radio value="payPal">
                      <PayCircleOutlined />
                      <span style={{ marginLeft: "8px" }}>PayPal</span>
                    </Radio>
                  </div>
                </Radio.Group>
              </Form.Item>

              {/* Render the form fields directly after the Radio for Debit / Credit Card */}
              {paymentMethod === "creditCard" && (
                <div style={{ marginTop: "20px" }}>
                  <Form.Item
                    label="Card Number"
                    name="cardNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your card number!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} />
                  </Form.Item>
                  <Form.Item
                    label="Expiration Date"
                    name="expirationDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input expiration date!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} />
                  </Form.Item>
                  <Form.Item
                    label="CVV"
                    name="cvv"
                    rules={[
                      { required: true, message: "Please input your CVV!" },
                    ]}
                  >
                    <Input style={{ height: "50px" }} />
                  </Form.Item>
                </div>
              )}

              {paymentMethod === "payPal" && paymentFormVisible && (
                <div style={{ marginTop: "20px" }}>
                  <Form.Item
                    label="PayPal Email"
                    name="paypalEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please input your PayPal email!",
                      },
                    ]}
                  >
                    <Input style={{ height: "50px" }} />
                  </Form.Item>
                </div>
              )}
            </Form>
          </Card>
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
                                  {item.images
                                    .slice(0, 3)
                                    .map((image: any, index: any) => (
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
                                          src={
                                            image[3] ||
                                            image[2] ||
                                            image[1] ||
                                            image[0]
                                          }
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
                                  <div style={{ marginTop: "4px" }}>
                                    <span>Price: </span>
                                    {item.originalPrice.toLocaleString("id-ID")}
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
              <Col span={12}>
                <Text>Delivery Charge</Text>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text>IDR {deliveryCharge.toLocaleString("id-ID")}</Text>
              </Col>
              <Col span={12}>
                <Text>Discount</Text>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text>-IDR {discount.toLocaleString("id-ID")}</Text>
              </Col>
              <Divider style={{ margin: "8px 0" }} />
              <Col span={12}>
                <Text strong>Total</Text>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Text strong>IDR {calculateTotal()}</Text>
              </Col>
            </Row>
            <Button
              type="primary"
              style={{
                width: "100%",
                marginTop: "20px",
                backgroundColor: "black",
                borderColor: "black",
                height: "50px",
                borderRadius: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "gray";
                e.currentTarget.style.borderColor = "gray";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "black";
                e.currentTarget.style.borderColor = "black";
              }}
              onClick={onFinish}
            >
              Confirm Order
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

export default ConfirmOrder;
