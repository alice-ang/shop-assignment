import { useCart } from "@/lib/providers/CartProvider";
import React from "react";

export const CartItem = () => {
  const { removeFromCart, cartItems, getCartTotalPrice, addToCart } = useCart();

  return <div>CartItem</div>;
};
