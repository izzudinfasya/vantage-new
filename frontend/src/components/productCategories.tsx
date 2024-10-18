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
      <Row gutter={[16, 16]} style={{ padding: "10px", margin: "0" }}>
        {categories.map((category, index) => (
          <Col xs={8} sm={8} md={8} key={index}>
            <div
              className="container-categories"
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
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

      <style>{`
        .container-categories {
          position: relative;
          width: 100%;
          padding-bottom: 133.33%; /* 4:3 Aspect Ratio (height / width * 100) */
          background-color: #f0f0f0; /* Fallback color while loading image */
        }

        .container-categories .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.4);
        }

        .container-categories .category-title {
          color: #fff;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
        }

        @media only screen and (max-width: 768px) {
          .container-categories {
            padding-bottom: 100%;
          }

          .container-categories .category-title {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default ProductCategories;
