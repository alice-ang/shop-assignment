"use client";
import { Cart, Constraints } from "@/components";
import { useCart } from "@/lib/providers/CartProvider";
import { useForm, SubmitHandler } from "react-hook-form";

import { Order } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Table } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, removeFromCart, addToCart, getCartTotalPrice, clearCart } =
    useCart();
  const mutation = useMutation({
    mutationFn: (newOrder: Order) => placeOrder(newOrder),
    onSuccess: (res) => {
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

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
  return (
    <Constraints>
      <main className="min-h-screen grid grid-cols-12 gap-4 ">
        <Cart />
        <div className="col-span-12 lg:col-span-8 border-2 border-black">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          {/* {cartItems.map((item) => (
              <div
                key={item.id}
                className=" p-2 col-span-4 flex items-center justify-between"
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
            ))} */}
        </div>
        <div className="col-span-12 lg:col-span-4 border-2 border-black p-4 h-fit">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className=" flex-col space-y-2 items-center text-center [&>input]:border-2 border-black grid grid-cols-2 gap-2 prose">
              <legend>Leverensinformation</legend>

              <input
                {...register("customer_first_name", {
                  maxLength: 255,
                  required: true,
                })}
                placeholder="firstname"
                required
                className="col-span-2 lg:col-span-1"
              />

              <input
                {...register("customer_last_name", {
                  maxLength: 255,
                  required: true,
                })}
                placeholder="lastname"
                className="col-span-2 lg:col-span-1"
              />
              <input
                type="text"
                {...register("customer_address", {
                  required: true,
                  maxLength: 255,
                })}
                placeholder="Address"
                className="col-span-2 "
              />
              <input
                type="email"
                {...register("customer_email", {
                  required: true,
                })}
                placeholder="example@example.com"
                className="col-span-2 "
              />

              <input
                type="text"
                {...register("customer_postcode", {
                  maxLength: 6,
                })}
                required
                placeholder="Postcode"
                className="col-span-1 "
              />

              <input
                type="text"
                {...register("customer_city", {
                  maxLength: 255,
                })}
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
            </fieldset>
            <Button type="submit" className="w-full">
              Bekräfta köp
            </Button>
          </form>
        </div>
      </main>
    </Constraints>
  );
}
