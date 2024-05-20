"use client";
import {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useContext,
} from "react";
import { CartItem } from "../types";
import { toast } from "@/components/ui/use-toast";

type CartData = {
  cartItems: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (cartItem: CartItem) => void;
  clearCart: () => void;
  getCartTotalPrice: () => number;
  getCartTotalItems: () => number;
};

export const CartContext = createContext<CartData>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotalPrice: () => 0,
  getCartTotalItems: () => 0,
});

export default function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") as string)
      : []
  );

  const addToCart = (item: CartItem) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      if (isItemInCart.quantity < isItemInCart.stock_quantity) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        toast({
          variant: "destructive",
          title:
            " Kan inte lägga till fler produkter. Lagersaldo otillräckligt.",
        });
      }
    } else {
      if (item.stock_quantity > 0) {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);

        toast({
          variant: "success",
          title: `Lagt till ${item.name} i varukorgen.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Lagersaldo otillräckligt.",
        });
      }
    }
  };

  /**
   * Removes an item from the cart.
   * If the item quantity is 1, it removes the item from the cart.
   * If the item quantity is greater than 1, it decreases the quantity by 1.
   *
   * @param item - The item to be removed from the cart.
   */

  const removeFromCart = (item: CartItem) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart?.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartTotalItems = () => {
    return cartItems.reduce(
      (total, item) => (total = total + item.quantity),
      0
    );
  };

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotalPrice,
        getCartTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
