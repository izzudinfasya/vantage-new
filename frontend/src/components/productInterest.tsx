import React, { useState, useRef, useEffect } from "react";
import { Layout } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images
import produk1Front from "../assets/produk1-front.jpg";
import produk1Back from "../assets/produk1-back.jpg";
import ComingSoon from "../assets/comingsoon.png";

// Slider settings
const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  arrows: false,
  swipeToSlide: true,
  touchThreshold: 10,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.5,
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

// ProductCard component
interface ProductCardProps {
  product: {
    id: number;
    frontImage: string;
    backImage: string;
    title: string;
    price: number;
  };
  hoveredProductId: number | null;
  setHoveredProductId: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hoveredProductId,
  setHoveredProductId,
}) => (
  <div
    style={{
      backgroundImage: `url(${
        hoveredProductId === product.id && product.backImage
          ? product.backImage
          : product.frontImage
      })`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "400px",
      position: "relative",
      marginRight: "10px",
      transition: "background-image 0.2s ease-in-out",
      cursor: "pointer",
    }}
    onMouseEnter={() => setHoveredProductId(product.id)}
    onMouseLeave={() => setHoveredProductId(null)}
  ></div>
);

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
      price: 169000,
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
    {
      id: 8,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 9,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 10,
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
                {!isMobileView && currentSlide >= products.length - 4.5 && (
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
              {...settings}
              afterChange={handleAfterChange}
            >
              {products.map((product) => (
                <div key={product.id}>
                  <ProductCard
                    product={product}
                    hoveredProductId={hoveredProductId}
                    setHoveredProductId={setHoveredProductId}
                  />
                  <div style={{ textAlign: "left", marginTop: "10px" }}>
                    <p style={{ fontSize: "16px", fontWeight: "normal" }}>
                      {product.title}
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                      IDR {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>

            {/* Right Overlay */}
            {!isMobileView && currentSlide < products.length - 4.5 && (
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
            {!isMobileView && currentSlide < products.length - 4.5 && (
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
            display: flex; /* Ensure flexbox layout */
            justify-content: center; /* Center the content */
            align-items: center; /* Center the content */
          }

          .interest-title {
            font-size: 28px; /* Smaller font size for mobile */
          }

          .anticon {
            font-size: 28px; /* Smaller font size for icons */
          }

        .slick-slide div {
            height: 80%; /* Set height to allow for aspect ratio */
          }
        }
      `}</style>
    </Layout>
  );
};

export default ProductInterest;
