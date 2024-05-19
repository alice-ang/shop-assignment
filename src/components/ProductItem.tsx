import { Product } from "@/lib/types";
import React, { FC } from "react";
import Image from "next/image";
import { useCart } from "@/lib/providers/CartProvider";
import Link from "next/link";

type ProductItemProps = {
  product: Product;
};

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="flex flex-col justify-between  col-span-6 md:col-span-4 xl:col-span-3  hover:shadow-xl border-2 border-black transition-all ease-in-out">
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
          <div className="absolute bg-yellow-500 right-4 top-4 px-6 py-2 border-2 border-black font-bold">
            On sale
          </div>
        )}
      </div>
      <div className="prose">
        <div className="p-2 ">
          <h3>{product.name}</h3>
          <p>{product.price} SEK</p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className=" py-4 border-t-2 border-black w-full h-fit"
        >
          Lägg till i varukorgen
        </button>
      </div>
    </div>
  );
};
