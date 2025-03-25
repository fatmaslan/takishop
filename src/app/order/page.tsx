"use client";

import React from "react";
import { useOrder } from "../context/OrderContext";

const Orderpage = () => {
  const { orders } = useOrder();

  return (
    <div className="container mx-auto px-4 mt-24 bg-pink-100">
      <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>

      {orders.length === 0 ? (
        <p>Henüz siparişiniz bulunmuyor.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="font-bold mb-2">Sipariş Numarasi: {order.id}</h3>
              <p className="text-sm mb-2">Tarih: {order.date}</p>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border p-2 rounded"
                  >
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
  );
};

export default Orderpage;
