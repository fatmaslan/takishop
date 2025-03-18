"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
});

const Registerpage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Giriş başarisiz. Lütfen bilgilerinizi kontrol ediniz.");
      }


      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Bir hata oluştu.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="mt-28 sm:mx-auto">
      <div className="max-w-md sm:mx-auto sm:w-full sm:rounded-lg sm:shadow-lg sm:overflow-hidden sm:bg-white sm:p-8">
        <h2 className="flex items-center justify-center font-bold text-2xl mb-10 text-pink-900">
          Giriş yapmak için doldurunuz
        </h2>
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Giriniz</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full bg-pink-200"
                      placeholder="example@gamil.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifrenizi giriniz</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full bg-pink-200"
                      placeholder="*****"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="mybutton" disabled={isLoading} type="submit">
            {isLoading ? (
                <>
                <Loader2 size={20} className="animate-spin"/>
                Giriş yapiliyor...
                </>
              ) : (
                <>Giriş Yap</>
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center">
          <Label className="block text-pink-900">Bir hesabiniz yok mu?</Label>
          <Link href="/register" className="mt-2 text-slate-500 block">
            Yeni hesap oluşturmak için tiklayin.
          </Link>
        </div>
        </div>
      </div>

  );
};

export default Registerpage;
