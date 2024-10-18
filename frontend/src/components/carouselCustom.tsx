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
        top: 0,
        left: 0,
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        zIndex: 1,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <div onMouseDown={handleMouseDown} style={{ cursor: "grab" }}>
        <Carousel dots={true} autoplay ref={carouselRef}>
          {/* First Banner */}
          <div>
            <div
              style={{
                backgroundImage: `url(${bannerImage1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
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
                style={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: 150,
                  margin: "0 auto",
                }}
              >
                <h1
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  New Arrival
                </h1>
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
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
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
                style={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: 150,
                  margin: "0 auto",
                }}
              >
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
  );
};

export default CarouselCustom;
