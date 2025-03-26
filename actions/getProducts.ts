"use client";
import { useState, useEffect } from "react";
import axios from "axios";


interface ProductImage {
  id: number;
  image_url: string;  
  images:string;
  image:string;
  product_id:number;
  
}

interface ProductProps {
  name: string;
  id: number;
  description: string;
  price: number;
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

export const useCategories=()=>{
  const [categories,setCategories]=useState<ProductProps[] | null>(null);
  const [error,setError]=useState<string | null>(null);
  const [loading,setLoading]=useState<boolean>(true);

  useEffect(()=>{
    const fetchCategories=async()=>{
      setLoading(true);
      try{
        const response=await axios.get("http://127.0.0.1:8000/api/categories/")
        setCategories(response.data);
      }catch(error){
        if(error instanceof Error){
          setError(error.message);
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, []);

  return { categories, error, loading };
};

export const useDetailCategories = (categoryId: string) => {
  const [categories, setCategories] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/categories/${categoryId}`);
        setCategories(response.data.products);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };fetchCategories();
    
  }, [categoryId]); 

  return { categories, error, loading };
};
export const useDetailProducts = (productId: string) => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`);
        setProducts([response.data]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };fetchProducts();
    
  }, [productId]); 

  return { products, error, loading };
};
export const useHomeProducts = () => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/discounted/`);
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };fetchProducts();
    
  }, []); 

  return { products, error, loading };
};