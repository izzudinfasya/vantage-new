import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: number;
    frontImage: string;
    backImage: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
  };
  hoveredProductId: number | null;
  setHoveredProductId: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hoveredProductId,
  setHoveredProductId,
}) => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product.id}`, { state: { product } });
  };
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "95%",
        maxHeight: "480px",
        aspectRatio: "9 / 16",
        transition: "background-image 0.2s ease-in-out",
        margin: "7px",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHoveredProductId(product.id)}
      onMouseLeave={() => setHoveredProductId(null)}
      onClick={handleClick}
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
};

export default ProductCard;