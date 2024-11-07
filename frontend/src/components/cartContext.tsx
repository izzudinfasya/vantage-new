import React, { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";

interface CartItem {
  id: string;
  quantity: number;
  title: string;
  badgeType: string;
  images: string[];
  originalPrice: number;
  discountPrice: number;
  discount: number;
  selectedSize: string;
}

const CartContext = createContext<{
  cartItems: CartItem[];
  addItemToCart: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string, selectedSize: string) => void;
  editItem: (itemId: string) => void;
} | null>(null);

export const CartProvider: React.FC<{
  children: React.ReactNode;
  userId: string | null;
}> = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

      if (item.badgeType === "EXCLUSIVE") {
        if (existingItemIndex === -1) {
          // If EXCLUSIVE item is not already in the cart, add it with quantity 1
          const newItems = [...prevItems, { ...item, quantity: 1 }];
          message.success("Item successfully added to cart!");
          return newItems;
        } else {
          // If EXCLUSIVE item is already in the cart, show an error
          message.error("EXCLUSIVE items can only be purchased once per user.");
          return prevItems;
        }
      } else {
        // For non-EXCLUSIVE items, proceed as normal
        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += 1; // Increment the quantity
          message.success("Item quantity updated in cart!");
          return updatedItems;
        } else {
          const newItems = [...prevItems, { ...item, quantity: 1 }];
          message.success("Item successfully added to cart!");
          return newItems;
        }
      }
    });
  };

  const removeItem = (itemId: string, selectedSize: string) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item.id === itemId && item.selectedSize === selectedSize)
      )
    );
  };

  const editItem = (itemId: string) => {
    console.log("Edit item:", itemId);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItem, editItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
