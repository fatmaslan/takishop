"use client";
import React from "react";
import {
  useCategories,
} from "../../../actions/getProducts";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  const { categories, error, loading } = useCategories();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!categories || categories.length === 0)
    return <p>Kategori bulunamadi.</p>;

  return (
    <div className=" mt-10 gap-5 flex items-center justify-center font-mono  ">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <div className=" hidden md:flex relative  w-[100px] h-[100px]  ">
            {category.images.length > 0 ? (
              <Image
                src={category.images[0].image}
                alt={category.name}
                width={75}
                height={75}
                className="object-cover rounded-full w-full h-full transition-transform duration-300 group-hover:scale-105 "
                
              />
            ) : (
              <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-200 rounded-full">
              Resim yok
            </div>
            )}
          </div>
          <span className="flex items-center justify-center text-center ">
              {category.name}
            </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
