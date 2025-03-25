"use client"
import React from 'react';
import Categories from '../components/Categories';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { MdDeleteOutline } from 'react-icons/md';

const ProfilePage = () => {
  const { cart, removeFromCart } = useCart();
  const { orders } = useOrder();

  const totalPrice = cart?.items?.reduce((total, item) => {
    const price = item.product.price ?? 0;
    return total + price;
  }, 0);

  return (
    <div className='mt-16 mx-auto '>
      <Categories />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
        <div className='flex flex-col bg-white rounded-lg gap-6 p-8 max-w-md'>
          <h2 className="text-xl font-bold mb-4">Hesap</h2>
          <Link className='text-pink-950 hover:text-pink-600 font-semibold' href="/order">Tüm Siparişlerim</Link>
          <Link className='text-pink-950 hover:text-pink-600 font-semibold' href="/favorites">Favorilerim</Link>
          <Link className='text-pink-950 hover:text-pink-600 font-semibold' href="/cart">Kayitli Kartlar</Link>
          <Link className='text-pink-950 hover:text-pink-600 font-semibold' href="/cart">Kayitli Adresler</Link>
        </div>
        <div className="container mx-auto px-4 mt-5">
          <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>

          {orders.length === 0 ? (
            <p>Henüz siparişiniz bulunmuyor.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 shadow-md bg-white">
                  <h3 className="font-bold mb-2">Sipariş Numarasi: {order.id}</h3>
                  <p className="text-sm mb-2">Tarih: {order.date}</p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border p-2 rounded">
                        <span>{item.productName}</span>
                        <span>{item.quantity} x {item.price}₺</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-bold mt-2 text-right">
                    Toplam: {order.totalAmount} ₺
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white p-8 rounded-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Sepetiniz</h2>

          {!cart || !cart.items || cart.items.length === 0 ? (
            <p>Sepetiniz boş</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <Image
                          src={`http://127.0.0.1:8000${item.image}`}
                          alt={item.product.name}
                          width={50}
                          height={50}
                          className="object-cover rounded-lg"
                          priority
                        />
                      )}
                      <h3 className="font-bold text-sm">{item.product.name}</h3>
                    </div>
                    <div className="flex flex-col items-end">
                      <Button
                        variant="outline"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red bg-white hover:bg-red-600 hover:text-white"
                      >
                        <MdDeleteOutline size={20} />
                      </Button>
                      <p className="text-red-600 font-bold text-sm mt-2">{item.product.price} ₺</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-end mt-6">
                <Label className="font-bold text-sm">
                  Toplam Tutar: <span className="text-red-600">{totalPrice} TL</span>
                </Label>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
