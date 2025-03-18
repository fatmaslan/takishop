"use client"
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
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
import { Button } from '@/components/ui/button';


const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false)
  const [openShop,setOpenShop]=useState(false)
  const[openFav,setOpenFav]=useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);



  return (
    <div className='w-full fixed p-3 text-white  bg-pink-200 shadow-2xl z-40'>
      <div className='container flex items-center justify-between h-16'>
        <Link className='font-extrabold text-3xl hover:text-pink-950 transition-all' href="/">
        takiShop
        </Link>
        <div className='hidden md:flex relative w-64'> 
        <Input className='outline-none w-full rounded-md text-pink-950' type='text' placeholder='bir şeyler ara..'></Input>
        <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-pink-950 "/>
        </div>
        <div className='flex gap-5 '>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <div className='cursor-pointer flex items-center gap-2 hover:text-pink-950 '>
              <FaUser size={24}/>
              <p className="hidden md:block text-xs font-semibold">
                  {isAuthenticated ? "Profilim" : "Giriş Yap"}
                </p>
              </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md">
              <DropdownMenuLabel className="text-center">Hesabim</DropdownMenuLabel>
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
                    <Link href="/orders">Siparişlerim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button className="w-full">Çikiş Yap</Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>



          {/* Favori ürünler kısmı */}
          <DropdownMenu open={openFav} onOpenChange={setOpenFav}>
            <DropdownMenuTrigger asChild>
              <div className='relative cursor-pointer hover:text-pink-950 '>
              <FaRegHeart size={24}/>

              {/* cartuzunluğu */}
              <span className=" text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
                 {/* {cart.length} */}
                  </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto">
              <DropdownMenuLabel className="text-center font-semibold">Favoriler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Sepet bilgisi */}
              <Button variant='myButton'>Favorilere git</Button>
              </DropdownMenuContent>
          </DropdownMenu>


          {/* Sepet bilgisi */}
          <DropdownMenu open={openShop} onOpenChange={setOpenShop}>
            <DropdownMenuTrigger asChild>
              <div className='relative cursor-pointer hover:text-pink-950 '>
              <MdOutlineShoppingBag size={24}/>

              {/* cartuzunluğu */}
              <span className=" text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
                 {/* {cart.length} */}
                  </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white shadow-lg rounded-md p-3 max-h-96 overflow-y-auto">
              <DropdownMenuLabel className="text-center font-semibold">Sepetiniz</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Sepet bilgisi */}
              <Button variant='myButton' >Sepete git</Button>
              </DropdownMenuContent>
          </DropdownMenu>
          
          
        </div>
      </div>
    </div>
  )
}

export default Navbar
