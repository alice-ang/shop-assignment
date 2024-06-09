"use client";
import { useCart } from "@/lib/providers/CartProvider";
import { CartItem } from "@/lib/types";
import { FC } from "react";
import { Button } from "./ui/button";

export const QuantityButtons: FC<{ product: CartItem }> = ({ product }) => {
  const { removeFromCart, addToCart } = useCart();

  return (
    <div className="border flex w-fit">
      <Button onClick={() => removeFromCart(product)} variant="ghost">
        -
      </Button>
      <Button variant="ghost">{product.quantity}</Button>
      <Button onClick={() => addToCart(product)} variant="ghost">
        +
      </Button>
    </div>
  );
};
