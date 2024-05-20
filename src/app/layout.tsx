import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/lib/providers/TanStackProvider";
import { Cart, Navigation } from "@/components";
import CartProvider from "@/lib/providers/CartProvider";
import { cn } from "@/lib/utils";
import { Sheet } from "@/components/ui/sheet";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "400", "600"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Bortakväll.se",
  description: "🍬🍭🍫🥤🍿 När du ska ha en Bortakväl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProvider>
      <CartProvider>
        <html lang="en">
          <body
            className={cn(
              "min-h-screen bg-background font-poppins antialiased",
              poppins.variable
            )}
          >
            <Suspense>
              <Sheet>
                <Navigation />

                {children}
                <Cart />
                <Toaster />
              </Sheet>
            </Suspense>
          </body>
        </html>
      </CartProvider>
    </TanStackProvider>
  );
}
