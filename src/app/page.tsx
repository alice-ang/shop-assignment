"use client";
import { Cart, ProductItem } from "@/components";
import { getProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

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
      <Cart />
      <div className="grid grid-cols-12 gap-4">
        {products.data.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}
