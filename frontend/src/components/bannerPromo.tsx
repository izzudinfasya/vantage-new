import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import EmailSubscriptionModal from "../components/emailSubs";

const BannerPromo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleModalOpen = () => {
    setIsModalOpen(true); // Open modal when button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div style={{ backgroundColor: "black", color: "#fff", padding: "80px 0" }}>
      <Row
        justify="center"
        align="middle"
        style={{ textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}
      >
        <Col xs={24} md={16}>
          <h2 className="banner-title">
            {" "}
            GET 10% DISCOUNT ON YOUR FIRST PURCHASE
          </h2>
          <p className="banner-description">
            Subscribe to get a 10% discount on your first purchase and be the
            first to receive the latest news on trends, promotions, and more!
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
        </Col>
      </Row>

      {/* Display modal */}
      {isModalOpen && <EmailSubscriptionModal onClose={handleModalClose} />}

      {/* Responsive styles */}
      <style>{`
        .banner-title {
          font-size: 48px;
          font-weight: bold;
        }

        .banner-description {
          font-size: 18px;
          margin: 0 auto;
          max-width: 70%;
        }

        @media only screen and (max-width: 768px) {
          .banner-title {
            font-size: 32px; /* Adjusted font size for mobile */
            padding-right: 25px;
            padding-left: 25px;
            margin-bottom: 10px;
          }

          .banner-description {
            font-size: 14px; /* Adjusted font size for mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default BannerPromo;
