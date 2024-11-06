import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";
import axios from "axios";
import ProductCard from "./productCard";
import SkeletonCard from "../skeleton/skeletonCard"; // Import your SkeletonCard component

const { Content } = Layout;
const { Text } = Typography;

const ProductCatalogue: React.FC = () => {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [columns, setColumns] = useState<number>(4); // Default column count
  const [productsData, setProductsData] = useState<any[]>([]); // State for fetched products
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [expectedProductCount, setExpectedProductCount] = useState<number>(0);

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/products/get-products`);
        setProductsData(response.data);
        setExpectedProductCount(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hook to set column count based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(2); // 2 columns for mobile
      } else {
        setColumns(4); // 4 columns for desktop
      }
    };

    // Set initial column count
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
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
            {loading
              ? // Render skeleton cards while loading
                Array.from({ length: expectedProductCount }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : // Render product cards when data is loaded
                productsData.map((product) => (
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
                              IDR{" "}
                              {product.originalPrice.toLocaleString("id-ID")}
                            </Text>
                            <Text
                              style={{
                                fontSize: "18px",
                                color: "#ff0000",
                                fontWeight: "500",
                                marginRight: "10px",
                              }}
                            >
                              IDR{" "}
                              {product.discountedPrice.toLocaleString("id-ID")}
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
