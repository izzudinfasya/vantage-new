import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd"; // Import Badge
import ProductCard from "./productCard";
import produk1Front from "../assets/produk1-front.webp";
import produk1Back from "../assets/produk1-back.webp";
import ComingSoon from "../assets/comingsoon.webp";

const { Content } = Layout;
const { Text } = Typography;

const ProductCatalogue: React.FC = () => {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [columns, setColumns] = useState<number>(4); // Default kolom 4

  // Data produk didefinisikan di sini
  const productsData = [
    {
      id: 1,
      frontImage: produk1Front,
      backImage: produk1Back,
      title: "Signature V Tee",
      originalPrice: 259000,
      discountedPrice: 189000,
    },
    {
      id: 2,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
    {
      id: 3,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
    {
      id: 4,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      originalPrice: 0,
      discountedPrice: 0,
    },
  ];

  // Hook untuk mengatur jumlah kolom berdasarkan ukuran jendela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(2); // 2 kolom untuk mobile
      } else {
        setColumns(4); // 4 kolom untuk desktop
      }
    };

    // Set initial column count
    handleResize();

    // Tambahkan event listener untuk resize
    window.addEventListener("resize", handleResize);

    // Bersihkan event listener saat komponen di-unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <Content>
        <div
          style={{
            padding: "20px",
            paddingBottom: "40px",
            zIndex: 2,
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`, // Menggunakan state columns
              gridRowGap: "15px",
            }}
          >
            {productsData.map((product) => (
              <div
                key={product.id}
                style={{ textAlign: "left", position: "relative" }}
              >
                <ProductCard
                  product={product}
                  hoveredProductId={hoveredProductId}
                  setHoveredProductId={setHoveredProductId}
                />
                <div style={{ marginTop: "10px", textAlign: "left" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      margin: "10px",
                    }}
                  >
                    {product.title}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: columns < 3 ? "column" : "row", // Change to column on mobile
                      alignItems: columns < 3 ? "flex-start" : "center", // Adjust alignment based on column count
                      margin: "10px 10px",
                    }}
                  >
                    {product.discountedPrice > 0 ? (
                      <>
                        <Text
                          style={{
                            fontSize: "18px",
                            color: "#333",
                            fontWeight: "500",
                            textDecoration: "line-through", // Original price strikethrough
                            marginRight: "10px",
                          }}
                        >
                          IDR {product.originalPrice.toLocaleString("id-ID")}
                        </Text>
                        <Text
                          style={{
                            fontSize: "18px",
                            color: "#ff0000", // Color for the discounted price
                            fontWeight: "500",
                            marginRight: "10px",
                          }}
                        >
                          IDR {product.discountedPrice.toLocaleString("id-ID")}
                        </Text>
                      </>
                    ) : (
                      <Text
                        style={{
                          fontSize: "18px",
                          color: "#000", // Color for original price
                          fontWeight: "500",
                        }}
                      >
                        IDR {product.originalPrice.toLocaleString("id-ID")}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ProductCatalogue;
