import React from "react";
import { useCart } from "@/lib/providers/CartProvider";

export const Cart = () => {
  const { decrease, removeFromCart, cartItems, increase, getCartTotalPrice } =
    useCart();

  return (
    <div className="border-2">
      <h3>Total Cart Amount: {getCartTotalPrice()}SEK</h3>

      {cartItems.map((product) => (
        <div className="" key={product.id}>
          <img
            src={`https://www.bortakvall.se/${product.images.large}`}
            alt={product.name}
          />
          <div>
            <h4>{product.name}</h4>

            <p>Price: {product.price} SEK</p>

            <button onClick={() => decrease(product.id)}>-</button>
            <button onClick={() => removeFromCart(product)}>Remove</button>
            <button onClick={() => increase(product.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
