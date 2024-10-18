import React, { useState } from "react";
import { Button } from "antd";
import EmailSubscriptionModal from "../components/emailSubs";
// import bannerPromo from "../assets/banner-promo.jpg";

const BannerPromo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Awalnya modal tertutup

  const handleModalOpen = () => {
    setIsModalOpen(true); // Buka modal ketika tombol ditekan
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Tutup modal
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "#fff",
        padding: "80px",
        textAlign: "center",
        maxWidth: "100%",
      }}
    >
      <h2 style={{ fontSize: "48px", fontWeight: "bold" }}>
        SUBSCRIBE TO OUR NEWSLETTER
      </h2>
      <p
        style={{
          fontSize: "18px",
          maxWidth: "70%",
          margin: "0 auto",
        }}
      >
        Be the first to receive the latest news on trends, promotions and more!
      </p>
      <Button
        onClick={handleModalOpen}
        type="primary"
        size="large"
        style={{
          color: "black",
          fontWeight: "600",
          marginTop: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
        }}
      >
        Subscribe
      </Button>

      {/* Tampilkan modal */}
      {isModalOpen && <EmailSubscriptionModal onClose={handleModalClose} />}
    </div>
  );
};

export default BannerPromo;
