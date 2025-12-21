import Link from "next/link";
import Image from "next/image";
import marmota from "@/public/marmotapay.png";

export default async function Footer() {
    return (
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
    )
}