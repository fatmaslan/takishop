"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

const formSchema = z.object({
  username: z.string().min(3, "Ad ve soyad en az 3 karakter olmalidir."),
  cardNumber: z
    .string()
    .length(16, "Kart numarasi 16 haneli olmalidir.")
    .regex(/^\d{16}$/, "Geçerli bir kart numarasi girin."),
  expirationDate: z
    .string()
    .length(5, "Son kullanma tarihi MM/YY formatinda olmalidir.")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Geçerli bir son kullanma tarihi girin."),
  cvv: z
    .string()
    .length(3, "CVV 3 haneli olmalidir.")
    .regex(/^\d{3}$/, "Geçerli bir CVV girin."),
  address: z.string().min(10, "Adres en az 10 karakter olmalidir."),
});

const Buypage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { cart, removeFromCart } = useCart();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      address: "",
    },
  });
  const totalPrice = cart?.items?.reduce((total, item) => {
    const price = item.product.price ?? 0;
    return total + price;
  }, 0);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      
      router.push("/success");
    } catch (error) {
      setErrorMessage("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-28 sm:px-10 mb-10">
      {/* Ödeme Formu */}
      <div className=" w-full max-w-md sm:max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-center font-bold text-2xl mb-8 text-pink-900">Ödeme Sayfasi</h2>
        {errorMessage && <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad ve Soyad</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full bg-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      placeholder="Adiniz ve Soyadiniz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kart Numarasi</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full bg-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      placeholder="1234 5678 9012 3456"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Son Kullanma</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full bg-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      placeholder="MM/YY"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full bg-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      placeholder="123"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Adres</label>
              <textarea
                rows={3}
                placeholder="Teslimat adresinizi yaziniz"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...form.register("address")}
              />
              {form.formState.errors.address && (
                <p className="text-red-600 text-sm">{form.formState.errors.address.message}</p>
              )}
            </div>

            <Button variant="myButton" type="submit" disabled={isLoading} className="w-full mt-4 py-3">
              {isLoading ? "Ödeme Yapiliyor..." : "Ödemeyi Tamamla"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Sepet Bilgisi */}
      <div className="max-w-md sm:max-w-xl mx-auto  bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Ürünleriniz</h2>
        {!cart || !cart.items || cart.items.length === 0 ? (
          <p>Sepetiniz boş</p>
        ) : (
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-4">
                  {item.image && (
                    <Image
                      src={`http://127.0.0.1:8000${item.image}`}
                      alt={`Image ${item.id}`}
                      width={50}
                      height={50}
                      className="object-cover rounded-lg"
                      priority
                    />
                  )}
                  <h3 className="font-bold text-sm">{item.product.name}</h3>
                </div>
                <div>
                  <Button
                    variant="outline"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red bg-white hover:bg-red-600 hover:text-white"
                  >
                    <MdDeleteOutline size={20} />
                  </Button>
                  <p className="text-red-600 font-bold text-sm flex justify-end mt-2">{item.product.price} ₺</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col items-end mt-5">
          <h2 className="font-bold text-sm">
            Toplam Tutar: <span className="text-red-600 text-sm">{totalPrice} TL</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Buypage;
