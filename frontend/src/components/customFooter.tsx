import React from "react";
import { Layout, Row, Col } from "antd";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const { Footer } = Layout;

const CustomFooter: React.FC = () => {
  return (
    <Footer
      style={{
        position: "relative",
        textAlign: "center",
        backgroundColor: "#000",
        color: "#fff",
        zIndex: 10,
      }}
    >
      <Row gutter={16} justify="center" style={{ marginBottom: "20px" }}>
        <Col>
          <a
            href="https://instagram.com/vantageofficial.id"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff" }}
          >
            <FaInstagram size={25} />
          </a>
        </Col>
        <Col>
          <a
            href="https://tiktok.com/vantageofficial.id"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff" }}
          >
            <FaTiktok size={25} />
          </a>
        </Col>
        <Col>
          <a
            href="https://wa.me/+6285155112557"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff" }}
          >
            <FaWhatsapp size={25} />
          </a>
        </Col>
      </Row>
      <div>© 2024 VANTAGE</div>
    </Footer>
  );
};

export default CustomFooter;
