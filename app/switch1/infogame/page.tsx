import Navigation from "@/components/navigation"
import Link from "next/link";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { getOffertsDTO, getInfoGameStoreDTO, getInfoGameDTO, getBestOffertsDTO } from '@/lib/switch-deals';
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {ChartComponent} from "@/components/LightweightChart";
import TopMenuGames from "@/components/top-menu-games";
import Footer from "@/components/footer";


export default async function InfoGamePage({
    params, 
    searchParams
} : {
    params: Promise<{}>;
    searchParams: Promise<{ id:number }>;
}) {

    
    const { id }     = await searchParams;
    const juegoDeals = await getOffertsDTO(id);
    const storeGames = await getInfoGameStoreDTO(id);
    const infoGame   = await getInfoGameDTO(id);
    const bestOffer  = await getBestOffertsDTO(id);

    let labelGames: string[]  = [];
    let setsVal = [];
    let storeval: number[]    = [];
    let labelStore: string [] = [];
    let cantprices: number    = 0;
    //const gamesMap = new Map<string, number[]>();
    //const gamesMap = new Map<string, number[]>();
    const gamesMap = new Map();
    const mapaTiendaFecha = new Map();


    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    /*const chartdata = {
        labels: labelGames,
        sets: setsVal
    }*/

    for(let stores of storeGames){
        let date = new Date(stores.dateHistory * 1000); // Convert to milliseconds
        let dayval = date.getDate();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');//date.toLocaleString('default', { month: 'long' }); // Get full month name
        let year = date.getFullYear();
        let day ="";
        if (dayval < 10) {
            day = '0' + dayval;
        }else{
            day = dayval.toString();
        }
        let labelYear = year+'-'+month+'-'+day;

        if(!labelGames.includes(labelYear)){
            labelGames.push(labelYear);    
            cantprices=cantprices+1;        
        }
        if(!storeval.includes(stores.id)){
            storeval.push(stores.id);
            labelStore.push(stores.storeName);
        }

        if (!mapaTiendaFecha.has(stores.storeName)) {
            mapaTiendaFecha.set(stores.storeName, []);
        }
        //mapaTiendaFecha.get(stores.storeName).push({fecha: labelYear, precio: stores.price})
        if(!mapaTiendaFecha.get(stores.storeName).some(item => typeof item === 'object' && item.time === labelYear)){
            mapaTiendaFecha.get(stores.storeName).push({ time: labelYear, value: stores.price});
        }
        
    }

    for(const labels of labelGames){
        let precioAnterior: number = 0;
        let timeAnterior: string ="";
        for(const [stor, data] of mapaTiendaFecha){
            let flag: number =0;
            if (!gamesMap.has(stor)) {
                gamesMap.set(stor, []);
            }
            for(const datafech of data){
                precioAnterior = datafech.value;
                timeAnterior = datafech.time;
                if(labels.includes(datafech.time)){
                    gamesMap.get(stor)?.push({time: datafech.time, value: datafech.value})
                    flag = 1;
                }
            }
            
            if(flag === 0){
                gamesMap.get(stor)?.push({time: timeAnterior, value: precioAnterior})
            }
        }

    }

    for(const [key, data] of mapaTiendaFecha){
        let setValues = {
            label: key.toUpperCase(),
            data: data,
            borderColor: getRandomColor(),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            stepped: true,
        }
        setsVal.push(setValues);
    }

    const linedata = {
        labels: labelGames,
        lines: setsVal
    }
    
    return (
        
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <TopMenuGames allSelected='' switchSelected='bg-primary' switchTwoSelected='' ps4Selected='' ps5Selected=''/>
                {infoGame.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Juego no encontrado</p>
                </div>
                ) : (
                <div className="mb-8">
                    <div className="grid grid-info gap-info">
                        <div className="w-[100%] mt-12 text-secondary-foreground full-width-header">
                            <Card className="bg-squirtle-gray pos-sticky">
                                <CardHeader>
                                </CardHeader>
                                <CardContent className="medium-bold ">
                                    <Carousel opts={{ align: "start", loop: true,}} className="w-full h-[400px]">
                                        <CarouselContent className="h-[100%]">
                                            {infoGame.map((info, index) => (                                          
                                                info.imagesGame.map((image, index) => (
                                                     
                                                <CarouselItem key={index}>   
                                                <img
                                                    src={image.url}
                                                    alt="test"
                                                    className="h-[400px] w-full object-cover"
                                                />
                                                </CarouselItem>
                                                
                                                ))                                          
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>
                                </CardContent>
                                
                            </Card>
                        </div>
                        <div className="col-span-2 full-width-header">
                            <div className="w-[100%] mt-12 text-secondary-foreground">
                                <Card className="bg-squirtle-gray rounded-md shadow-[0_2px_10px] shadow-black/5 border-0">
                                    <CardHeader>
                                        {infoGame.map((infogame, index) => (
                                        <CardTitle key={index}>{infogame.title}</CardTitle>
                                        ))}
                                    </CardHeader>
                                    <CardContent className="medium-bold">
                                        {infoGame.map((infogame, index) => (
                                        <div key={index}> 
                                            <div className="flex ">Lanzamiento: {infogame.releaseDate}</div>
                                            <div className="flex "> Plataforma: 
                                                <svg className="h-[30px] svg-icon svg-platform-nintendo-switch-1 pt-2 pl-2" >
                                                    {infogame.platformid ==1 ? (
                                                        
                                                    <g fill="red">
                                                        <title>{infogame.platform}</title>
                                                        <path d="M8.172 8.005c0-3.833.01-6.976.02-6.985.01-.011.59-.02 1.285-.02 1.009 0 1.322.009 1.525.044a3.599 3.599 0 0 1 2.952 2.91c.04.212.046.708.046 4.034 0 3.553.004 3.97-.107 4.355-.02.066-.043.13-.07.211a3.62 3.62 0 0 1-2.998 2.422c-.278.028-2.528.04-2.606.011-.044-.018-.047-.658-.047-6.982Zm4.091.235a1.418 1.418 0 0 0-.974-.905 1.408 1.408 0 0 0-1.695.94 1.663 1.663 0 0 0-.013.818 1.428 1.428 0 0 0 1.708.968c.447-.119.795-.44.972-.9.096-.249.098-.648.002-.92ZM3.246 3.903c-.182.035-.46.174-.608.304-.305.263-.455.638-.432 1.078.011.23.026.29.119.476.135.281.341.487.623.626.194.096.243.108.496.116.228.009.31 0 .464-.052.629-.212 1.009-.823.9-1.45a1.33 1.33 0 0 0-1.562-1.098Z"></path>
                                                        <path d="M2.997 1.047a3.619 3.619 0 0 0-2.87 2.638c-.127.49-.136.777-.122 4.578.008 3.492.012 3.572.07 3.842.322 1.452 1.354 2.489 2.82 2.83.193.044.435.053 2.004.062 1.624.01 1.792.008 1.835-.035.044-.044.047-.604.047-6.948 0-4.703-.01-6.918-.03-6.959-.028-.052-.078-.055-1.775-.052-1.381.003-1.796.012-1.978.044ZM5.622 13.88l-1.181-.015c-1.087-.01-1.203-.017-1.42-.072a2.458 2.458 0 0 1-1.82-1.896c-.065-.294-.065-7.508-.004-7.795A2.49 2.49 0 0 1 2.7 2.31c.383-.154.56-.172 1.8-.175l1.122-.003V13.88h.001Zm18.706-2.039v1.295h-5.6v-1.295h2.051V5.94c0-.233.007-.474.021-.721l-1.456 1.218a.64.64 0 0 1-.252.126.61.61 0 0 1-.42-.07.444.444 0 0 1-.126-.119L18 5.625 21.087 3h1.421v8.841h1.82Z"></path>
                                                    </g>
                                                    
                                                    ) : infogame.platformid == 2 ?( 
                                                        <g fill="currentColor">
                                                            <title>{infogame.platform}</title>
                                                            <path d="M8.172 8.005c0-3.833.01-6.976.02-6.985.01-.011.59-.02 1.285-.02 1.009 0 1.322.009 1.525.044a3.599 3.599 0 0 1 2.952 2.91c.04.212.046.708.046 4.034 0 3.553.004 3.97-.107 4.355-.02.066-.043.13-.07.211a3.62 3.62 0 0 1-2.998 2.422c-.278.028-2.528.04-2.606.011-.044-.018-.047-.658-.047-6.982Zm4.091.235a1.418 1.418 0 0 0-.974-.905 1.408 1.408 0 0 0-1.695.94 1.663 1.663 0 0 0-.013.818 1.428 1.428 0 0 0 1.708.968c.447-.119.795-.44.972-.9.096-.249.098-.648.002-.92ZM3.246 3.903c-.182.035-.46.174-.608.304-.305.263-.455.638-.432 1.078.011.23.026.29.119.476.135.281.341.487.623.626.194.096.243.108.496.116.228.009.31 0 .464-.052.629-.212 1.009-.823.9-1.45a1.33 1.33 0 0 0-1.562-1.098Z"></path>
                                                            <path d="M2.997 1.047a3.619 3.619 0 0 0-2.87 2.638c-.127.49-.136.777-.122 4.578.008 3.492.012 3.572.07 3.842.322 1.452 1.354 2.489 2.82 2.83.193.044.435.053 2.004.062 1.624.01 1.792.008 1.835-.035.044-.044.047-.604.047-6.948 0-4.703-.01-6.918-.03-6.959-.028-.052-.078-.055-1.775-.052-1.381.003-1.796.012-1.978.044ZM5.622 13.88l-1.181-.015c-1.087-.01-1.203-.017-1.42-.072a2.458 2.458 0 0 1-1.82-1.896c-.065-.294-.065-7.508-.004-7.795A2.49 2.49 0 0 1 2.7 2.31c.383-.154.56-.172 1.8-.175l1.122-.003V13.88h.001Zm18.713-2.343c.187 0 .334.054.441.161.112.103.168.24.168.413v1.036H18v-.574a.975.975 0 0 1 .308-.714l3.073-3.08c.257-.261.485-.511.686-.749a4.7 4.7 0 0 0 .511-.707c.135-.233.238-.469.308-.707a2.57 2.57 0 0 0 .112-.763 1.77 1.77 0 0 0-.105-.637 1.25 1.25 0 0 0-.301-.469 1.161 1.161 0 0 0-.462-.28 1.733 1.733 0 0 0-.602-.098c-.205 0-.397.03-.574.091a1.461 1.461 0 0 0-.462.245c-.135.103-.25.224-.343.364a1.6 1.6 0 0 0-.21.462c-.08.215-.182.357-.308.427s-.308.086-.546.049l-.91-.161c.07-.485.205-.91.406-1.274.2-.369.45-.674.749-.917a3.078 3.078 0 0 1 1.036-.553 4.094 4.094 0 0 1 1.26-.189c.467 0 .894.07 1.281.21.387.135.719.329.994.581.275.252.49.555.644.91.154.355.231.749.231 1.183 0 .373-.056.719-.168 1.036a4.09 4.09 0 0 1-.441.91 5.92 5.92 0 0 1-.644.84c-.247.27-.506.546-.777.826l-2.282 2.331c.22-.065.436-.114.651-.147a3.76 3.76 0 0 1 .623-.056h2.597Z"></path>
                                                        </g>
                                                    ): ''}
                                                </svg>
                                            </div>
                                            
                                            <div className="flex flex-wrap w-[100%] mt-1 mb-1"> Generos<span className="pr-1">:</span>
                                                {infogame.genre.map((gen, index) => (
                                                    <span className="pr-1 text-gray-300 bg-secondary round-price" key={index}>{gen}</span>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap w-[100%]">
                                                Clasificacion:
                                            </div>
                                            <div className="flex flex-wrap w-[100%]">
                                                {infogame.clasificationList.map((clasifica, index) =>(
                                                    <span key={index} className="pr-1" >
                                                        <Image src={clasifica.url} width={50} height={50} alt={clasifica.clasification} />
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap w-[100%] mt-2">
                                                Descripcion:
                                            </div>
                                            <div className="flex flex-wrap w-[100%] text-gray-500">{infogame.description}</div>
                                        </div>
                                        
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                            <Accordion className="w-[100%] mt-12 rounded-md bg-squirtle-gray shadow-[0_2px_10px] shadow-black/5" type="single">
                                {juegoDeals.map((juegodeals, index) => (
                                <AccordionItem key={juegodeals.id+'_'+index} value="item-1" className={(index=== juegoDeals.length-1)?"hover:bg-primary/30 height-info-row text-secondary-foreground medium-bold":
                                "hover:bg-primary/30 height-info-row text-secondary-foreground medium-bold separator-bottom"}>
                                
                                    <AccordionTrigger className="w-[15%] h-[100%] float-left cursor-default" > 
                                        <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={juegodeals.logoStore}  /></span>
                                    </AccordionTrigger>
                                    <AccordionTrigger className="width-info-title h-[100%] float-left pl-1 small-font cursor-default"> 
                                        <span className="w-[100%] flex text-left">{juegodeals.title}</span>
                                        <span className="w-[100%] flex"></span>
                                    </AccordionTrigger>
                                    <AccordionTrigger className="width-info-price h-[100%] float-left cursor-default">
                                    {juegodeals.deals.map((deal) => (
                                    <span key={deal.id} className="w-[50%] flex float-right medium-font text-green-600 text-area-rows">${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                    ))}
                                    {juegodeals.deals.map((deal) => (
                                        deal.discountPercentage>0 ?
                                        <span key={deal.id} className="w-[40%] small-font text-sm flex float-right text-gray-500 line-through pt-1 mr-1 text-area-rows">${deal.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                        : ""
                                    ))}
                                    {juegodeals.deals.map((deal) => (
                                    <span key={deal.id} className="w-[42%] flex float-right text-primary-foreground bg-secondary round-price mt-1">-{deal.discountPercentage} %</span>
                                    ))}
                                    </AccordionTrigger>
                                    
                                        {juegodeals.deals.map((game) => (
                                            <div key={game.id} className="m-auto mt-3 width-info-bottom  flex float-right">
                                                
                                                <Button  className="cursor-pointer w-[90%] ml-2 small-font bg-accent">
                                                    <a href={game.dealUrl} target="_blank" rel="noopener noreferrer">                                                 
                                                    Comprar ahora
                                                    </a>
                                                </Button>   
                                                              
                                            </div>
                                        ))}
                                    
                                
                                </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                        <div className="w-[100%] mt-12 text-secondary-foreground ">
                            <Card className="bg-squirtle-gray pos-sticky">
                                <CardHeader>
                                    <CardTitle>Precio mas economico</CardTitle>
                                </CardHeader>
                                <CardContent className="medium-bold">
                                    {bestOffer.map((best, index) => (
                                    <div key={index}> 
                                        <div className="flex "><img width="50px" src={best.logoStore} className="ml-2" title={best.nombreStore}/></div>
                                        <div className="flex "> Tienda: {best.nombreStore.toUpperCase()}
                                        </div>
                                        {best.deals.map((deal) => (
                                            <div key={index} className="flex "> Precio: $ {deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>   
                                        ))}
                                        {best.deals.map((store, index) => (
                                            <div key={index} className="mt-2">
                                                <Button  className="cursor-pointer w-[90%] ml-2 bg-accent">
                                                    <a href={store.dealUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4 mr-1 float-left" />
                                                    Comprar ahora
                                                    </a>
                                                </Button> 
                                            </div>
                                        ))}
                                    </div>
                                    
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="mb-8 text-secondary-foreground">
                        {infoGame.map((infogame, index) => (
                        <h1 key={index} className="text-3xl font-bold mb-2">Historial del precio de {infogame.title}</h1>
                        ))}
                        <Card className="bg-squirtle-gray">
                            <CardHeader>
                                <CardTitle>Precio por tienda</CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartComponent data={linedata} />
                            </CardContent>
                        </Card>
                    </div>   
                </div>        
                )}
            </main>
            <Footer />
        </div>
    )
}