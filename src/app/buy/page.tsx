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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

const cities: Record<string, string[]> = {
  Istanbul: ["Kadikoy", "Besiktas", "Sisli", "Tuzla"],
  Ankara: ["Cankaya", "Kecioren", "Mamak"],
  Izmir: ["Konak", "Bornova", "Karşıyaka"],
};

const formSchema = z.object({
  username: z.string().min(3, "Ad ve soyad en az 3 karakter olmalidir."),
  phone: z
    .string()
    .length(11, "Telefon numarasi 11 haneli olmalidir.")
    .regex(/^\d{11}$/, "Geçerli bir telefon numarasi girin."),
  city: z.string().min(1, "Lütfen bir il seçiniz."),
  district: z.string().min(1, "Lütfen bir ilçe seçiniz."),
  address: z.string().min(10, "Adres en az 10 karakter olmalidir."),
});

const Buypage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const { cart } = useCart();
  const currentCart = cart && cart.length > 0 ? cart[0] : null;
  const { removeFromCart } = useCart();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      city: "",
      district: "",
      address: "",
    },
  });

  const totalPrice = currentCart?.items?.reduce((total, item) => {
    return total + (item.product.price ?? 0);
  }, 0);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      router.push("/payment");
    } catch (error) {
      console.error("Bir hata oluştu", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 mt-28 sm:px-10 mb-10">
      <div className="w-full mx-auto bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Ürünleriniz</h2>
        {!currentCart ||
        !currentCart.items ||
        currentCart.items.length === 0 ? (
          <p>Sepetiniz boş</p>
        ) : (
          <ul className="space-y-4">
            {currentCart.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border p-4"
              >
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
                  <p className="text-red-600 font-bold text-sm flex justify-end mt-2">
                    {item.product.price} ₺
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col items-end">
          <h2 className="font-bold text-sm">
            Toplam Tutar:{" "}
            <span className="text-red-600 text-sm">{totalPrice} TL</span>
          </h2>
        </div>
      </div>

      <div className="w-full max-w-md sm:max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center font-bold text-2xl mb-8 text-pink-900">
          Teslimat Adresi
        </h2>
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
                      {...field}
                      placeholder="Adiniz ve Soyadiniz"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full bg-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      {...field}
                      placeholder="+90000000000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İl</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCity(value);
                    }}
                  >
                    <SelectTrigger className="w-full bg-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400">
                      <SelectValue placeholder="İl seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(cities).map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İlçe</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-pink-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400">
                      <SelectValue placeholder="İlçe seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCity &&
                        cities[selectedCity]?.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
                <p className="text-red-600 text-sm">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>
            <Button variant="myButton" type="submit" disabled={isLoading}>
              Ödemeyi Tamamla
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Buypage;
