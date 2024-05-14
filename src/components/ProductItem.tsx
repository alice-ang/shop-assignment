import { Product } from "@/lib/types";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type ProductItemProps = {
  product: Product;
};

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      passHref
      className="col-span-6 md:col-span-4 xl:col-span-3 border hover:shadow  "
    >
      <div className="aspect-square overflow-hidden relative">
        <Image
          src={`https://www.bortakvall.se/${product.images.thumbnail}`}
          alt={product.name}
          fill
          className="aspect-square hover:scale-110 transition-all ease-in-out "
        />
      </div>
      <div className="p-4">
        <h4>{product.name}</h4>
        <p>{product.price} SEK</p>
        <button>Lägg till i varukorv</button>
      </div>
    </Link>
  );
};
