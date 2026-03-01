//import { getCurrentUser } from "@/lib/auth"
"use client"
import { signOutAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Gamepad2, Heart, Home, LogOut, User } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import marmota from "@/public/marmotapay.png";
import { useState } from "react";
//<Gamepad2 className="h-8 w-8 text-blue-600" />

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  //const user = await getCurrentUser()

  // Navigation items array
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Buscar Videojuegos", href: "/search" },
    //{ name: "Comparar Videojuegos", href: "/compare" },
    //{ name: "Cofre de la Marmota", href: "/planes"},
    { name: "Contactanos", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={marmota} width={60} height={60} alt="Marmota Pay" />
              <span className="text-xl font-bold text-secondary-foreground">Marmota Pay</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 ">
            
            <div className="lg:hidden m-[auto]">
              <button
                className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={toggleMobileMenu}
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            
            {/* Mobile Menu */}
            <div
              className={`fixed top-0 -left-[14px] min-h-screen w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              } lg:hidden z-50`}
            >
              <div className="flex flex-row items-center border-b pb-4">
                <Link
                  href="/"
                  className="cursor-pointer text-secondary-foreground font-bold text-xl pt-4 ps-4"
                >
                  Marmota Pay
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="absolute top-4 right-4 text-slate-600 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col h-full gap-4 p-4">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-red-500"
                  >
                    <Link onClick={() => {setIsMobileMenuOpen(false);}} href={item.href} className="flex items-center">
                      {item.name}
                    </Link>
                  </li>
                ))}
                
              </ul>
            </div>

            {/* Desktop Menu */}
            {/*<div className="hidden lg:block">   
                <Link href="/compare" className="flex items-center space-x-2 w-[100%]">
                  <Button className="medium-font w-[100%] bg-accent">Comparar Videojuegos</Button>
                </Link> 
            </div>*/}
            {/*<div className="hidden lg:block">   
                <Link href="/planes" className="flex items-center space-x-2 w-[100%]">
                  <Button className="medium-font w-[100%] bg-accent">Planes</Button>
                </Link> 
            </div>*/}
            {/*<div className="hidden lg:block">            
                <Link href="/planes" className="flex items-center space-x-2 w-[100%]">
                  <Button className="medium-font w-[100%] bg-accent">Cofre de la Marmota</Button>
                </Link>
            </div>*/}
            <div className="hidden lg:block">            
                <Link href="/search" className="flex items-center space-x-2 w-[100%]">
                  <Button className="medium-font w-[100%] bg-accent">Buscar Videojuegos</Button>
                </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}
