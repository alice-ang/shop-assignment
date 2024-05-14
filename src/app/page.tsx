"use client";
import { getProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
export default function Home() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (!products) {
    return;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bortakväll :)</h1>
      <div className="grid grid-cols-12 gap-4">
        {products.data.map((product) => (
          <div className="col-span-6 md:col-span-4 xl:col-span-3">
            <div className="aspect-square overflow-hidden relative">
              <Image
                src={`https://www.bortakvall.se/${product.images.thumbnail}`}
                alt={product.name}
                fill
                className="aspect-square hover:scale-110"
              />
            </div>

            <h1>{product.name}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}
