"use client";

import React from "react";
import { useAllProducts } from "../../../actions/getProducts";
import Image from "next/image";
import Link from "next/link";

const ProductItem = () => {
  const { products, error, loading } = useAllProducts();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!products || products.length === 0) return <p>Ürün bulunamadi.</p>;

  return (
    <div className="grid grid-cols-2 gap-6 p-4 bg-pink-100">
      {products.map((product) => {
        const imageUrl =
          product.images.length > 0
            ? product.images[0].image_url.startsWith("http")
              ? product.images[0].image_url
              : `http://localhost:8000/${product.images[0].image_url}`
            : "/placeholder.png";

        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`} 
            className="w-[500px] h-[500px] relative group overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src={imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-0 left-0 w-full bg-opacity-50 text-white p-4">
              <h2 className="text-lg font-bold">{product.name}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductItem;
