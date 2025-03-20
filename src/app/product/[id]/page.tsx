"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import { useDetailProducts } from "../../../../actions/getProducts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { useCart } from "@/app/context/CartContext";

const Detailpage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const params = useParams();
  const productId = params.id as string;
  const { products, error, loading } = useDetailProducts(productId);
  const { addToCart } = useCart();

  if (loading) return <p className="mt-44">Yükleniyor...</p>;
  if (error) return <p className="mt-44">Hata oluştu: {error}</p>;
  if (!products || products.length === 0)
    return <p className="mt-44 text-center">Ürün bulunamadi.</p>;

  const product = products[0];

  return (
    <div className="container mx-auto px-4 py-10 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="w-full">
          <Carousel
            plugins={[plugin.current]}
            className="w-full  rounded-xl"
          >
            <CarouselContent className="gap-4">
              {product.images.map((img) => (
                <CarouselItem key={img.id} className="w-full">
                  <Card className="w-full border-none shadow-none">
                    <CardContent className="relative w-full h-[500px] p-5">
                      <Image
                        src={img.image_url}
                        alt={`Image ${img.id}`}
                        width={500}
                        height={400}
                        quality={100}
                        className="object-cover rounded-lg"
                        priority
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-pink-950 text-3xl">{product.name}</h2>
          <p className="text-gray-700 text-base leading-6">
            <span className="text-pink-950 font-semibold">Ürün hakkında: </span>
            {product.description}
          </p>
          <h3 className="text-red-600 text-2xl font-bold">
            <span className="text-black mr-2">Fiyat:</span> {product.price}₺
          </h3>
          <div className="flex flex-wrap gap-4 mt-6">
            <Button
              variant="myButton2"
              className=" flex items-center justify-center"
            >
              <CiHeart size={20} />
            </Button>
            <Button
              onClick={() => {
                console.log("Sepete ekleme butonuna tiklandi");
                addToCart(product.id);
              }}
              variant="myButton2"
              className="flex-1 min-w-[120px]"
            >
              Sepete Ekle
            </Button>
            <Button variant="myButton2" className="flex-1 min-w-[120px]">
              Hemen Al
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailpage;
