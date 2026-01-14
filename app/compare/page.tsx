"use client";

import { useState } from "react";
import ProductSearch from "@/components/ProductSearch";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import marmota from "@/public/marmotapay.png";
import Footer from "@/components/footer";
import TableCompare from "@/components/table-graphic-compare";


let cantprod=0;
let last_prod =0;
let check_disable: boolean = false;

export default function ComparePage() {
  const [selected, setSelected] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function addProduct(product: any) {
    if (!selected.find(p => p.id === product.id)) {
        setSelected([...selected, product]);
        cantprod = cantprod +1;
        if(cantprod>1){
            check_disable=true;
        }
    }
  }

  const deleteItemById = (idToDelete: any) => {
    // Create a new array that includes all items EXCEPT the one with the matching ID
    const updatedItems = selected.filter(item => item.id !== idToDelete);
    
    // Update the state with the new array
    setSelected(updatedItems);
    check_disable= false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Buscar Videojuegos", href: "/search" },
    { name: "Comparar Videojuegos", href: "/compare" },
    { name: "Contactanos", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
                            <div className="hidden lg:block">            
                                <Link href="/search" className="flex items-center space-x-2 w-[100%]">
                                <Button className="medium-font w-[100%] bg-accent">Buscar Videojuegos</Button>
                                </Link>
                            </div>
                        
                    </div>
                </div>
            </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[600px]">
            <h1 className="text-2xl font-bold text-secondary-foreground">Comparar Videojuegos</h1>
            <blockquote className="p-[2em]">
                <p>En esta seccion podras buscar juegos y comparar el precio entre ellos. Solo escriba el nombre del juego en el campo de texto y 
                    seleccione el juego que aparezca en la lista emergente, para ir agregando el juego y luego poder comparar.<br></br>
                    <span className="medium-bold">NOTA: Para usuarios Premium, tendrán la posibilidad de comparar mas de 2 juegos.</span></p>
            </blockquote>
            <ProductSearch onSelect={addProduct} check_disable={check_disable} />

            {selected.length > 0 && (
                <div className="mb-8 w-[100%]  mt-[5em]">
                    <div className="relative flex justify-center">
                         {selected.map(p => ( 
                            <div key={p.id} className="w-[316px]">
                                
                                <div key={p.id} className="flex flex-nowrap w-[300px]">
                                    <div >
                                        <div key={p.id} className=" flex flex-col text-center justify-center space-y-1.5 p-6 text-m font-semibold leading-none tracking-tight">
                                            <div className="h-[3em] high-font medium-bold">{p.title} - {p.platform.toUpperCase()}</div>
                                        </div>
                                        <div className="flex flex-col justify-center"><img src={p.imageUrl} className=" w-[100%]" /></div>
                                        <div className="flex flex-col justify-center pt-[0.5em]">
                                            <div className="p-[3px] medium-bold">Tienda: <span className="text-gray-500">{p.storeName.toUpperCase()}</span></div>
                                        </div>
                                        <div className="flex flex-col justify-center pt-[0.5em]">
                                            <div className="p-[3px] medium-bold">Precio: <span className="text-green-500">${p.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span></div>
                                        </div>
                                    </div>
                                    <div className={(cantprod == selected.length+1)?"vsSeparator ml-[1em] border-transparent":"vsSeparator ml-[1em] "} ><span>vs</span></div>
                                    <div className="w-[20px] h-[20px] text-red-600 font-semibold x-mark">
                                        <button onClick={() => deleteItemById(p.id)} title="Eliminar">X</button>
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                        
                    </div>
                </div>


                /*<table className="mt-6 border">
                <thead>
                    <tr>
                    <th>Feature</th>
                    {selected.map(p => (
                        <th key={p.id}>{p.title}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Price</td>
                    {selected.map(p => (
                        <td key={p.id}>${p.salePrice}</td>
                    ))}
                    </tr>
                    <tr>
                    <td>Brand</td>
                    {selected.map(p => (
                        <td key={p.id}>{p.storeName}</td>
                    ))}
                    </tr>
                    <tr>
                    <td>Consola</td>
                    {selected.map(p => (
                        <td key={p.id}>{p.platform}</td>
                    ))}
                    </tr>
                </tbody>
                </table>*/
            )}
            {selected.length > 1 && (
            <div className="mb-8 w-[100%]  mt-[2em]">
                <TableCompare data={selected} />
            </div>
            )}
        </main>
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-12">
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-900"></span>
                    </div>
                </div>
                <div className="flex justify-between h-18 text-base text-secondary-foreground mb-4">
                    <div className="flex items-center width-foot">
                        <span className="font-bold text-gray-600">
                            <Link href={{pathname: `/`}} ><Image src={marmota} width={80} height={80} alt="Marmota Pay" /></Link>
                        </span>
                        <span className=" pl-2">Marmota Pay es una pagina que muestra las ofertas de videojuegos fisicos de las distintas tiendas a nivel nacional</span>
           
                    </div>
                    <div className="flex items-center ">
                        
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold text-gray-600"></span>
                    </div>
                </div>
                <div className="flex justify-between text-sm">
                    <div className="flex flex-col">
                        <div className="w-[100%] h-7">
                            <Link href={{pathname: `/nosotros`}} ><span className="font-bold text-gray-600 hover:text-accent">Nosotros</span></Link>
                        </div>
                        <div className="w-[100%] h-7"><span className="font-bold text-gray-600">Contactanos</span></div>
                        
                    </div>
                    <div className="flex flex-col">
                        
                    </div>
                    <div className="flex flex-col">
                        <div className="w-[100%]"><span className="font-bold text-gray-600"></span></div>
                        <div className="w-[100%]"><span className="font-bold text-gray-600"></span></div>
                    </div>
                </div>
                <div className="flex justify-between h-12 mt-2">
                    <div className="flex flex-col">
                        <div>
                            <Link href={""}>
                            <button
                                type="button"
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                className="mr-2 mb-2 inline-block rounded bg-[#c13584] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                <span className="[&>svg]:h-4 [&>svg]:w-4">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 448 512">
                                    <path
                                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                    </svg>
                                </span>
                            </button>
                            </Link>
                            <Link href={""}>
                            <button
                                type="button"
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                className="mr-2 mb-2 inline-block rounded bg-[#ff0000] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                                <span className="[&>svg]:h-4 [&>svg]:w-4">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 576 512">
                                    <path
                                        d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                                    </svg>
                                </span>
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  );
}