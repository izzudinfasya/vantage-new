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
        justify="space-around"
        gutter={[16, 16]}
        style={{ margin: "0 auto", padding: "30px" }}
      >
        {/* Customer Support Section */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4}>Can We Help You?</Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              icon={<MailFilled style={{ color: "black" }} />}
              type="link"
              style={{ paddingLeft: 0 }}
            >
              <span style={{ color: "black" }}>Send Email</span>
            </Button>
            <Button
              icon={<CustomerServiceFilled style={{ color: "black" }} />}
              type="link"
              style={{ paddingLeft: 0 }}
            >
              <span style={{ color: "black" }}>Customer Service</span>
            </Button>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              We will reply as soon as possible
            </Text>
          </Space>
        </Col>
        {/* About Us Section */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4}>VANTAGE</Title>
          <Space direction="vertical">
            <a href="#" style={{ color: "black" }}>
              About Us
            </a>
            <a href="#" style={{ color: "black" }}>
              Media
            </a>
            <a href="#" style={{ color: "black" }}>
              Toko kami
            </a>
          </Space>
        </Col>
        {/* Social Media Section */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4}>Follow Us</Title>
          <Space direction="horizontal">
            <a
              href="https://instagram.com/vantageofficial.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramFilled style={{ color: "black", fontSize: "18px" }} />
            </a>
            <a
              href="https://tiktok.com/vantageofficial.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokFilled style={{ color: "black", fontSize: "18px" }} />
            </a>
            <a
              href="https://shopee.com/vantage_id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShopFilled style={{ color: "black", fontSize: "18px" }} />
            </a>
          </Space>
        </Col>
      </Row>

      <Divider style={{ borderColor: "#cecece" }} />

      {/* Footer Legal Section */}
      <Col
        xs={24}
        sm={12}
        md={6}
        style={{ margin: "0 auto", textAlign: "center" }}
      >
        <Text style={{ color: "black" }}>© 2024 VANTAGE</Text>
      </Col>
    </Footer>
  );
};

export default CustomFooter;
