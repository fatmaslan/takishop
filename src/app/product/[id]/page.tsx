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
import { useParams } from "next/navigation";
import { useDetailProducts } from "../../../../actions/getProducts";
import Image from "next/image";

const Detailpage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const params = useParams();
  const productId = params.id as string;
  const { products, error, loading } = useDetailProducts(productId);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!products || products.length === 0) return <p>Ürün bulunamadi.</p>;

  return (
  <Carousel
       plugins={[plugin.current]}
       className="w-full max-w-[500px]  bg-pink-100"
     >
       <CarouselContent className="gap-4">
         {products.map((item) =>
           item.images.map((img) => (
             <CarouselItem key={img.id} className="w-full">
               <Card className="w-full border-none shadow-none">
                 <CardContent className="relative w-full h-[400px] p-0">
                   <Image
                     src={
                      img.images && img.images.startsWith("http") 
                         ? img.images
                         : `http://localhost:8000/${img.images}`
                     }
                     alt={`Image ${img.id}`}
                     width={500}
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
  )
};

export default Detailpage;
