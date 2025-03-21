"use client";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

type ProductImage = {
  id: number;
  image_url: string;
  product: number;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  brands: number[];
  categories: number[];
};

type CartItem = {
  id: number;
  product: Product;
  cart: number;
  image: string;
  total:number;
  item: number;
};
type CartType = {
  id: number;
  user: number;
  product: Product;
  created_at: string;
  item:number;
  items: CartItem[];
}
const CartContext = createContext<{
  cart: CartType[] | null;
  addToCart: (productId: number) => void; 
  removeFromCart: (productId: number) => void;
  updateCart: () => void;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartType[]>([]);
  const router = useRouter();

  const fetchCartItems = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/carts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API'den gelen sepet verisi:", data); 
        setCart(data);
      }
    } catch (error) {
      console.error("Sepet verisi alinamadi:", error);
    }
  };


  useEffect(() => {
    fetchCartItems();
  }, []);


  const addToCart = async (productId: number) => {
    
    const token = localStorage.getItem("accessToken");
    // console.log("Token:", token);
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        fetchCartItems(); 
        router.push("/cart");
      }
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
    }
  };


  const removeFromCart = async (productId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cart/${productId}/remove/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        fetchCartItems(); 
      }
    } catch (error) {
      console.error("Ürün sepetten çikarilirken hata oluştu:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart: fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
