"use client";
import {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useContext,
} from "react";
import { Product } from "../types";

type CartData = {
  cartItems: Product[];
  addToCart: (newItem: Product) => void;
  removeFromCart: (item: Product) => void;
  clearCart: () => void;
  getCartTotalPrice: () => number;
  decrease: (id: number) => void;
  increase: (id: number) => void;
  getCartTotalItems: () => number;
};

export const CartContext = createContext<CartData>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotalPrice: () => 0,
  decrease: () => {},
  increase: () => {},
  getCartTotalItems: () => 0,
});

export default function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<Product[]>(
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") as string)
      : []
  );

  const addToCart = (item: Product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.stock_quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, stock_quantity: 1 }]);
    }
  };

  const removeFromCart = (item: Product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart?.stock_quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.stock_quantity - 1 }
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
      (total, item) => total + item.price * item.stock_quantity,
      0
    );
  };

  const getCartTotalItems = () => {
    return cartItems.reduce(
      (total, item) => (total = total + item.stock_quantity),
      0
    );
  };

  const increase = (id: number) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.stock_quantity + 1 }
          : cartItem
      )
    );
  };

  const decrease = (id: number) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              count:
                cartItem.stock_quantity > 1 ? cartItem.stock_quantity - 1 : 1,
            }
          : cartItem
      )
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
        increase,
        decrease,
        getCartTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
