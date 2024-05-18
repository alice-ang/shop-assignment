"use client";
import React from "react";
import { CartButton } from "./CartButton";

export const Navigation = () => {
  return (
    <nav>
      <div className="flex flex-row justify-between">
        <ul>
          <li>Link</li>
        </ul>
        <div>
          <CartButton />
        </div>
      </div>
    </nav>
  );
};
