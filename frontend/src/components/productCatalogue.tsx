import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import ProductCard from "./productCard";
import produk1Front from "../assets/produk1-front.webp";
import produk1Back from "../assets/produk1-back.webp";
import ComingSoon from "../assets/comingsoon.webp";

const { Content } = Layout;

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
      price: 199000,
    },
    {
      id: 2,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 3,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
    },
    {
      id: 4,
      frontImage: ComingSoon,
      backImage: "",
      title: "Coming Soon",
      price: 0,
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
              <div key={product.id} style={{ textAlign: "left" }}>
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
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "10px",
                      color: "#333",
                    }}
                  >
                    IDR {product.price.toLocaleString("id-ID")}
                  </p>
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
