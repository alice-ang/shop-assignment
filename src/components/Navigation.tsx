"use client";
import React from "react";
import { Constraints } from "./Constraints";
import { useCart } from "@/lib/providers/CartProvider";

export const Navigation = () => {
  const { getCartTotalItems } = useCart();
  return (
    <Constraints>
      <nav className="flex flex-row justify-between">
        <h2>Logo</h2>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
        >
          {getCartTotalItems()}
        </button>
      </nav>
    </Constraints>
  );
};
