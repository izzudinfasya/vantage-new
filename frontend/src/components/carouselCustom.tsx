import React, { useRef } from "react";
import { Carousel } from "antd";
import bannerImage1 from "../assets/banner.jpg";
import bannerImage2 from "../assets/banner2.jpg";

const CarouselCustom: React.FC = () => {
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

  return (
    <div
      className="fixed-carousel"
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{ cursor: "grab", height: "100%" }}
      >
        <Carousel autoplay ref={carouselRef} style={{ height: "100%" }}>
          {/* First Banner */}
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
              }}
            >
              {/* Overlay */}
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

              {/* Text Content */}
              <div
                className="content-text"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  textAlign: "center",
                  bottom: "35%",
                }}
              >
                <h1 className="text-carousel">New Arrival</h1>
              </div>
            </div>
          </div>

          {/* Second Banner */}
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
              }}
            >
              {/* Overlay */}
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

              {/* Text Content */}
              <div
                className="content-text"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  textAlign: "center",
                  bottom: "35%",
                }}
              >
                <h1 className="text-carousel">Discount Up To 40%</h1>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Responsive styles */}
      <style>{`
        .text-carousel {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .slick-dots li button:before, .slick-dots li.slick-active button:before{
        color: transparent;
        }

        @media only screen and (max-width: 768px) {
          .fixed-carousel div {
            height: 100vh;
          }

        .content-text {
            position: absolute;
            bottom: unset;
            top: 90%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }

        .text-carousel {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default CarouselCustom;
