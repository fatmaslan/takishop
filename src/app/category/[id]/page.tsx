"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useDetailCategories } from "../../../../actions/getProducts";
import Image from "next/image";
import Link from "next/link";

const CategoryDetail = () => {
  const params = useParams();
  const categoryId = params.id as string;

  const { categories, error, loading } = useDetailCategories(categoryId);

  if (loading) return <p className="text-center mt-20">Yükleniyor...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Hata oluştu: {error}</p>;

  if (!categories || categories.length === 0) {
    return (
      <div className="mt-44 text-center text-gray-600 text-lg font-semibold">
        Kategoriye ait ürün bulunamadi!
      </div>
    );
  }

  return (
    <div className="mt-20 p-5 flex flex-row items-center justify-center w-full h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((product) => {
          const image_url =
            product.images.length > 0
              ? product.images[0].image_url
              : "/placeholder.png";

          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="relative group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative w-60 h-60 p-5">
                <Image
                  src={image_url}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-md font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                  {product.name}
                </h2>
                <p className="text-xl font-bold text-pink-600 text-end">{product.price} ₺</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDetail;
