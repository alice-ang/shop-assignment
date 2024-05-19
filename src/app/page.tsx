"use client";
import { Constraints, ProductItem } from "@/components";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const { data: initialProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (!initialProducts) {
    return;
  }

  return (
    <main className=" min-h-screen">
      <Constraints>
        <div className="grid grid-cols-12  gap-2 md:gap-4">
          {initialProducts?.data.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </Constraints>
    </main>
  );
}
