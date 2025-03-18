import Link from 'next/link'
import React from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div>
      <div className="bg-pink-100 p-5 h-50 ">
      <div className="flex justify-between max-w-6xl mx-auto mt-5">
        <Link href={"/contact"} className="flex-1 text-pink-950">
          <h3 className="font-bold text-lg mb-2">Müşteri Hizmetleri</h3>
          <p>SSS</p>
          <p>İade Politikasi</p>
          <p>Kargo Takibi</p>
        </Link>
        <Link href={"/contact"} className="flex-1 text-pink-950">
          <h3 className="font-bold text-lg mb-2">Bizimle Çalişin</h3>
          <p>Kariyer</p>
          <p>İş Ortakliği</p>
        </Link>
        <Link href={"/contact"} className="flex-1 text-pink-950">
          <h3 className="font-bold text-lg mb-2">Bağlantida Kal</h3>
          <div className="flex gap-5 ">
            <FaXTwitter size={24} />
            <FaInstagram size={24} />
            <FaWhatsapp size={24} />
          </div>
        </Link>
        <Link href={"/contact"} className="flex-1 text-pink-950">
          <h3 className="font-bold text-lg mb-2">Bizimle Alişveriş Yapin</h3>
          <p>Güvenli Ödeme</p>
          <p>Kampanyalar</p>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default Footer
