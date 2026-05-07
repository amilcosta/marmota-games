import GameDealCard from "@/components/game-deal-card"
import Navigation from "@/components/navigation"
import { getPs5DTO, getNewPs5DTO, getBestPs5DTO } from "@/lib/ps5-deals";

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import Link from "next/link";
import TopMenuGames from "@/components/top-menu-games";
import Footer from "@/components/footer";

export const dynamic = 'force-dynamic';

export default async function Switch1Page() {

  const ps5Deals = await getPs5DTO();
  const newPs5Deals = await getNewPs5DTO();
  const bestPs5Deals = await getBestPs5DTO();

  return (
    <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopMenuGames allSelected='' switchSelected='' switchTwoSelected='' ps4Selected='' ps5Selected='bg-primary'/>

        {ps5Deals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay ofertas para Play Station 5 por el momento</p>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Juegos mas populares</h1>
            <Carousel opts={{ align: "start", }} className="w-full">
              <CarouselContent>
                {ps5Deals.map((game) => (
                  <CarouselItem key={game.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      
                        <GameDealCard key={game.id} game={game} />
                      
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Nuevos Descuentos</h1>
              <Accordion className="w-[100%] rounded-md bg-squirtle-gray shadow-[0_2px_10px] shadow-black/5" type="single">
                {newPs5Deals.map((newsps5, index) => (
                <AccordionItem key={newsps5.id+'_'+index} value="item-1" className={(index=== newPs5Deals.length-1)?"hover:bg-primary/30 height-row text-secondary-foreground medium-bold":
                "hover:bg-primary/30 height-row text-secondary-foreground medium-bold separator-bottom"}>
                  <Link href={{pathname: `/${newsps5.platform}/infogame`, query: { id: newsps5.id }}} className="flex items-center space-x-1 h-[100%]">
                    <AccordionTrigger className="w-[17%] h-[100%] float-left" > 
                      <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={newsps5.imageUrl} /></span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                      <span className="w-[100%] flex text-left">{newsps5.title}</span>
                      <span className="w-[100%] flex">
                        <nav className="w-[70%]">
                          <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                            <path d="M15.858 11.451c-.313.395-1.08.676-1.08.676l-5.695 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.16-.054s.808-.286 1.943-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356ZM9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072v.001ZM1.2 12.508C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.453 8.453 0 0 1-4.018-.323v.001Z" fill="gray"></path>
                          </svg> <p className="float-left xsmall-font text-gray-600 pt-[2px]">Play Station 5</p> <p className="float-left pl-[1em]"> - </p>   
                          {newsps5.deals.map((deal) => (     
                            <img key={deal.id} width="20px" src={newsps5.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                             
                          ))}
                        </nav>
                      </span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row-price h-[100%] float-left">
                      {newsps5.deals.map((deal) => (
                      <span key={deal.id} className="width-price-value flex float-right text-green-600">${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                      ))}
                      {newsps5.deals.map((deal) => (
                        deal.discountPercentage>0 ?
                      <span key={deal.id} className="width-discount-value flex float-right text-primary-foreground bg-secondary round-price mt-1">-{deal.discountPercentage.toFixed(1)} %</span>
                      : ""
                      ))}
                    </AccordionTrigger>
                  </Link>
                </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Mejores Descuentos</h1>
              <Accordion className="w-[100%] rounded-md bg-squirtle-gray shadow-[0_2px_10px] shadow-black/5" type="single">
                {bestPs5Deals.map((bestps5, index) => (
                <AccordionItem key={bestps5.id+'_'+index} value="item-1" className={(index=== bestPs5Deals.length-1)?"hover:bg-primary/30 height-row text-secondary-foreground medium-bold":
                "hover:bg-primary/30 height-row text-secondary-foreground medium-bold separator-bottom"}>
                <Link href={{pathname: `/${bestps5.platform}/infogame`, query: { id: bestps5.id }}} className="flex items-center space-x-1 h-[100%]">
                  <AccordionTrigger className="w-[17%] h-[100%] float-left" > 
                    <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={bestps5.imageUrl} /></span>
                  </AccordionTrigger>
                  <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                    <span className="w-[100%] flex text-left ">{bestps5.title}</span>
                    <span className="w-[100%] flex">
                      <nav className="w-[70%]">
                          <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                            <path d="M15.858 11.451c-.313.395-1.08.676-1.08.676l-5.695 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.16-.054s.808-.286 1.943-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356ZM9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072v.001ZM1.2 12.508C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.453 8.453 0 0 1-4.018-.323v.001Z" fill="gray"></path>
                          </svg> <p className="float-left xsmall-font text-gray-600 pt-[2px]">Play Station 5</p> <p className="float-left pl-[1em]"> - </p>   
                          {bestps5.deals.map((deal) => (     
                            <img key={deal.id} width="20px" src={bestps5.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                             
                          ))}
                        </nav>
                    </span>
                  </AccordionTrigger>
                  <AccordionTrigger className="with-row-price h-[100%] float-left">
                    {bestps5.deals.map((deal, index) => (
                    <span key={deal.id} className={(deal.discountPercentage=== 0)?"width-price-value flex float-right text-black-600":"width-price-value flex float-right text-green-600"}>${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                    ))}
                    {bestps5.deals.map((deal) => (
                      deal.discountPercentage>0 ?
                    <span key={deal.id} className="width-discount-value flex float-right text-primary-foreground bg-secondary round-price">-{deal.discountPercentage.toFixed(1)} %</span>
                    : ""
                    ))}
                  </AccordionTrigger>
                  </Link>
                </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
      </main>
      <Footer />
    </div>
  )
}