"use client";

import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { useCart } from "@/lib/providers/CartProvider";

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
      <div className="col-span-12 lg:col-span-6 prose">
        <h1>{product.data.name}</h1>
        <h3>{product.data.price} SEK</h3>
        <button
          className=" py-4 border-2 border-black w-full"
          onClick={() => addToCart({ ...product.data })}
        >
          Lägg till i varukorgen
        </button>

        <Markdown rehypePlugins={[rehypeRaw]}>
          {product.data.description}
        </Markdown>
      </div>
    </main>
  );
}
