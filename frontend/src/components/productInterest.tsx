import React, { useState, useRef, useEffect } from "react";
import { Layout, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images
import produk1Front from "../assets/produk1-front.webp";
import produk1Back from "../assets/produk1-back.webp";
import ComingSoon from "../assets/comingsoon.webp";
import ProductCard from "./productCard";

const { Text } = Typography;

// Slider settings
const defaultSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 1,
  arrows: false,
  swipeToSlide: true,
  touchThreshold: 10,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
      },
    },
  ],
};

const { Content } = Layout;

const ProductInterest: React.FC = () => {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  const products = [
    {
      id: 1,
      frontImage: produk1Front,
      backImage: produk1Back,
      title: "Signature V Tee",
      originalPrice: 259000,
      discountedPrice: 189000,
    },
    {
      id: 2,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
    // Additional product entries...
    {
      id: 3,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
    {
      id: 4,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
    {
      id: 5,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
    {
      id: 6,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
    {
      id: 7,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
  ];

  // Custom function to handle previous slide
  const handlePrev = () => {
    sliderRef.current?.slickPrev(); // Optional chaining for safety
  };

  // Custom function to handle next slide
  const handleNext = () => {
    sliderRef.current?.slickNext(); // Optional chaining for safety
  };

  // Update current slide on slide change
  const handleAfterChange = (current: number) => {
    setCurrentSlide(current);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <Content>
        <div
          style={{
            padding: "20px",
            paddingBottom: "60px",
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <p
            className="interest-title"
            style={{
              textAlign: "left",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowRightOutlined style={{ marginRight: "15px" }} />
            THIS MAY BE INTERESTING FOR YOU
          </p>

          <div style={{ position: "relative" }}>
            {/* Left Arrow */}
            {!isMobileView && currentSlide > 0 && (
              <>
                <ArrowLeftOutlined
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    zIndex: 10,
                    fontSize: "18px",
                    cursor: "pointer",
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                  onClick={handlePrev}
                />
                {/* Left Overlay */}
                {currentSlide >= products.length - 3.5 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: 0,
                      bottom: 0,
                      width: "100px",
                      background:
                        "linear-gradient(to left, transparent, white)",
                      zIndex: 5,
                    }}
                  />
                )}
              </>
            )}

            {/* The Slider */}
            <Slider
              ref={sliderRef}
              {...defaultSettings}
              afterChange={handleAfterChange}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{ textAlign: "left", position: "relative" }}
                >
                  <ProductCard
                    product={product}
                    hoveredProductId={hoveredProductId}
                    setHoveredProductId={setHoveredProductId}
                  />
                  <div style={{ marginTop: "10px", textAlign: "left" }}>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                        margin: "10px",
                      }}
                    >
                      {product.title}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobileView ? "column" : "row",
                        alignItems: isMobileView ? "flex-start" : "center",
                        margin: "10px 10px",
                      }}
                    >
                      {product.discountedPrice > 0 ? (
                        <>
                          <Text
                            style={{
                              fontSize: "18px",
                              color: "#333",
                              fontWeight: "500",
                              textDecoration: "line-through",
                              marginRight: "10px",
                            }}
                          >
                            IDR {product.originalPrice.toLocaleString("id-ID")}
                          </Text>
                          <Text
                            style={{
                              fontSize: "18px",
                              color: "#ff0000",
                              fontWeight: "500",
                              marginRight: "10px",
                            }}
                          >
                            IDR{" "}
                            {product.discountedPrice.toLocaleString("id-ID")}
                          </Text>
                        </>
                      ) : (
                        <Text
                          style={{
                            fontSize: "18px",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          IDR {product.originalPrice.toLocaleString("id-ID")}
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* Right Overlay */}
            {!isMobileView && currentSlide < products.length - 3.5 && (
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  top: 0,
                  bottom: 0,
                  width: "100px",
                  background: "linear-gradient(to right, transparent, white)",
                  zIndex: 5,
                }}
              />
            )}

            {/* Right Arrow */}
            {!isMobileView && currentSlide < products.length - 3.5 && (
              <ArrowRightOutlined
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  zIndex: 10,
                  fontSize: "18px",
                  cursor: "pointer",
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "50%",
                  padding: "10px",
                }}
                onClick={handleNext}
              />
            )}
          </div>
        </div>
      </Content>

      {/* Media query for mobile view */}
      <style>{`
        .interest-title {
          font-size: 36px; /* Adjusted for mobile */
        }

        @media (max-width: 768px) {
          .slick-slide {
            height: auto !important;
          }

          .slick-slide > div {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .interest-title {
            font-size: 28px; /* Smaller font size for mobile */
          }

          .anticon {
            font-size: 28px; /* Smaller font size for icons */
          }

          .slick-slide div {
            height: auto; /* Set height to allow for aspect ratio */
          }
        }
      `}</style>
    </Layout>
  );
};

export default ProductInterest;
