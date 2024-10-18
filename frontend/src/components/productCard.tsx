import React from "react";

interface ProductCardProps {
  product: { id: number; frontImage: string; backImage: string };
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
      backgroundImage: `url(${
        hoveredProductId === product.id && product.backImage
          ? product.backImage
          : product.frontImage
      })`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "400px",
      position: "relative",
      transition: "background-image 0.2s ease-in-out",
    }}
    onMouseEnter={() => setHoveredProductId(product.id)}
    onMouseLeave={() => setHoveredProductId(null)}
  ></div>
);

export default ProductCard;
