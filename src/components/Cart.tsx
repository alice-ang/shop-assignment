"use client";
import React, { ReactNode } from "react";
import { useCart } from "@/lib/providers/CartProvider";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import Image from "next/image";

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    clearCart,
    getCartTotalPrice,
    getCartTotalItems,
  } = useCart();

  return (
    <ul className="border-2 border-red-500">
      {cartItems.map((product) => (
        <li
          className="flex flex-row-items-end justify-start border-b-2 border-black"
          key={product.id}
        >
          <Image
            src={`https://www.bortakvall.se/${product.images.large}`}
            width={100}
            height={100}
            alt={product.name}
          />

          <div className="prose w-full  ">
            <h3>{product.name}</h3>
            <div className="border flex w-fit">
              <button onClick={() => removeFromCart(product)}>-</button>
              <p>{product.quantity}</p>
              <button onClick={() => addToCart(product)}>+</button>
            </div>
            <div>
              <p>Price: {product.price} SEK</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
    // <div classNameName="drawer drawer-end">
    //   <input id="cart-drawer" type="checkbox" classNameName="drawer-toggle" />
    //   <div classNameName="drawer-content">{children}</div>
    //   <div classNameName="drawer-side">
    //     <label
    //       htmlFor="cart-drawer"
    //       aria-label="close sidebar"
    //       classNameName="drawer-overlay"
    //     ></label>
    //     <ul classNameName="menu p-4 w-full md:w-1/2 xl:w-1/3 min-h-full bg-base-200 text-base-content ">
    //       <h2>Varukorgen</h2>
    //       <p>{getCartTotalItems()} produkter i varukorgen</p>
    //       {cartItems.map((product) => (
    //         <li
    //           classNameName="flex flex-row-items-end justify-between"
    //           key={product.id}
    //         >
    //           <div classNameName="flex space-x-4">
    //             <Image
    //               src={`https://www.bortakvall.se/${product.images.large}`}
    //               width={100}
    //               height={100}
    //               alt={product.name}
    //             />
    //             <h4>{product.name}</h4>
    //           </div>
    //           <div classNameName="border flex">
    //             <button onClick={() => removeFromCart(product)}>
    //               <MdOutlineRemove />
    //             </button>
    //             <p>{product.quantity}</p>
    //             <button onClick={() => addToCart(product)}>
    //               <MdAdd />
    //             </button>
    //           </div>
    //           <div>
    //             <p>Price: {product.price} SEK</p>
    //           </div>
    //         </li>
    //       ))}
    //       <li classNameName="bg-red-100">Totalt: {getCartTotalPrice()} SEK</li>
    //       <li>
    //         <Link href={"/checkout"}> Gå till kassan</Link>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default Cart;
