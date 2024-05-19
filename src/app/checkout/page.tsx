"use client";
import { Constraints } from "@/components";
import { useCart } from "@/lib/providers/CartProvider";
import { useForm, SubmitHandler } from "react-hook-form";

import { MdAdd, MdOutlineRemove } from "react-icons/md";
import Image from "next/image";
import { Order } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "@/lib/api";

export default function CheckoutPage() {
  const { cartItems, removeFromCart, addToCart, getCartTotalPrice, clearCart } =
    useCart();
  const mutation = useMutation({
    mutationFn: (newOrder: Order) => placeOrder(newOrder),
    onSuccess: (res) => {
      console.log(res.data.id);
      clearCart();
      reset();
    },
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>();

  const onSubmit: SubmitHandler<Order> = (data) => {
    const orderItems = cartItems.map((item) => ({
      product_id: item.id,
      qty: item.quantity,
      item_price: item.price,
      item_total: item.price * item.quantity,
    }));

    mutation.mutate({
      ...data,
      order_items: orderItems,
      order_total: getCartTotalPrice(),
    });
  };

  // I varukorgen ska en “Gå till kassan”-knapp finnas som visar
  //en ny vy där man får fylla i namn, adress, postnr, ort, telefon (ska ej vara required) och e-post.

  // customer_first_name (sträng, max 255 tecken)
  // customer_last_name (sträng, max 255 tecken)
  // customer_address (sträng, max 255 tecken)
  // customer_postcode  (sträng, max 6 tecken)
  // customer_city (sträng, max 255 tecken)
  // customer_email (sträng, måste vara en e-postadress, max 255 tecken)
  // customer_phone (ej obligatorisk, måste vara en sträng, max 255 tecken)

  // order_total måste vara summan av alla item_total
  // order_items
  // product_id måste existera
  // qty måste vara ett positivt heltal
  // item_price måste stämma för product_id
  // item_total måste vara qty multiplicerat med item_price

  return (
    <Constraints>
      <main className=" min-h-screen grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 border-2">
          <div className="grid grid-cols-4 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border p-2 col-span-4 flex items-center justify-between"
              >
                <span className="space-x-4 flex items-center">
                  <Image
                    src={`https://www.bortakvall.se/${item.images.large}`}
                    width={100}
                    height={100}
                    alt={item.name}
                  />
                  <p className="font-bold">{item.name}</p>
                </span>
                <p>{item.price} SEK</p>
                <div className="flex border border-black">
                  <button onClick={() => removeFromCart(item)} className="p-2">
                    <MdOutlineRemove />
                  </button>
                  <p className="p-2 border border-x-black">{item.quantity}</p>
                  <button onClick={() => addToCart(item)} className="p-2">
                    <MdAdd />
                  </button>
                </div>
                <p>{item.price * item.quantity} SEK</p>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-12 lg:col-span-4 border-2 p-4"
        >
          <fieldset className=" flex-col space-y-2 items-center text-center [&>input]:border-2 border-black grid grid-cols-2 gap-2">
            <legend>Leverensinformation</legend>

            <input
              {...register("customer_first_name")}
              placeholder="firstname"
              required
              className="col-span-2 lg:col-span-1"
            />

            <input
              {...register("customer_last_name")}
              placeholder="lastname"
              required
              className="col-span-2 lg:col-span-1"
            />
            <input
              type="email"
              {...register("customer_email")}
              placeholder="example@example.com"
              className="col-span-2 "
            />

            <input
              type="text"
              {...register("customer_address")}
              required
              placeholder="Address"
              className="col-span-2 "
            />

            <input
              type="text"
              {...register("customer_postcode")}
              required
              placeholder="Postcode"
              className="col-span-1 "
            />

            <input
              type="text"
              {...register("customer_city")}
              required
              placeholder="City"
              className="col-span-1"
            />

            <input
              type="tel"
              {...register("customer_phone")}
              className="col-span-2 "
              placeholder="phone"
            />

            <button type="submit">Bekräfta köp</button>
            {mutation.isSuccess ? <div>Order added!</div> : null}
          </fieldset>
        </form>
      </main>
    </Constraints>
  );
}
