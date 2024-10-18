import React from "react";
import { Row, Col } from "antd";

interface ProductCategoriesProps {
  newArrivalImage: string;
  bestsellerImage: string;
  collectionImage: string;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({
  newArrivalImage,
  bestsellerImage,
  collectionImage,
}) => {
  const categories = [
    { title: "New Arrival", image: newArrivalImage },
    { title: "Best Sellers", image: bestsellerImage },
    { title: "Collections", image: collectionImage },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ padding: "10px 10px", margin: "0" }}>
        {categories.map((category, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="overlay">
                <h2 className="category-title">{category.title}</h2>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductCategories;
