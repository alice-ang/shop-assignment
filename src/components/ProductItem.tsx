import { Product, TagProduct } from "@/lib/types";
import React, { FC } from "react";
import Image from "next/image";
import { useCart } from "@/lib/providers/CartProvider";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type ProductItemProps = {
  product: Product | TagProduct;
};

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div
      className={cn(
        product.stock_status === "outofstock"
          ? "opacity-50 pointer-events-none"
          : "",
        "flex flex-col justify-between  col-span-6 md:col-span-4 xl:col-span-3 hover:shadow-xl border-2 border-black transition-all ease-in-out"
      )}
    >
      <div className="aspect-square overflow-hidden relative border-b-2 border-black">
        <Link href={`/products/${product.id}`}>
          <Image
            src={`https://www.bortakvall.se/${product.images.thumbnail}`}
            alt={product.name}
            fill
            className="aspect-square hover:scale-110 transition-all ease-in-out "
          />
        </Link>
        {product.on_sale && (
          <div className="absolute bg-green-500 right-4 top-4 px-6 py-1 border-2 border-black font-bold">
            REA
          </div>
        )}
        {product.stock_status === "outofstock" && (
          <div className="absolute bg-red-500 left-4 top-4 px-6 py-1 border-2 border-black font-bold">
            Slut i lager
          </div>
        )}
      </div>
      <div className="">
        <div className="p-2 ">
          <p className="font-bold text-2xl line-clamp-2">{product.name}</p>
          <p>{product.price} SEK</p>
        </div>

        <Button
          onClick={() => addToCart(product)}
          className="w-full"
          variant="secondary"
        >
          Lägg till i varukorgen
        </Button>
      </div>
    </div>
  );
};
