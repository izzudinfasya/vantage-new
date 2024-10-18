import React from "react";

interface ProductCardProps {
  product: {
    id: number;
    frontImage: string;
    backImage: string;
    title: string;
    price: number;
  };
  hoveredProductId: number | null;
  setHoveredProductId: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hoveredProductId,
  setHoveredProductId,
}) => (
  <div
    style={{
      width: "100%",
      position: "relative",
      marginRight: "10px",
      overflow: "hidden",
      aspectRatio: "3 / 4",
      transition: "background-image 0.2s ease-in-out",
    }}
    onMouseEnter={() => setHoveredProductId(product.id)}
    onMouseLeave={() => setHoveredProductId(null)}
  >
    <img
      src={
        hoveredProductId === product.id && product.backImage
          ? product.backImage
          : product.frontImage
      }
      alt={product.title}
      style={{
        height: "100%",
        width: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export default ProductCard;
