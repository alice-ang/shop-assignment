"use client";
import { useCart } from "@/lib/providers/CartProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QuantityButtons } from "./QuantityButtons";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const CheckoutTable = () => {
  const [numOfItems, setNumOfItems] = useState(0);
  const { cartItems, getCartTotalPrice, getCartTotalItems } = useCart();

  useEffect(() => {
    setNumOfItems(getCartTotalItems());
  }, [getCartTotalItems]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produkt ({`(${numOfItems}`})</TableHead>
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
              <QuantityButtons product={item} />
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
