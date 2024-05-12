import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://www.bortakvall.se/api/v2/products").then((res) =>
        res.json()
      ),
  });
};
