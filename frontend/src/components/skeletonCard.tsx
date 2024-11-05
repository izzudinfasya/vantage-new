import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div
      style={{
        textAlign: "left",
        position: "relative",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="skeleton-img"
        style={{
          width: "100%",
          paddingBottom: "135%",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          marginBottom: "10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>

      <div style={{ marginTop: "10px", flexGrow: 1 }}>
        <div
          style={{
            width: "80%",
            height: "20px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            marginBottom: "5px",
          }}
        />
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          <div
            style={{
              flex: "1 1 60%",
              maxWidth: "60%",
              height: "20px",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          />
          <div
            style={{
              flex: "1 1 30%",
              maxWidth: "30%",
              height: "20px",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      <style>
        {`
          @media (min-width: 768px) {
            .skeleton-img {
              padding-bottom: 125%; // Aspect ratio for desktop
            }
          }
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SkeletonCard;
