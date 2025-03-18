"use client"
import React from 'react'
import { useCategories } from '../../../actions/getProducts';
import Link from 'next/link';




const Categories = () => {
    const {categories,error,loading}=useCategories();


  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!categories || categories.length === 0) return <p>Kategori bulunamadi.</p>;


  return (
    <div className='mt-10 gap-10 flex items-center justify-center font-mono '>
        {categories.map((category)=>(
            <Link key={category.id} href={`/category/${category.id}`}>
                <span className='text-xl font-semibold text-gray-800 shadow-2xl hover:text-pink-900 transition-all '>{category.name}</span>
            </Link>
        ))}
    </div>
  )
}

export default Categories
