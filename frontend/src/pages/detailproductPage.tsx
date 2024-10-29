import React, { useState, useEffect, useMemo } from "react";
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
  Carousel,
  Skeleton,
} from "antd";

import ProductCatalogue from "components/productCatalogue";
// Import your images
import produk1Front from "../assets/produk1-front.webp";
import produk1Back from "../assets/produk1-back.webp";
import extraImage from "../assets/extra-image.webp";
import detailImage from "../assets/detail-image.webp";
import sizeChart from "../assets/size-chart.jpg";
const { Title, Text } = Typography;
const { Panel } = Collapse;

const DetailProductPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(""); // Default size

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { id } = useParams<{ id: string }>();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 1 second loading time

    return () => clearTimeout(timer);
  }, []);

  const product = useMemo(
    () => ({
      id,
      title: "Signature V Tee - Oversize Boxy",
      description: "",
      price: 199000,
      images: [produk1Front, produk1Back, detailImage, extraImage],
      availableSizes: ["M", "L", "XL"],
      color: "Black",
      size: "L",
      modelHeight: "175cm",
    }),
    [id]
  );

  // Handle resize event to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="photo-container"
      style={{
        padding: "10px",
        backgroundColor: "#fff",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      <Row
        className="mobile-view"
        justify="center"
        align="top"
        gutter={32}
        style={{ margin: "0 30px" }}
      >
        {/* Product Images - Mobile View with Carousel */}
        <Col xs={24} md={16} style={{ padding: "0" }}>
          {loading ? (
            <Skeleton active paragraph={{ rows: 18 }} />
          ) : isMobile ? (
            <Carousel dots={true}>
              {product.images.map((src, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <Image
                    src={src}
                    alt={`Product Image ${index + 1}`}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      aspectRatio: "4/5",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="scrollable">
              <Row gutter={[8, 8]}>
                {product.images.map((src, index) => (
                  <Col xs={24} sm={12} md={12} key={index}>
                    <Image
                      src={src}
                      alt={`Product Image ${index + 1}`}
                      loading="lazy"
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
          )}
        </Col>

        {/* Detail Product */}
        <Col xs={24} md={8}>
          <div className="detail-product" style={{ padding: "25px" }}>
            {loading ? (
              <>
                <Skeleton active paragraph={{ rows: 5 }} />
                <Skeleton.Button
                  active
                  style={{ width: "100%", height: "50px", marginTop: "20px" }}
                />
                <Skeleton
                  active
                  paragraph={{ rows: 4 }}
                  style={{ marginTop: "30px" }}
                />
              </>
            ) : (
              <>
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
                        onClick={() => setSelectedSize(size)} // Update selected size
                        style={{
                          margin: "5px",
                          color: "#333",
                          borderColor: "#ccc",
                          backgroundColor:
                            selectedSize === size ? "#ccc" : "transparent", // Highlight selected size
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
                    Ukuran dan tinggi model: {product.size} ·{" "}
                    {product.modelHeight}
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
                  <Panel
                    header={
                      <span style={{ fontWeight: "bold" }}>Detail Product</span>
                    }
                    key="1"
                  >
                    <ul style={{ paddingLeft: "20px" }}>
                      <li>Premium Cotton Combed 20s, 195gsm</li>
                      <li>100% Cotton</li>
                      <li>HDC Printing</li>
                      <li>Thick Ribbing</li>
                      <li>Oversize Boxy Fit</li>
                      <li>Dropped Shoulder</li>
                    </ul>
                  </Panel>
                  <Panel
                    header={
                      <span style={{ fontWeight: "bold" }}>How to Care</span>
                    }
                    key="2"
                  >
                    <ul style={{ paddingLeft: "20px" }}>
                      <li>Hand wash in cold water</li>
                      <li>Do not bleach</li>
                      <li>Iron at low temperature</li>
                      <li>Do not dry clean</li>
                    </ul>
                  </Panel>
                  <Panel
                    header={
                      <span style={{ fontWeight: "bold" }}>
                        Shipping and Returns
                      </span>
                    }
                    key="3"
                  >
                    <ul style={{ paddingLeft: "20px" }}>
                      <li>Free shipping over IDR 200.000</li>
                      <li>Easy returns within 30 days</li>
                      <li>
                        Order cancellation cannot be done after the package has
                        been processed or sent to the expedition.
                      </li>
                      <li>
                        Orders are processed 1-2 days after the order is
                        confirmed (excluding Sundays and national holidays)
                      </li>
                      <li>
                        Shipping is done from Surabaya. The duration of delivery
                        to the destination is adjusted to the distance policy
                        and the punctuality of the delivery service.
                      </li>
                    </ul>
                  </Panel>
                </Collapse>
              </>
            )}
          </div>
        </Col>
      </Row>
      {/* Section Baru - "You may be like" */}
      <div
        className="you-may-like"
        style={{
          marginTop: "50px",
          width: "100%",
          padding: "0",
          marginBottom: "50px",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          You May Also Like
        </Title>
        <ProductCatalogue />
      </div>

      <style>{`
        .you-may-like{
            margin-top: 25px;
        }

        .slick-dots li {
        margin: 0 5px;
        }

        .slick-dots li button {
        background-color: black !important;
        width: 20px !important;
        height: 3px !important;
        border-radius: 6px !important;
        }

        .slick-dots li.slick-active button {
        opacity: 1 !important;
        }

        .slick-dots {
        bottom: 35px !important;
        display: flex !important;
        justify-content: center !important;
        }

        .slick-dots li {
        width: auto !important;
        }

        .slick-dots li button::before {
        display: none !important;
        }

        .scrollable {
          max-height: 100vh; /* Adjust as needed */
          overflow-y: scroll; /* Allow vertical scrolling */
          scrollbar-width: none; /* For Firefox */
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .scrollable::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }

        @media (max-width: 767px) {
            .detail-product{
                padding: 15px !important;
            }
            .photo-container{
            padding: 0 !important;
            }
            
            .mobile-view{
            margin: 0 !important;
            }
        }
      `}</style>
    </div>
  );
};

export default DetailProductPage;
