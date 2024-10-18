import React, { useRef, useState } from "react";
import { Layout, Carousel, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ProductCard from "../components/productCard";
import EmailSubscriptionModal from "../components/emailSubs"; // Import modal

import bannerImage1 from "../assets/banner.jpg";
import bannerImage2 from "../assets/banner2.jpg";
import newArrivalImage from "../assets/new-arrival.jpg";
import collectionImage from "../assets/collection.jpg";
import bestsellerImage from "../assets/bestseller.jpg";

import produk1Front from "../assets/produk1-front.jpg";
import produk1Back from "../assets/produk1-back.jpg";
import produk2Front from "../assets/produk2-front.jpg";
import produk2Back from "../assets/produk2-back.jpg";
import produk3 from "../assets/produk3.jpg";

const { Content } = Layout;

const HomePage: React.FC = () => {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const products = [
    {
      id: 1,
      frontImage: produk1Front,
      backImage: produk1Back,
    },
    {
      id: 2,
      frontImage: produk2Front,
      backImage: produk2Back,
    },
    {
      id: 3,
      frontImage: produk3,
      backImage: "",
    },
  ];

  const carouselRef = useRef<any>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.pageX;
    let isDragging = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging) {
        const deltaX = moveEvent.pageX - startX;
        if (deltaX > 50) {
          carouselRef.current.prev();
          isDragging = true;
        } else if (deltaX < -50) {
          carouselRef.current.next();
          isDragging = true;
        }
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      {/* Tampilkan modal */}
      {isModalOpen && <EmailSubscriptionModal onClose={handleModalClose} />}

      {/* Fixed Carousel */}
      <div
        className="fixed-carousel"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          minHeight: "100vh", // Change to minHeight
          objectFit: "cover",
          zIndex: 1,
          overflow: "hidden", // Prevent overflow
        }}
      >
        <div onMouseDown={handleMouseDown} style={{ cursor: "grab" }}>
          <Carousel dots={true} autoplay ref={carouselRef}>
            <div>
              <div
                style={{
                  backgroundImage: `url(${bannerImage1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden", // Prevent overflow
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 1,
                  }}
                ></div>

                <div style={{ position: "relative", zIndex: 2 }}>
                  <h1
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    New
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  backgroundImage: `url(${bannerImage2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden", // Prevent overflow
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 1,
                  }}
                ></div>

                <div style={{ position: "relative", zIndex: 2 }}>
                  <h1
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Discount Up To 40%
                  </h1>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      {/* Section Selanjutnya */}
      <Content>
        <div
          style={{
            marginTop: "80vh",
            zIndex: 2,
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <Row gutter={[16, 16]} style={{ padding: "20px 20px" }}>
            <Col xs={24} sm={12} md={8}>
              <div
                style={{
                  backgroundImage: `url(${newArrivalImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                  position: "relative",
                  overflow: "hidden", // Prevent overflow
                }}
              >
                <div className="overlay">
                  <h2 className="category-title">New Arrival</h2>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div
                style={{
                  backgroundImage: `url(${bestsellerImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                  position: "relative",
                  overflow: "hidden", // Prevent overflow
                }}
              >
                <div className="overlay">
                  <h2 className="category-title">Best Sellers</h2>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div
                style={{
                  backgroundImage: `url(${collectionImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                  position: "relative",
                  overflow: "hidden", // Prevent overflow
                }}
              >
                <div className="overlay">
                  <h2 className="category-title">Collections</h2>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>

      {/* New Section: Anda Mungkin Suka */}
      <Content>
        <div
          style={{
            padding: "20px 20px",
            zIndex: 2,
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <p
            style={{
              textAlign: "left",
              marginBottom: "20px",
              fontSize: "36px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowRightOutlined style={{ marginRight: "10px" }} />
            ANDA MUNGKIN SUKA
          </p>
          <Row
            gutter={[16, 16]}
            style={{ padding: "0 20px", paddingBottom: "40px" }}
          >
            {products.map((product) => (
              <Col xs={24} sm={12} md={8} key={product.id}>
                <ProductCard
                  product={product}
                  hoveredProductId={hoveredProductId}
                  setHoveredProductId={setHoveredProductId}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
