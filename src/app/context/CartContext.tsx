"use client"
import { createContext, useState, ReactNode } from "react";

interface CartContextType {
  cart: any[]; // Ürünleri burada tanımlayın (örneğin: { id: number, name: string }[])
  addToCart: (item: any) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
