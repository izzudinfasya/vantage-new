import { Layout, Avatar, Row } from "antd";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa"; // Import icons from react-icons
import shopeeImage from "../assets/shopee.png";
import webLogo from "../assets/weblogo.png";
import gifAvatar from "../assets/avatar.gif";

const { Content, Footer } = Layout;

const LinktreePage: React.FC = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Helvetica, Arial, sans-serif", // Set font family globally
      }}
    >
      <Content
        style={{
          paddingTop: "50px", // Margin atas
          paddingBottom: "30px", // Margin bawah
          paddingLeft: "30px", // Margin kiri
          paddingRight: "30px", // Margin kanan
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          flex: 1,
        }}
      >
        <Avatar
          src={gifAvatar}
          style={{ marginBottom: "20px", width: "370px", height: "120px" }}
        />

        {/* Social media buttons in vertical layout */}
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
              className="link-button"
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
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${webLogo})`,
                  backgroundSize: "contain", // Atur agar gambar sesuai konten
                  backgroundRepeat: "no-repeat",
                  width: "22px",
                  height: "22px",
                  marginRight: "10px", // Memberikan jarak antara gambar dan teks
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
              className="link-button"
              href="https://shopee.com/vantage_id" // File path from assets
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
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${shopeeImage})`,
                  backgroundSize: "contain", // Atur agar gambar sesuai konten
                  backgroundRepeat: "no-repeat",
                  width: "22px",
                  height: "22px",
                  marginRight: "10px", // Memberikan jarak antara gambar dan teks
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
              className="link-button"
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
              className="link-button"
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
              className="link-button"
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
      <Footer style={{ textAlign: "center" }}>© 2024 VANTAGE</Footer>
    </Layout>
  );
};

export default LinktreePage;
