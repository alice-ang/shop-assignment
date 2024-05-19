"use client";
import React from "react";
import { useCart } from "@/lib/providers/CartProvider";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    clearCart,
    getCartTotalPrice,
    getCartTotalItems,
  } = useCart();

  return (
    <SheetContent className="w-full overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Varukorgen</SheetTitle>
        <SheetDescription>
          {getCartTotalItems()} st produkter i varukorgen
        </SheetDescription>
      </SheetHeader>
      <ul className="">
        {cartItems.map((product) => (
          <li
            className="flex flex-row-items-end justify-start border-b-2 border-black gap-4 py-2"
            key={product.id}
          >
            <Image
              src={`https://www.bortakvall.se/${product.images.large}`}
              width={100}
              height={100}
              alt={product.name}
            />

            <div className=" w-full ">
              <h5 className="font-bold">{product.name}</h5>

              <p>{product.price} SEK</p>

              <div className="border flex w-fit">
                <Button onClick={() => removeFromCart(product)} variant="ghost">
                  -
                </Button>
                <Button variant="ghost">{product.quantity}</Button>
                <Button onClick={() => addToCart(product)} variant="ghost">
                  +
                </Button>
              </div>
              <p className="font-semibold">
                Totalt: {product.price * product.quantity} SEK
              </p>
            </div>
          </li>
        ))}
      </ul>
      <SheetFooter>
        <div className="w-full ">
          <h5 className="font-bold py-4">Totalt: {getCartTotalPrice()} SEK</h5>
          <Button onClick={clearCart} variant="secondary" className="w-full">
            Töm varukorgen
          </Button>
        </div>
        <div>
          <SheetClose asChild>
            <Link href="/checkout" passHref className="w-full">
              <Button type="submit" className="w-full">
                Gå till kassan
              </Button>
            </Link>
          </SheetClose>
        </div>
      </SheetFooter>
    </SheetContent>
  );
};

export default Cart;
