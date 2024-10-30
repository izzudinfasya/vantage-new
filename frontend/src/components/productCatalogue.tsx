import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";
import axios from "axios";
import ProductCard from "./productCard";

const { Content } = Layout;
const { Text } = Typography;

const ProductCatalogue: React.FC = () => {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [columns, setColumns] = useState<number>(4); // Default kolom 4
  const [productsData, setProductsData] = useState<any[]>([]); // State for fetched products

  const apiUrl = process.env.REACT_APP_API_URL;
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/get-products`);
        setProductsData(response.data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            zIndex: 2,
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridRowGap: "15px",
            }}
          >
            {productsData.map((product) => (
              <div
                key={product._id} // Use unique product identifier
                style={{ textAlign: "left", position: "relative" }}
              >
                <ProductCard
                  product={{
                    id: product._id,
                    frontImage:
                      product.images[3] ||
                      product.images[1] ||
                      product.images[0],
                    backImage:
                      product.images[2] ||
                      product.images[1] ||
                      product.images[0],
                    title: product.title,
                    originalPrice: product.originalPrice,
                    discountedPrice: product.discountedPrice,
                  }}
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
                      flexDirection: columns < 3 ? "column" : "row",
                      alignItems: columns < 3 ? "flex-start" : "center",
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
                            textDecoration: "line-through",
                            marginRight: "10px",
                          }}
                        >
                          IDR {product.originalPrice.toLocaleString("id-ID")}
                        </Text>
                        <Text
                          style={{
                            fontSize: "18px",
                            color: "#ff0000",
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
                          color: "#000",
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
