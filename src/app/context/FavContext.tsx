"use client"
import { ReactNode, useContext, useEffect, useState, createContext } from "react";


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
  
  type FavItem = {
    id: number;
    product: Product;
    cart: number;
    image: string;
    total:number;
    item: number;
  };
  type FavType = {
    id: number;
    user: number;
    product: Product;
    created_at: string;
    items: FavItem[];
  }

   const FavContext = createContext<{
    fav: FavType[];
    addToFav: (productId: number) => void; 
    removeFromFav: (productId: number) => void;
    updateFav: () => void;
    } | null>(null);

export const FavProvider = ({ children }: { children: ReactNode }) => {
  const [fav, setFav] = useState([]);
  

  const fetchFavItems = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/favorites/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API'den gelen favori ürün verisi:", data); 
        setFav(data);
      }
    } catch (error) {
      console.error("Ürün verisi alinamadi:", error);
    }
  };
   useEffect(() => {
     fetchFavItems();
   }, []);
   const addToFav = async (productId: number) => {
    
    const token = localStorage.getItem("accessToken");
    // console.log("Token:", token);
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/fav/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        fetchFavItems(); 
        
      }
    } catch (error) {
      console.error("Ürün favorilenirken hata oluştu:", error);
    }
  };
  const removeFromFav = async (favId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/favorites/${favId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fav_id: favId }),
      });

      if (response.ok) {
        fetchFavItems(); 
      }
    } catch (error) {
      console.error("Ürün çikarilirken hata oluştu:", error);
    }
  };

    return (
        <FavContext.Provider value={{ fav, removeFromFav, addToFav,  updateFav: fetchFavItems}}>
          {children}
        </FavContext.Provider>
      );
}
export const useFavorites = () => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};