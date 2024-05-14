"use client";

import { useParams } from "next/navigation";
import { getProductById, getProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
      <h1>{product.data.name}</h1>
      <Markdown rehypePlugins={[rehypeRaw]}>
        {product.data.description}
      </Markdown>
    </main>
  );
}
