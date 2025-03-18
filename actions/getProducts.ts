"use client";
import { useState, useEffect } from "react";
import axios from "axios";


interface ProductImage {
  id: number;
  image_url: string;  
}

interface ProductProps {
  name: string;
  id: number;
  description: string;
  images: ProductImage[];
}

export const useAllProducts = () => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/products/");
          setProducts(response.data);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
        } finally {
          setLoading(false); 
        }
      };
  
      fetchProducts();
    }, []);
  
    return { products, error, loading };
  };

export const useCarousel=()=>{
  const [carousel,setCarousel]=useState<ProductProps[] | null>(null);
  const [error,setError]=useState<string | null>(null);
  const [loading,setLoading]=useState<boolean>(true);

  useEffect(()=>{
    const fetchCarousel=async()=>{
      setLoading(true);
      try{
        const response=await axios.get("http://127.0.0.1:8000/api/carousals/",)
        setCarousel(response.data);
      }catch(error){
        if(error instanceof Error){
          setError(error.message);
        }
      }finally{
        setLoading(false);
      }
    };  
    fetchCarousel();
  },[]);
  return {carousel,error,loading};
}