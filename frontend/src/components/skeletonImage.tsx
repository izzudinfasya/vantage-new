import React from "react";

const SkeletonImage: React.FC = () => {
  return (
    <div
      className="skeleton-img"
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "125%", // Aspect ratio for 4:5 (100% / 5 * 4 = 125%)
        backgroundColor: "#e0e0e0",
        marginBottom: "10px",
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
      <style>
        {`
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

export default SkeletonImage;
