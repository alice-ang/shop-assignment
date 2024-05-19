import React from "react";
import { useParams } from "next/navigation";

export default function CheckoutConfirmationPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex flex-col justify-center items-centers">
      <h1>Tack för din beställning!</h1>
      <p>Ditt ordernummer är: {params.id}</p>
    </div>
  );
}
