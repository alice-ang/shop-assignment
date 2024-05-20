"use client";
import { CheckoutForm, CheckoutTable, Constraints } from "@/components";

export default function CheckoutPage() {
  return (
    <Constraints>
      <main className="min-h-screen grid grid-cols-12 gap-4 ">
        <div className="col-span-12 lg:col-span-8 border-2 border-black space-y-4">
          <h4 className="font-bold">Din varukorg</h4>
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
