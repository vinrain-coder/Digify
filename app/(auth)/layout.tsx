import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Shoepedi | Stylish Shoes",
  description: "Buy Affordable and Quality Shoes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} text-slate-700`}>
          <Toaster
            toastOptions={{
              style: {
                background: "rgb(51 65 85)",
                color: "#fff",
              },
            }}
          />
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">{children}</main>
            </div>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
