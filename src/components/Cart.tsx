"use client";
import React, { ReactNode } from "react";
import { useCart } from "@/lib/providers/CartProvider";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

export const Cart = ({ children }: { children: ReactNode }) => {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    clearCart,
    getCartTotalPrice,
    getCartTotalItems,
  } = useCart();

  return (
    <div className="drawer drawer-end">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="cart-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-full md:w-1/2 xl:w-1/3 min-h-full bg-base-200 text-base-content ">
          <h2>Varukorgen</h2>
          <p>{getCartTotalItems()} produkter i varukorgen</p>
          {cartItems.map((product) => (
            <li
              className="flex flex-row-items-end justify-between"
              key={product.id}
            >
              <div className="flex space-x-4">
                <Image
                  src={`https://www.bortakvall.se/${product.images.large}`}
                  width={100}
                  height={100}
                  alt={product.name}
                />
                <h4>{product.name}</h4>
              </div>
              <div className="border flex">
                <button onClick={() => removeFromCart(product)}>
                  <MdOutlineRemove />
                </button>
                <p>{product.quantity}</p>
                <button onClick={() => addToCart(product)}>
                  <MdAdd />
                </button>
              </div>
              <div>
                <p>Price: {product.price} SEK</p>
              </div>
            </li>
          ))}
          <li className="bg-red-100">Totalt: {getCartTotalPrice()} SEK</li>
          <li>
            <Link href={"/checkout"}> Gå till kassan</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
