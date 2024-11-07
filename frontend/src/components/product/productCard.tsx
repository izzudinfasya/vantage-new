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
  columns?: number; // Adding columns as an optional prop to control layout
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hoveredProductId,
  setHoveredProductId,
  columns = 3, // Default columns to 3
}) => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Handle click only if the title is not "Coming Soon"
  const handleClick = () => {
    if (product.title === "Coming Soon") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Check if the card should be disabled (title is "Coming Soon")
  const isDisabled = product.title === "Coming Soon";

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
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
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
