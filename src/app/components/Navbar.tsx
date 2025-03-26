"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cart, updateCart } = useCart() as { cart: CartType; updateCart: () => void };
  const [openShop, setOpenShop] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { fav, updateFav } = useFavorites();

  const totalItems = cart?.items?.length || 0;
  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const totalFavs = fav?.length || 0;
  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    updateCart();
    updateFav();
    router.push("/login");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm(" ");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full fixed p-3 text-pink-950  bg-pink-100 shadow-2xl z-40">
      <div className="container flex items-center justify-between h-16">
        <Link
          className="font-extrabold text-3xl  text-pink-950  transition-all"
          href="/"
        >
          takiShop
        </Link>
        <div className="hidden md:flex relative w-64">
          <Input
            className="outline-none w-full rounded-md text-pink-950"
            type="text"
            placeholder="bir şeyler ara.."
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          ></Input>
          <IoSearchOutline
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-pink-950 "
          />
        </div>
        <div className="flex gap-5 ">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex items-center gap-2 hover:text-pink-950 ">
                <FaUser size={24} />
                <p className="hidden md:block text-xs font-semibold">
                  {isAuthenticated ? "Profilim" : "Giriş Yap"}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md">
              <DropdownMenuLabel className="text-center">
                Hesabim
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Giriş Yap</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Üye Ol</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profilim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/cart">Siparişlerim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      onClick={handleLogout}
                      variant="myButton2"
                      className="w-full"
                    >
                      Çikiş Yap
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Favori ürünler kısmı */}
          <DropdownMenu open={openFav} onOpenChange={setOpenFav}>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer hover:text-pink-950 ">
                <FaRegHeart size={24} />
                {totalFavs > 0 && (
                  <span className="bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
                    {totalFavs}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto">
              <DropdownMenuLabel className="text-center font-semibold">
                Favoriler
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {totalFavs === 0 ? (
                <p className="text-center text-gray-500">Favoriniz yok</p>
              ) : (
                <div className="space-y-3">
                  {fav.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border-b pb-2"
                    >
                      {item.product.images.length > 0 && (
                        <Image
                          src={item.product.images[0].image_url}
                          alt={item.product.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.product.price}₺
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant="myButton2"
                className="flex w-full items-center justify-center"
                onClick={() => router.push("/favorites")}
              >
                Favorilere git
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sepet bilgisi */}
          <DropdownMenu open={openShop} onOpenChange={setOpenShop}>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer hover:text-pink-950 ">
                <MdOutlineShoppingBag size={24} />

                {/* cartuzunluğu */}
                {totalItems > 0 && (
                  <span className="bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
                    {totalItems}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto">
              <DropdownMenuLabel className="text-center font-semibold">
                Sepetiniz
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {totalItems === 0 ? (
                <p className="text-center text-gray-500">Sepetiniz boş</p>
              ) : (
                <div className="space-y-3">
                  {cart?.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border-b pb-2"
                    >
                      <Image
                        src={`http://127.0.0.1:8000${item.image}`}
                        alt={item.product.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {" "}
                          {item.product.price}₺
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={() => router.push("/cart")}
                variant="myButton2"
                className="flex w-full items-center justify-center"
              >
                Sepete git
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
