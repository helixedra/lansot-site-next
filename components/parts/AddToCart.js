"use client";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import ui from "@/app/data/ui";

export default function AddToCart({ productId, locale }) {
  const { addToCart } = useContext(CartContext);

  return (
    <button onClick={() => addToCart(productId)}>
      {ui.cart.add_to_cart[locale]}
    </button>
  );
}
