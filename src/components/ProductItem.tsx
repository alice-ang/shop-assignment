import { Product } from "@/lib/types";
import React, { FC } from "react";
import Image from "next/image";
import { useCart } from "@/lib/providers/CartProvider";

type ProductItemProps = {
  product: Product;
};

export const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="  col-span-6 md:col-span-4 xl:col-span-3  hover:shadow-xl border-2 border-black transition-all ease-in-out">
      <figure className="aspect-square overflow-hidden relative border-b-2 border-black">
        <Image
          src={`https://www.bortakvall.se/${product.images.thumbnail}`}
          alt={product.name}
          fill
          className="aspect-square hover:scale-110 transition-all ease-in-out "
        />
      </figure>
      <div>
        <div className="p-4">
          <h2 className="font-bold">
            {product.name}

            {product.on_sale && (
              <div className="badge badge-secondary"> On sale</div>
            )}
          </h2>
          <p>{product.price} SEK</p>
        </div>
        <button
          onClick={() => addToCart(product)}
          className=" py-4 border-t-2 border-black w-full"
        >
          Lägg till i varukorgen
        </button>
      </div>
    </div>
  );
};
