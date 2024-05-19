"use client";
import { Constraints, ProductItem, TagList } from "@/components";
import { getAllTags, getProducts, getProductsByTag } from "@/lib/api";
import { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function FilterPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
  });
  const { data: products } = useQuery({
    queryKey: ["products", search ?? ""],
    queryFn: () => getProductsByTag(search ?? ""),
  });

  if (!products) {
    return;
  }

  return (
    <main className=" min-h-screen">
      <Constraints>
        <h4>
          {products.data.products.length} träffar på "
          <span className="font-semibold">{products.data.name}</span>"
        </h4>
        {tags?.data && (
          <TagList
            tags={tags.data}
            handleClick={(tag) => router.push(`/tag?search=${tag.id}`)}
          />
        )}

        <div className="grid grid-cols-12  gap-2 md:gap-4">
          {products &&
            products.data.products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
        </div>
      </Constraints>
    </main>
  );
}
