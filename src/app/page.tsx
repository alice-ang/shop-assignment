"use client";
import { Cart, Constraints, ProductItem } from "@/components";
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
    <main className=" min-h-screen">
      <Constraints>
        <div className="grid grid-cols-12  gap-2 md:gap-4">
          {products.data.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </Constraints>
    </main>
  );
}
