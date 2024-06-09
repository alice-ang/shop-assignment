import { useCart } from "@/lib/providers/CartProvider";

export const CartButton = () => {
  const { getCartTotalItems } = useCart();

  const items = getCartTotalItems();

  return <button>Items: {items}</button>;
};
