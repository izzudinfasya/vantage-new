import React, { useState, useRef, useEffect } from "react";
import { Layout } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images
import produk1Front from "../assets/produk1-front.webp";
import produk1Back from "../assets/produk1-back.webp";
import ComingSoon from "../assets/comingsoon.webp";
import ProductCard from "./productCard";

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
        infinite: false,
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
  const [, setSliderSettings] = useState(defaultSettings);

  const products = [
    {
      id: 1,
      frontImage: produk1Front,
      backImage: produk1Back,
      title: "Signature V Tee",
      price: 199000,
    },
    {
      id: 2,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 3,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 4,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 5,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 6,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 7,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
  ];

  // Custom function to handle previous slide
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Custom function to handle next slide
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Update current slide on slide change
  const handleAfterChange = (current: number) => {
    setCurrentSlide(current);
    if (current === products.length - 1) {
      setSliderSettings({ ...defaultSettings, slidesToShow: 1 });
    } else {
      setSliderSettings(defaultSettings);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Set to true if screen width is <= 768px (mobile)
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      {/* New Section: Anda Mungkin Suka */}
      <Content>
        <div
          style={{
            padding: "20px",
            paddingBottom: "60px",
            zIndex: 2,
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
            {" "}
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
                {!isMobileView && currentSlide >= products.length - 3.5 && (
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
                  style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  key={product.id}
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
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        margin: "10px",
                        color: "#333",
                      }}
                    >
                      IDR {product.price.toLocaleString("id-ID")}
                    </p>
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
            font-size: 36px; /* Smaller font size for mobile */
          }

        @media (max-width: 768px) {
        .slick-slide {
            height: auto !important; /* Set height to auto for responsiveness */
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
