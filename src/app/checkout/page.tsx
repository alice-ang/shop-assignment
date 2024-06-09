"use client";
import { CheckoutForm, CheckoutTable, Constraints } from "@/components";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/providers/CartProvider";

export default function CheckoutPage() {
  const { clearCart } = useCart();

  return (
    <Constraints>
      <main className="min-h-screen grid grid-cols-12 gap-4 ">
        <div className="col-span-12 lg:col-span-8 border-2 border-black space-y-4">
          <div className="flex flex-row justify-between items-end p-4">
            <h4 className="font-bold ">Din varukorg</h4>
            <Badge variant="destructive" onClick={() => clearCart()}>
              Rensa varukorg
            </Badge>
          </div>
          <CheckoutTable />
        </div>
        <div className="col-span-12 lg:col-span-4 border-2 border-black p-4 h-fit space-y-4">
          <h4 className="font-bold">Orderinformation</h4>
          <CheckoutForm />
        </div>
      </main>
    </Constraints>
  );
}
