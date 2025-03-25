import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { FavProvider } from "./context/FavContext";
import { OrderProvider } from "./context/OrderContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "takiShop",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrderProvider> 
        <FavProvider>
        <CartProvider> 
        <Navbar/>
       
        <div className="flex flex-col min-h-screen">
        
        {children}
        </div>
        <Footer/>
        </CartProvider>
        </FavProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
