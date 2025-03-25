"use client"
import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  username: z.string().min(3, "Ad ve soyad en az 3 karakter olmalidir."),
  cardNumber: z
    .string()
    .length(16, "Kart numarasi 16 haneli olmalidir.")
    .regex(/^\d{16}$/, "Geçerli bir kart numarasi girin."),
  expirationDate: z
    .string()
    .length(5, "Son kullanma tarihi MM/YY formatinda olmalidir.")
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Geçerli bir son kullanma tarihi girin."
    ),
  cvv: z
    .string()
    .length(3, "CVV 3 haneli olmalidir.")
    .regex(/^\d{3}$/, "Geçerli bir CVV girin."),
  address: z.string().min(10, "Adres en az 10 karakter olmalidir."),
});
const PaymentPage = () => {
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);
      const [errorMessage] = useState("")



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
    <div>
       {/* Ödeme Formu */}
            <div className=" w-full max-w-md sm:max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-24">
              <h2 className="text-center font-bold text-2xl mb-8 text-pink-900">
                Ödeme Sayfasi
              </h2>
              {errorMessage && (
                <p className="text-red-600 text-sm text-center mb-4">
                  {errorMessage}
                </p>
              )}
      
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
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.address.message}
                      </p>
                    )}
                  </div>
      
                  <Button
                    variant="myButton"
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-4 py-3"
                  >
                    {isLoading ? "Ödeme Yapiliyor..." : "Ödemeyi Tamamla"}
                  </Button>
                </form>
              </Form>
            </div>
    </div>
  )
}

export default PaymentPage
