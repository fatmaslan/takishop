"use client"
import React from 'react'
import { useFavorites } from '../context/FavContext'
import { Button } from '@/components/ui/button';
import { MdDeleteOutline } from 'react-icons/md';
import Image from 'next/image';


const Favoritepage = () => {
    const {fav,removeFromFav}=useFavorites();
  return (
 
<div className='mt-24 container mx-auto px-4 '>
  <h2 className='text-2xl font-bold mb-4'>Favoriler</h2>

  {fav.length === 0 ? (
    <p>Favori Ürününüz yok!</p>
  ) : (
    <ul className='space-y-4'>
      {fav.map((item) => (
        <li key={item.id} className='flex items-center justify-between border p-4'>
          <div className='flex items-center gap-4 '>
            {item.product.images && item.product.images[0] && (  
              <Image
               src={item.product.images[0].image_url}
                alt={item.product.name}
                width={150}
                height={120}
                className="object-cover rounded-lg"
                priority
              />
            )}
            <h3 className='font-bold'>{item.product.name}</h3>
          </div>
          <div> 
            <Button 
              variant='outline'
              onClick={() => removeFromFav(item.id)} 
              className='text-red bg-white hover:bg-red-600 hover:text-white'
            >
              <MdDeleteOutline size={10} />
            </Button>
            <p className="text-red-600 font-bold text-sm flex justify-end mt-3">
              {item.product.price} ₺
            </p>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>
  )
}

export default Favoritepage
