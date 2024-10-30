import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TruckOutlined, ShopOutlined } from "@ant-design/icons";
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

import axios from "axios";
const { Title, Text } = Typography;
const { Panel } = Collapse;

const DetailProductPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(""); // Default size
  const [product, setProduct] = useState<any>(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { id } = useParams<{ id: string }>();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/products/get-product/${id}`
        );
        setProduct(response.data); // Store fetched data in state
      } catch (error: any) {
        console.error(
          "Error fetching product:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
            <Carousel arrows={true} dots={true} speed={500} autoplay>
              {product.images
                .slice()
                .reverse()
                .map((src: string, index: number) => (
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
                {product.images
                  .slice()
                  .reverse()
                  .map((src: string, index: number) => (
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
          <div
            className="detail-product"
            style={{
              padding: "25px",
            }}
          >
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
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "12px",
                    padding: "4px 12px",
                    fontSize: "12px",
                  }}
                >
                  {product.badgeType}
                </span>

                <Title
                  level={3}
                  style={{
                    color: "#333",
                    marginTop: "12px",
                    fontWeight: "600",
                  }}
                >
                  {product.title}
                </Title>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "10px 0",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "18px",
                      color: "#333",
                      fontWeight: "500",
                      textDecoration: "line-through", // Original price strikethrough
                      marginRight: "10px",
                    }}
                  >
                    IDR {product.originalPrice.toLocaleString("id-ID")}
                  </Text>
                  <Text
                    style={{
                      fontSize: "18px",
                      color: "#ff0000", // Color for the discounted price
                      fontWeight: "500",
                      marginRight: "10px",
                    }}
                  >
                    IDR {product.discountedPrice.toLocaleString("id-ID")}
                  </Text>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#ff0000", // Color for discount percentage
                      fontWeight: "500",
                    }}
                  >
                    -
                    {Math.round(
                      ((product.originalPrice - product.discountedPrice) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </Text>
                </div>

                <Divider style={{ borderColor: "#ccc" }} />

                <div style={{ marginTop: "20px" }}>
                  <div>
                    {product.sizes.map((size: string) => (
                      <Button
                        key={size}
                        onClick={() => setSelectedSize(size)} // Update selected size
                        style={{
                          margin: "5px",
                          color: selectedSize === size ? "#fff" : "#000",
                          borderColor: "#000",
                          backgroundColor:
                            selectedSize === size ? "#000" : "transparent", // Highlight selected size
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
                    Ukuran dan tinggi model: {product.sizeModel} ·{" "}
                    {product.heightModel}cm
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
                    {product.sizeChart.map((src: string, index: number) => (
                      <div key={index} style={{ position: "relative" }}>
                        <Image
                          src={src}
                          alt="Size Chart"
                          style={{ width: "100%" }}
                        />
                      </div>
                    ))}
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
                      <span style={{ fontWeight: "600" }}>Detail Product</span>
                    }
                    key="1"
                  >
                    <ul style={{ paddingLeft: "20px" }}>
                      {product.details.map((detail: string, index: number) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </Panel>
                  <Panel
                    header={
                      <span style={{ fontWeight: "600" }}>
                        Washing Instructions
                      </span>
                    }
                    key="2"
                  >
                    <ul style={{ paddingLeft: "20px" }}>
                      {product.washingInstructions.map(
                        (instruction: string, index: number) => (
                          <li key={index}>{instruction}</li>
                        )
                      )}
                    </ul>
                  </Panel>
                  <Panel
                    header={
                      <span style={{ fontWeight: "600" }}>
                        Shipping and Returns
                      </span>
                    }
                    key="3"
                  >
                    <div>
                      <h4 style={{ margin: "10px 0", fontWeight: "600" }}>
                        Shipping
                      </h4>
                      <ul style={{ paddingLeft: "20px" }}>
                        {product.shippingPolicies.map(
                          (sPolicies: string, index: number) => (
                            <li key={index}>{sPolicies}</li>
                          )
                        )}
                      </ul>
                      <h4 style={{ margin: "10px 0", fontWeight: "600" }}>
                        Returns
                      </h4>
                      <ul style={{ paddingLeft: "20px" }}>
                        {product.returnPolicies.map(
                          (rPolicies: string, index: number) => (
                            <li key={index}>{rPolicies}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </Panel>
                </Collapse>
                <div style={{ marginTop: "20px" }}>
                  {/* Standard Home Delivery */}
                  <a
                    href="https://shopee.com/vantage_id"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      style={{
                        padding: "15px 20px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px", // Add space between the sections
                      }}
                    >
                      <TruckOutlined
                        style={{
                          fontSize: "25px",
                          color: "#000",
                          marginRight: "20px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <Text
                          style={{
                            display: "block",
                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          Shipping Across Indonesia
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontSize: "12px",
                            color: "#555",
                          }}
                        >
                          Checkout On Shopee
                        </Text>
                      </div>
                      <Text
                        style={{
                          color: "#00b27d",
                          fontWeight: "bold",
                          marginLeft: "10px",
                        }}
                      >
                        FREE
                      </Text>
                    </div>
                  </a>
                  {/* Direct Pickup Section */}
                  <div>
                    <a
                      href="https://wa.me/+6285159116620?text=halo%20kak,%20saya%20mau%20ambil%20di%20lokasi%20kakak"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <div
                        style={{
                          padding: "15px 20px",
                          border: "1px solid #ccc",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ShopOutlined
                          style={{
                            fontSize: "25px",
                            color: "#000",
                            marginRight: "20px",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <Text
                            style={{
                              display: "block",
                              fontWeight: "500",
                              fontSize: "14px",
                            }}
                          >
                            Direct Pickup - Surabaya
                          </Text>
                          <Text
                            style={{
                              display: "block",
                              marginBottom: "5px",
                              fontSize: "12px",
                              color: "#555",
                            }}
                          >
                            Available for COD orders
                          </Text>
                        </div>
                        <Text
                          style={{
                            color: "#00b27d",
                            fontWeight: "bold",
                            marginLeft: "10px",
                          }}
                        >
                          FREE
                        </Text>
                      </div>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>

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

        .ant-carousel .slick-prev,
        .ant-carousel .slick-next {
        color: black; /* Mengatur warna panah menjadi hitam */
        }

        /* Mengubah background arrow untuk lebih terlihat (opsional) */
        .ant-carousel .slick-prev:before,
        .ant-carousel .slick-next:before {
        color: black; /* Pastikan simbol panah hitam */
        }

        .ant-carousel .slick-prev:after,
        .ant-carousel .slick-next:after {
        display: none;
        }

        /* Mengatur ukuran panah jika diperlukan */
        .ant-carousel .slick-prev,
        .ant-carousel .slick-next {
        font-size: 24px; /* Ukuran font panah */
        line-height: 1; /* Mengatur tinggi baris */
        margin: 0 15px;
        }

        /* Mengubah warna saat hover (opsional) */
        .ant-carousel .slick-prev:hover,
        .ant-carousel .slick-next:hover {
        color: grey; /* Warna saat hover */
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
