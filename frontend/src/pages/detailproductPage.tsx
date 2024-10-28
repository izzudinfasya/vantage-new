import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Image,
  Row,
  Col,
  Collapse,
  Divider,
  Drawer,
} from "antd";

import produk1Front from "../assets/produk1-front.jpg";
import produk1Back from "../assets/produk1-back.jpg";
import extraImage from "../assets/extra-image.jpg";
import detailImage from "../assets/detail-image.jpg";
import sizeChart from "../assets/size-chart.jpg";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const DetailProductPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [, setIsMobile] = useState(window.innerWidth <= 768);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { id } = useParams<{ id: string }>();

  const product = {
    id,
    title: "Signature V Tee - Oversize Boxy",
    description: "",
    price: 199000,
    images: [produk1Front, produk1Back, detailImage, extraImage],
    availableSizes: ["M", "L", "XL"],
    color: "Black",
    size: "L",
    modelHeight: "175cm",
  };

  // Handle resize event to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ padding: "10px", backgroundColor: "#fff" }}>
      <Row justify="center" align="top" gutter={32}>
        {/* Product Images - Mobile and Desktop View */}
        <Col xs={24} md={16}>
          <div className="scrollable">
            <Row gutter={[8, 8]}>
              {product.images.map((src, index) => (
                <Col xs={24} sm={12} md={12} key={index}>
                  <Image
                    src={src}
                    alt={`Product Image ${index + 1}`}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      aspectRatio: "4/5",
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>

        {/* Detail Product */}
        <Col xs={24} md={8}>
          <div style={{ padding: "25px" }}>
            <Title level={3} style={{ color: "#333" }}>
              {product.title}
            </Title>
            <Text
              style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              IDR {product.price.toLocaleString("id-ID")}
            </Text>
            <Divider style={{ borderColor: "#ccc" }} />
            <div style={{ marginTop: "20px" }}>
              <div>
                {product.availableSizes.map((size) => (
                  <Button
                    key={size}
                    style={{
                      margin: "5px",
                      color: "#333",
                      borderColor: "#ccc",
                      backgroundColor: "transparent",
                    }}
                    shape="round"
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <Text
                style={{
                  color: "#555",
                  fontSize: "14px",
                  display: "block",
                  marginTop: "10px",
                }}
              >
                Ukuran dan tinggi model: {product.size} · {product.modelHeight}{" "}
              </Text>
              <Text
                onClick={showDrawer}
                style={{
                  color: "#555",
                  textDecoration: "underline",
                  cursor: "pointer",
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Panduan Ukuran
              </Text>

              <Drawer
                title="Panduan Ukuran"
                placement="right"
                onClose={onClose}
                visible={visible}
              >
                <img
                  src={sizeChart}
                  alt="Size Chart"
                  style={{ width: "100%" }}
                />
              </Drawer>
            </div>
            <div style={{ marginTop: "30px" }}>
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#000",
                  borderColor: "#000",
                  borderRadius: "6px",
                  width: "100%",
                  height: "50px",
                }}
              >
                Buy Now
              </Button>
            </div>
            <Collapse
              style={{
                marginTop: "30px",
                backgroundColor: "transparent",
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "10px 15px",
              }}
              bordered={false}
              expandIconPosition="right"
            >
              <Panel header="Detail produk dan perawatan" key="1">
                <Text>
                  100% Katun. Perawatan mudah, cuci dengan suhu rendah.
                </Text>
              </Panel>
              <Panel header="Pengiriman dan pengembalian" key="2">
                <Text>
                  Gratis pengiriman di atas IDR 500,000. Pengembalian mudah
                  dalam 30 hari.
                </Text>
              </Panel>
            </Collapse>
          </div>
        </Col>
      </Row>
      <style>{`
        .scrollable {
          max-height: 100vh; /* Adjust as needed */
          overflow-y: scroll; /* Allow vertical scrolling */
          scrollbar-width: none; /* For Firefox */
          overflow-x: hidden;
        }

        .scrollable::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }
      `}</style>
    </div>
  );
};

export default DetailProductPage;
