"use client";

import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { useCart } from "@/lib/providers/CartProvider";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const { data: product } = useQuery({
    queryKey: ["productById", params.id],
    queryFn: () => getProductById(params.id),
  });

  if (!product) {
    return null;
  }

  return (
    <main className=" min-h-screen grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 lg:col-span-6">
        <div className="aspect-square relative h-full w-full">
          <Image
            src={`https://www.bortakvall.se/${product.data.images.large}`}
            alt={product.data.name}
            fill
            className="aspect-square object-cover bg-center"
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 space-y-4">
        <h2 className="font-bold">{product.data.name}</h2>
        <h4>{product.data.price} SEK</h4>
        <h5>
          <span className="font-semibold">{product.data.stock_quantity}</span>
          st i lager
        </h5>
        <Button
          className="w-full"
          onClick={() => addToCart({ ...product.data })}
        >
          Lägg till i varukorgen
        </Button>

        <Markdown rehypePlugins={[rehypeRaw]}>
          {product.data.description}
        </Markdown>
      </div>
    </main>
  );
}
