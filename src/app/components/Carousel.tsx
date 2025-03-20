"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCarousel } from "../../../actions/getProducts";
import Image from "next/image";

const CarouselPage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }) 
  );
  const { carousel, error, loading } = useCarousel();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!carousel || carousel.length === 0) return <p>Ürün bulunamadi.</p>;

  return (
    <div className="w-full overflow-x-hidden"> 
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-[1500px]  bg-pink-100"
    >
      <CarouselContent className="gap-4">
        {carousel.map((item) =>
          item.images.map((img) => (
            <CarouselItem key={img.id} className="w-full">
              <Card className="w-full border-none shadow-none">
                <CardContent className="relative w-full h-[400px] p-0">
                  <Image
                    src={
                      img.images.startsWith("http")
                        ? img.images
                        : `http://localhost:8000/${img.images}`
                    }
                    alt={`Image ${img.id}`}
                    width={1500}
                    height={400}
                    quality={100}
                    className="object-cover"
                    priority
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <div className="flex justify-between mt-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
    </div>
  );
};

export default CarouselPage;
