"use client";
import { Constraints, ProductItem, TagList } from "@/components";
import { getAllTags, getProducts, getProductsByTag } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();

  const { data: initialProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
  });

  const { data: tagProducts } = useQuery({
    queryKey: ["products", search ?? ""],
    queryFn: () => getProductsByTag(search ?? ""),
    enabled: !!search,
  });

  if (!initialProducts) {
    return;
  }

  return (
    <main className=" min-h-screen space-y-4">
      <Constraints>
        {tagProducts?.data.products && tagProducts.data.name && (
          <h4>
            {tagProducts?.data.products.length} träffar på{" "}
            <span className="font-semibold italic">
              {tagProducts?.data.name}
            </span>
          </h4>
        )}

        {tags?.data && (
          <TagList
            activeTag={search}
            tags={tags.data}
            handleClick={(tag) => router.push(`?search=${tag.id}`)}
          />
        )}
        <div className="grid grid-cols-12 gap-2 md:gap-4 pt-4">
          {search
            ? tagProducts?.data.products.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))
            : initialProducts.data.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
        </div>
      </Constraints>
    </main>
  );
}
