"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "./ui/table";
import { useCart } from "@/lib/providers/CartProvider";
import Image from "next/image";

export const CheckoutTable = () => {
  const [numOfItems, setNumOfItems] = useState(0);
  const {
    cartItems,
    removeFromCart,
    addToCart,
    getCartTotalPrice,
    getCartTotalItems,
  } = useCart();

  useEffect(() => {
    setNumOfItems(getCartTotalItems());
  }, [getCartTotalItems]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produkt ({`${numOfItems}`})</TableHead>
          <TableHead>Pris</TableHead>
          <TableHead>Antal</TableHead>
          <TableHead className="text-right">Summa</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium flex space-x-4 items-center">
              <Image
                src={`https://www.bortakvall.se/${item.images.large}`}
                width={60}
                height={60}
                alt={item.name}
              />
              <p className="truncate">{item.name}</p>
            </TableCell>
            <TableCell>{item.price} SEK</TableCell>
            <TableCell>
              <div className="border flex w-fit">
                <Button onClick={() => removeFromCart(item)} variant="ghost">
                  -
                </Button>
                <Button variant="ghost">{item.quantity}</Button>
                <Button onClick={() => addToCart(item)} variant="ghost">
                  +
                </Button>
              </div>
            </TableCell>
            <TableCell className="text-right">
              {item.quantity * item.price} SEK
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Totalt:</TableCell>
          <TableCell className="text-right font-bold">
            {getCartTotalPrice()} SEK
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
