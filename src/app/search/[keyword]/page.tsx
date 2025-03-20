"use client"
import ProductItem from '@/app/components/ProductItem';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Searchpage = () => {
  const {keyword}= useParams();
  const decodedKeyword = decodeURIComponent(keyword);
  const [loading, setLoading] = useState(true);
  const [product,setProduct]=useState([]);
  const [error,setError]=useState()



  useEffect(()=>{
    const fetchProducts = async ()=>{
      if (!keyword || keyword.length < 3 ){ 
        setProduct([])
        setLoading(false)
        return;
      }
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/api/products/?search=${decodedKeyword}`)
        if (!response.ok) {
          throw new Error("Veri alinirken bir hata oluştu");
        }
        const data = await response.json();
        console.log("Gelen ürünler:", data);
        
        setProduct(data)

      } catch (error) {
        console.log("hata",error)
        setError(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchProducts()
  },[keyword, decodedKeyword])
  return (
    <div className='mt-22'>
      <div className="mt-24 flex ">
      {loading ? (
        <p className="flex items-center justify-center mt-32 ">
          <span>
            <Loader2 size={40} />
          </span>
        </p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : product.length > 0 ? (
        product.map((item) => <ProductItem key={item.id} item={item} />)
      ) : (
        <p>No products found.</p>
      )}
    </div>
    </div>
  )
}

export default Searchpage 