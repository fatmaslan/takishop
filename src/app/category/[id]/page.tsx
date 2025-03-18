"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { useDetailCategories } from '../../../../actions/getProducts';
import Image from 'next/image';
import Link from 'next/link';

const CategoryDetail = () => {
  const params = useParams();
  const categoryId = params.id as string;

  const { categories, error, loading } = useDetailCategories(categoryId);
  console.log("Category ID:", categoryId);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!categories || categories.length === 0) return <p>Ürün bulunamadi.</p>;

  return (
    <div className='mt-20'>
  <div className='flex flex-col md:flex-row gap-6 flex-wrap p-5'>
    {categories.map((product) => {
      const image_url = product.images.length > 0 ? product.images[0].image_url : "/placeholder.png";
      return (
        <Link  href={`/product/${product.id}`} key={product.id} className='w-[250px] flex flex-col items-center gap-2 group overflow-hidden  '>
          <div className='relative'>
            <Image 
              src={image_url} 
              alt={product.name} 
              width={200} 
              height={200} 
              className='rounded-lg object-cover transition-transform duration-300 group-hover:scale-105'
            />
            <h2 className='text-sm font-medium mb-2 text-center'>{product.name}</h2>
          </div>
          
        </Link>
      )
    })}
  </div>
</div>

  )
}

export default CategoryDetail;
