"use client";
import React from "react";
import { Constraints } from "./Constraints";
import { useCart } from "@/lib/providers/CartProvider";

export const Navigation = () => {
  const { getCartTotalItems } = useCart();
  return (
    <Constraints>
      <nav className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">
            Bortakväll.se
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label htmlFor="cart-drawer">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle drawer-button "
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-primary badge-sm indicator-item">
                    {getCartTotalItems()}
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>
      </nav>
    </Constraints>
  );
};
