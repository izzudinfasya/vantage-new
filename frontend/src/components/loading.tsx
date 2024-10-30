import React from "react";
import "./loading.css";
import gifAvatar from "../assets/v-white.gif";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  return (
    <div className={`loading-overlay ${isLoading ? "" : "hidden"}`}>
      <div className="loading-content">
        <img src={gifAvatar} alt="Loading" className="loading-logo" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
