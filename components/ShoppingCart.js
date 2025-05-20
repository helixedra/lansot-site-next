"use client";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
// import products from "@/app/data/products";
import Dialog from "./shared/Dialog";
import { RiShoppingCart2Line } from "react-icons/ri";

export default function ShoppingCart() {
  const { cart, handleRemoveItem, handleItemQty } = useContext(CartContext);

  const [cartDialog, setCartDialog] = useState(false);

  const handleCartDialog = () => {
    setCartDialog(!cartDialog);
  };

  // const productsData = JSON.parse(products);

  // console.log(productsData);
  // console.log(products);

  return (
    <div>
      <button onClick={handleCartDialog}>
        <RiShoppingCart2Line /> ({cart.reduce((acc, item) => acc + item.qty, 0)})
      </button>

      <Dialog visibility={cartDialog} setVisibility={setCartDialog} title="Cart">
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {products[item.id].name} {products[item.id].start_price} <button onClick={() => handleItemQty(item.id, "add")}>+</button>
              {item.qty}
              <button onClick={() => handleItemQty(item.id, "remove")}>-</button>
              <button onClick={() => handleRemoveItem(item.id)}>x</button>
            </li>
          ))}
        </ul>
      </Dialog>
    </div>
  );
}
