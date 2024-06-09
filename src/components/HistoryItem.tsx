"use client";
import { getProductById } from "@/lib/api";
import { OrderItem } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { TableCell, TableRow } from "./ui/table";

export const HistoryItem = ({ orderItem }: { orderItem: OrderItem }) => {
  const { data: product } = useQuery({
    queryKey: ["productById", orderItem.product_id],
    queryFn: () => getProductById(orderItem.product_id.toString()),
  });

  if (!product) {
    return null;
  }

  return (
    <TableRow key={product.data.id}>
      <TableCell className="font-medium flex space-x-4 items-center">
        <Image
          src={`https://www.bortakvall.se/${product.data.images.thumbnail}`}
          width={60}
          height={60}
          alt={product.data.name}
        />
        <p className="truncate">{product.data.name}</p>
      </TableCell>
      <TableCell>{orderItem.item_price} SEK</TableCell>
      <TableCell>{orderItem.qty}st</TableCell>
      <TableCell className="text-right">{orderItem.item_total} SEK</TableCell>
    </TableRow>
  );
};
