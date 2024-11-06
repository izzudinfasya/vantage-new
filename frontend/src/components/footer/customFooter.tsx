import { Col, Row, Typography, Button, Space, Divider, Layout } from "antd";
import {
  InstagramFilled,
  MailFilled,
  TikTokFilled,
  ShopFilled,
  CustomerServiceFilled,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const CustomFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "whitesmoke",
        zIndex: 10,
        position: "relative",
      }}
    >
      <Row
        justify="center" // Center the content horizontally
        gutter={[16, 16]}
        style={{ margin: "0 auto", padding: "30px" }}
      >
        {/* Customer Support Section */}
        <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
          <Title level={4}>Can We Help You?</Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              icon={
                <MailFilled style={{ color: "black", fontSize: "1.2em" }} />
              } // Use 1.2em to match the text size
              type="link"
              style={{ paddingLeft: 0, fontSize: "14px" }}
              href="mailto:vantageofficial.id@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ color: "black" }}>Send Email</span>
            </Button>
            <Button
              icon={
                <CustomerServiceFilled
                  style={{ color: "black", fontSize: "1.2em" }}
                />
              } // Adjusted to 1.2em
              type="link"
              style={{ paddingLeft: 0, fontSize: "14px" }}
              href="https://wa.me/6285159116620"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ color: "black" }}>Customer Service</span>
            </Button>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              We will reply as soon as possible
            </Text>
          </Space>
        </Col>
        {/* About Us Section */}
        <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
          <Title level={4}>VANTAGE</Title>
          <Space direction="vertical">
            <a href="#" style={{ color: "black", fontSize: "14px" }}>
              About Us
            </a>
            <a href="#" style={{ color: "black", fontSize: "14px" }}>
              Media
            </a>
            <a
              href="https://shopee.com/vantage_id"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black", fontSize: "14px" }}
            >
              Our Store
            </a>
          </Space>
        </Col>
        {/* Social Media Section */}
        <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
          <Title level={4}>Follow Us</Title>
          <Space direction="horizontal">
            <a
              href="https://instagram.com/vantageofficial.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramFilled
                style={{
                  color: "black",
                  fontSize: "1.5em", // Match size to text
                }}
              />
            </a>
            <a
              href="https://tiktok.com/vantageofficial.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokFilled
                style={{
                  color: "black",
                  fontSize: "1.5em", // Match size to text
                }}
              />
            </a>
            <a
              href="https://shopee.com/vantage_id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShopFilled
                style={{
                  color: "black",
                  fontSize: "1.5em", // Match size to text
                }}
              />
            </a>
          </Space>
        </Col>
      </Row>

      <Divider style={{ borderColor: "#cecece" }} />

      {/* Footer Legal Section */}
      <Col
        xs={24}
        style={{ margin: "0 auto", textAlign: "center" }} // Centered on all viewports
      >
        <Text style={{ color: "black" }}>
          © 2024 VANTAGE, All rights reserved.
        </Text>
      </Col>
    </Footer>
  );
};

export default CustomFooter;
