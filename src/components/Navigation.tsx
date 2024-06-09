"use client";
import { useCart } from "@/lib/providers/CartProvider";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Constraints } from "./Constraints";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";

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
          <div className="flex gap-2 items-end ">
            <Button variant={"ghost"}>
              <Link passHref href="/account">
                <CircleUserRound size={28} />
              </Link>
            </Button>

            <SheetTrigger asChild>
              <Button variant={"ghost"}>
                <ShoppingCart size={28} fill="black" />

                <span>{`( ${numOfItems} )`}</span>
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </Constraints>
    </nav>
  );
};
