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
    <div className="card  col-span-6 md:col-span-4 xl:col-span-3  hover:shadow-xl border-2">
      <figure className="aspect-square overflow-hidden relative border-b">
        <Image
          src={`https://www.bortakvall.se/${product.images.thumbnail}`}
          alt={product.name}
          fill
          className="aspect-square hover:scale-110 transition-all ease-in-out "
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}

          {product.on_sale && (
            <div className="badge badge-secondary"> On sale</div>
          )}
        </h2>
        <p>{product.price} SEK</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Lägg till i varukorgen
          </button>
        </div>
        {/* <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div> */}
      </div>
    </div>
  );
};
