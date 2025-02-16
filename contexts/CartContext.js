"use client";
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    // const product = products.find((product) => product.id === productId);
    if (cart.find((item) => item.id === productId)) {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id: productId, qty: 1 }]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const handleItemQty = (itemId, action) => {
    if (action === "add") {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else if (action === "remove") {
      const item = cart.find((item) => item.id === itemId);
      if (item.qty > 1) {
        setCart(
          cart.map((item) =>
            item.id === itemId ? { ...item, qty: item.qty - 1 } : item
          )
        );
      } else {
        handleRemoveItem(itemId);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, handleRemoveItem, handleItemQty }}
    >
      {children}
    </CartContext.Provider>
  );
};
