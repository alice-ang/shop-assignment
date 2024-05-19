"use client";
import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useWindowSize } from "@uidotdev/usehooks";

const Confetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});
export default function CheckoutConfirmationPage() {
  const params = useParams<{ id: string }>();
  const { width, height } = useWindowSize();

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h4>Tack för din beställning! 🫶</h4>
        <p>
          Ditt ordernummer är: <span className="font-bold">{params.id}</span>
        </p>
      </div>
      <Confetti width={width ?? 0} height={height ?? 0} recycle={false} />
    </>
  );
}
