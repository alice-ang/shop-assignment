"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Constraints } from "./Constraints";
import { useCart } from "@/lib/providers/CartProvider";
import { SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export const Navigation = () => {
  const [numOfItems, setNumOfItems] = useState(0);
  const { getCartTotalItems } = useCart();

  useEffect(() => {
    setNumOfItems(getCartTotalItems());
  }, [getCartTotalItems]);

  return (
    <nav className="sticky top-0 z-20 bg-background">
      <Constraints>
        <div className="flex flex-row justify-between ">
          <Link passHref href="/">
            <h4 className="font-bold">🍬🍭🍫🥤🍿</h4>
          </Link>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <FaShoppingCart size={28} />

              <span>{`( ${numOfItems} )`}</span>
            </Button>
          </SheetTrigger>
        </div>
      </Constraints>
    </nav>
  );
};
