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
  const [cartItems, setCartItems] = useState<Product[]>(
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") as string)
      : []
  );

  /**
   * Adds an item to the cart.
   * If the item is already in the cart, it increases the quantity by 1.
   * If the item is not in the cart, it adds the item with a quantity of 1.
   *
   * @param item - The item to be added to the cart.
   */
  const addToCart = (item: Product) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
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
