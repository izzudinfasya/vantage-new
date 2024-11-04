import React from "react";
import { Layout, Avatar, Row } from "antd";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import shopeeImage from "../assets/shopee.png";
import webLogo from "../assets/weblogo.png";
import gifAvatar from "../assets/v-black.webm";
import skyVideo from "../assets/sky.mp4";

const { Content, Footer } = Layout;

// CSS styles for the fade-in animation
const fadeInFromTopStyle = `
.fade-in {
  opacity: 0;
  animation: fadeInAnimation 1s ease forwards;
}

@keyframes fadeInAnimation {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Add this style globally
const GlobalStyles = () => <style>{fadeInFromTopStyle}</style>;

const LinktreePage: React.FC = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Helvetica, Arial, sans-serif",
        background: "transparent",
      }}
    >
      <GlobalStyles />

      <video
        autoPlay
        loop
        muted
        playsInline
        src={skyVideo}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <Content
        style={{
          paddingTop: "50px",
          paddingBottom: "30px",
          paddingLeft: "30px",
          paddingRight: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          flex: 1,
          zIndex: 1,
          color: "white", // Set font color to white for better contrast with background
        }}
      >
        {/* Avatar with initial fade-in */}
        {/* <Avatar
          src={gifAvatar}
          className="fade-in"
          style={{
            marginBottom: "20px",
            width: "120px",
            height: "120px",
            animationDelay: "0s",
          }}
        /> */}

        <video
          className="fade-in"
          style={{
            marginBottom: "20px",
            width: "120px",
            height: "120px",
            animationDelay: "0s",
            objectFit: "cover", // Ensures video fills the Avatar-like shape
          }}
          autoPlay
          loop
          muted
        >
          <source src={gifAvatar} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Brand Name */}
        <h1
          style={{
            color: "black",
            fontSize: "32px",
            animationDelay: "0.3s",
          }}
          className="fade-in"
        >
          VANTAGE
        </h1>

        {/* Tagline */}
        <p
          style={{
            color: "gray",
            fontSize: "14px",
            marginTop: "5px",
            marginBottom: "15px",
            animationDelay: "0.6s",
          }}
          className="fade-in"
        >
          Faith Over Fear
        </p>

        <div
          style={{
            background: "transparent",
            padding: "24px 0",
            minHeight: 280,
            width: "100%",
            maxWidth: "500px",
            height: "auto",
          }}
        >
          {/* Website Button */}
          <Row justify="center" style={{ marginBottom: "20px" }}>
            <a
              className="link-button fade-in"
              href="/home"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "23px 25px",
                backgroundColor: "black",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                width: "100%",
                animationDelay: "0.9s",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${webLogo})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  width: "22px",
                  height: "22px",
                  marginRight: "10px",
                }}
              ></div>
              <p
                style={{
                  margin: 0,
                  marginLeft: "-15px",
                  flex: 1,
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                Official Website
              </p>
            </a>
          </Row>

          {/* Shopee Button */}
          <Row justify="center" style={{ marginBottom: "20px" }}>
            <a
              className="link-button fade-in"
              href="https://shopee.com/vantage_id"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "23px 25px",
                backgroundColor: "black",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                width: "100%",
                animationDelay: "1.2s",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${shopeeImage})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  width: "22px",
                  height: "22px",
                  marginRight: "10px",
                }}
              ></div>
              <p
                style={{
                  margin: 0,
                  marginLeft: "-15px",
                  flex: 1,
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                Shopee
              </p>
            </a>
          </Row>

          {/* Instagram Button */}
          <Row justify="center" style={{ marginBottom: "20px" }}>
            <a
              className="link-button fade-in"
              href="https://instagram.com/vantageofficial.id"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "19px 25px",
                backgroundColor: "black",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                width: "100%",
                animationDelay: "1.5s",
              }}
            >
              <div style={{ fontSize: "25px" }}>
                <FaInstagram />
              </div>
              <p
                style={{
                  margin: 0,
                  marginLeft: "-15px",
                  flex: 1,
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                Instagram
              </p>
            </a>
          </Row>

          {/* TikTok Button */}
          <Row justify="center" style={{ marginBottom: "20px" }}>
            <a
              className="link-button fade-in"
              href="https://tiktok.com/vantageofficial.id"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "19px 25px",
                backgroundColor: "black",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                width: "100%",
                animationDelay: "1.8s",
              }}
            >
              <div style={{ fontSize: "22px" }}>
                <FaTiktok />
              </div>
              <p
                style={{
                  margin: 0,
                  marginLeft: "-15px",
                  flex: 1,
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                TikTok
              </p>
            </a>
          </Row>

          {/* Customer Service Button */}
          <Row justify="center">
            <a
              className="link-button fade-in"
              href="https://wa.me/+6285159116620"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "19px 25px",
                backgroundColor: "black",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                width: "100%",
                animationDelay: "2.1s",
              }}
            >
              <div style={{ fontSize: "22px" }}>
                <FaWhatsapp />
              </div>
              <p
                style={{
                  margin: 0,
                  marginLeft: "-15px",
                  flex: 1,
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                Customer Service
              </p>
            </a>
          </Row>
        </div>
      </Content>
      <Footer
        className="fade-in"
        style={{ textAlign: "center", background: "transparent" }}
      >
        © 2024 VANTAGE, All rights reserved.
      </Footer>
    </Layout>
  );
};

export default LinktreePage;
