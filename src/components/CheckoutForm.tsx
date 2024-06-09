"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { toast } from "@/components/ui/use-toast";
import { placeOrder } from "@/lib/api";
import { useCart } from "@/lib/providers/CartProvider";
import { Order } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const formSchema = z.object({
  customer_first_name: z.string().min(1).max(255),
  customer_last_name: z.string().min(1).max(255),
  customer_address: z.string().min(1).max(255),
  customer_postcode: z.string().min(1).max(6),
  customer_city: z.string().min(1).max(255),
  customer_email: z.string().email(),
  customer_phone: z.string().optional(),
});

export const CheckoutForm = () => {
  const { clearCart, cartItems, getCartTotalPrice } = useCart();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (newOrder: Order) => placeOrder(newOrder),
    /**
     * Callback function called when the payment is settled.
     * If the order status is "success", it clears the cart and redirects to the checkout page.
     * If the order status is not "success", it displays a toast message with the error message.
     *
     * @param {object} data - The order data object.
     */

    onSettled(data) {
      if (data?.status === "success") {
        clearCart();
        router.push(`/checkout/${data.data.id}`);
      } else {
        toast({
          variant: "destructive",
          title: data?.message || "Något gick fel",
        });
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_first_name: "",
      customer_last_name: "",
      customer_address: "",
      customer_postcode: "",
      customer_city: "",
      customer_email: "",
      customer_phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = { ...values };

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-6 gap-2"
      >
        <div className="col-span-6 md:col-span-3">
          <FormField
            control={form.control}
            name="customer_first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Förnamn</FormLabel>
                <FormControl>
                  <Input placeholder="Lars" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-6 md:col-span-3">
          <FormField
            control={form.control}
            name="customer_last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eftermamn</FormLabel>
                <FormControl>
                  <Input placeholder="Larsson" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="customer_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adress</FormLabel>
                <FormControl>
                  <Input placeholder="Stora gatan 12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="customer_postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postnummer</FormLabel>
                <FormControl>
                  <Input placeholder="123 45" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="customer_city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stad</FormLabel>
                <FormControl>
                  <Input placeholder="Köping" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-postadress</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.se"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="customer_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefonnummer</FormLabel>
                <FormControl>
                  <Input placeholder="070-00000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full col-span-6">
          Bekräfta order
        </Button>
      </form>
    </Form>
  );
};
