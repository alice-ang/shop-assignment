"use client";
import { Cart } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";

type CheckoutValues = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  postcode: string;
  city: string;
  phone?: string;
};

export default function CheckoutPage() {
  const { register, handleSubmit } = useForm<CheckoutValues>();
  const onSubmit: SubmitHandler<CheckoutValues> = (data) => console.log(data);

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Cart />
      <form onSubmit={handleSubmit(onSubmit)} className="border-2">
        <fieldset className="flex flex-col space-y-2">
          <legend>Order</legend>
          <input {...register("firstName")} placeholder="firstname" />
          <input {...register("lastName")} placeholder="lastname" />
          <input
            type="email"
            {...register("email")}
            placeholder="example@example.com"
          />

          <button type="submit">Bekräfta köp</button>
        </fieldset>
      </form>
    </main>
  );
}
