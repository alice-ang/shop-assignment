"use client";

import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { useCart } from "@/lib/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Constraints } from "@/components";
import { TagList } from "@/components/TagList";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const router = useRouter();

  const { data: product } = useQuery({
    queryKey: ["productById", params.id],
    queryFn: () => getProductById(params.id),
  });

  if (!product) {
    return null;
  }

  return (
    <Constraints>
      <main className=" min-h-screen grid grid-cols-12 gap-4 p-4 ">
        <div className="col-span-12 lg:col-span-6">
          <div className="aspect-square relative h-full w-full ">
            <Image
              src={`https://www.bortakvall.se/${product.data.images.large}`}
              alt={product.data.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="aspect-square object-contain bg-contain"
            />

            <div className="flex flex-col space-y-2 absolute left-4 top-4 ">
              {product.data.on_sale && (
                <div className=" bg-green-500 px-6 py-1 border-2 border-black font-bold w-fit">
                  REA
                </div>
              )}

              {product.data.stock_status === "outofstock" && (
                <div className=" bg-red-500 px-6 py-1 border-2 border-black font-bold">
                  Slut i lager
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 space-y-4">
          <h2 className="font-bold">{product.data.name}</h2>
          <h4>{product.data.price} SEK</h4>
          {product.data.stock_quantity && (
            <p>
              <span className="font-semibold">
                {product.data.stock_quantity}
              </span>
              st i lager
            </p>
          )}

          <Button
            className="w-full"
            onClick={() => addToCart({ ...product.data })}
          >
            Lägg till i varukorgen
          </Button>

          <TagList
            tags={product.data.tags}
            handleClick={(tag) => router.push(`/?search=${tag.id}`)}
          />
          <Markdown rehypePlugins={[rehypeRaw]}>
            {product.data.description}
          </Markdown>
        </div>
      </main>
    </Constraints>
  );
}
