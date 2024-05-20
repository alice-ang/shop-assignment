import { useCart } from "@/lib/providers/CartProvider";
import React from "react";

export const CartButton = () => {
  const { getCartTotalItems } = useCart();

  const items = getCartTotalItems();

  return <button>Items: {items}</button>;
};
