"use client";
import React from 'react'
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MdDeleteOutline } from "react-icons/md";
import Link from 'next/link';
const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const totalPrice = cart?.items?.reduce((total, item) => {
    const price = item.product.price ?? 0;
    return total + price;
  }, 0);

  return (
    <div className='mt-24 container mx-auto px-4 '>
      <h2 className='text-2xl font-bold mb-4'>Sepet</h2>
      {!cart || !cart.items || cart.items.length === 0 ? (
        <p>Sepetiniz boş</p>
      ) : (
        <ul className='space-y-4'>
          {cart.items.map(item => (
            <li key={item.id} className='flex items-center justify-between border  p-4'>
              <div className='flex items-center gap-4 '>
                {item.image && (  
                  <Image
                  src={`http://127.0.0.1:8000${item.image}`}
                    alt={`Image ${item.id}`}
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
                onClick={() => removeFromCart(item.id)} 
                className='text-red bg-white hover:bg-red-600 hover:text-white'
              >
                <MdDeleteOutline size={10} />
              </Button>
              <p className="text-red-600 font-bold text-sm flex justify-end mt-3">{item.product.price} ₺</p>
              </div>
            </li>
          ))}
        </ul>
       
      )}
       <div className='flex flex-col items-end justify-end '>
        <h2 className="font-bold text-xl">
          {" "}
          Toplam Tutar :{" "}
          <span className="text-red-600 text-xl"> {totalPrice}TL </span>
        </h2>
        <Link href={`/buy`} > 
        <Button className='mt-5 mb-4' variant="myButton2">Sepeti Onayla</Button>
        </Link>
      </div>
      
    </div>
  )
}

export default CartPage;
