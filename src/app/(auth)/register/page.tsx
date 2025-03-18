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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z
  .object({
    username: z.string().min(2, "İsim en az 2 karakter olmalidir."),
    email: z.string().email("Geçerli bir e-posta adresi girin."),
    password: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
    passwordConfirm: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordConfirm"],
  });

const Registerpage = () => {
  const router =useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>)=> {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register/",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          email:values.email,
          username:values.username,
          password:values.password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      const token = data.accessToken;
      if(token){
        localStorage.setItem("token",token);
      }
      toast.success("Başariyla kayit oldunuz");
      router.push("/login");
    }
    }catch (error) {
      console.error("Kayit sirasinda hata oluştu",error)
      toast.error("Bir hata olustu tekrar deneyiniz");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="mt-28 sm:mx-auto">
      <div className="max-w-md sm:mx-auto sm:w-full sm:rounded-lg sm:shadow-lg sm:overflow-hidden sm:bg-white sm:p-8">
        <h2 className="flex items-center justify-center font-bold text-2xl mb-10 text-pink-900">Üye olmak için doldurunuz</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanici adiniz</FormLabel>
                  <FormControl>
                    <Input className="w-full bg-pink-200" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Giriniz</FormLabel>
                  <FormControl>
                    <Input className="w-full bg-pink-200" placeholder="example@gamil.com" {...field} />
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
                    <Input type="password" className="w-full bg-pink-200" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifrenizi tekrar giriniz</FormLabel>
                  <FormControl>
                    <Input type="password" className="w-full bg-pink-200" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="mybutton" disabled={isLoading} type="submit">Üye ol</Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Label className="block text-pink-900">Zaten bir hesabiniz var mi?</Label>
          <Link href="/login" className="text-slate-500 mt-2 block">
            Tiklayip giriş yapabilirsiniz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
