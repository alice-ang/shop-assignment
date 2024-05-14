"use client";

import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams<{ id: string }>();

  const { data: product } = useQuery({
    queryKey: ["products", params.id],
    queryFn: () => getProductById(params.id),
  });

  if (!product) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="aspect-square relative h-full w-full">
        <Image
          src={`https://www.bortakvall.se/${product.data.images.large}`}
          alt={product.data.name}
          fill
          className="aspect-square object-cover bg-center"
        />
      </div>
      <h1>{product.data.name}</h1>
      <Markdown rehypePlugins={[rehypeRaw]}>
        {product.data.description}
      </Markdown>
    </main>
  );
}
