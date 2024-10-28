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
      position: "relative",
      overflow: "hidden",
      width: "95%",
      maxHeight: "550px",
      aspectRatio: "9 / 16",
      transition: "background-image 0.2s ease-in-out",
      margin: "7px",
    }}
    onMouseEnter={() => setHoveredProductId(product.id)}
    onMouseLeave={() => setHoveredProductId(null)}
  >
    <img
      loading="lazy"
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
        transition: "transform 0.3s ease",
      }}
    />
  </div>
);

export default ProductCard;
