import GameDealCard from "@/components/game-deal-card"
import Navigation from "@/components/navigation"
import { getSwitchOneDTO, getNewSwitchOneDTO, getBestSwitchOneDTO } from "@/lib/switch-deals";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import Link from "next/link";
import TopMenuGames from "@/components/top-menu-games";
import Footer from "@/components/footer";

export const dynamic = 'force-dynamic';

export default async function Switch1Page() {

  const switchDeals = await getSwitchOneDTO();
  const newSwitchDeals = await getNewSwitchOneDTO();
  const bestSwitchDeals = await getBestSwitchOneDTO();

  return (
    <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopMenuGames allSelected='' switchSelected='bg-primary' switchTwoSelected='' ps4Selected='' ps5Selected=''/>

        {switchDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay ofertas para Nintendo Switch por el momento</p>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Juegos mas populares</h1>
            <Carousel opts={{ align: "start", }} className="w-full">
              <CarouselContent>
                {switchDeals.map((game) => (
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
                {newSwitchDeals.map((newsswitch, index) => (
                <AccordionItem key={newsswitch.id+'_'+index} value="item-1" className={(index=== newSwitchDeals.length-1)?"hover:bg-primary/30 height-row text-secondary-foreground medium-bold":
                "hover:bg-primary/30 height-row text-secondary-foreground medium-bold separator-bottom"}>
                  <Link href={{pathname: '/switch1/infogame', query: { id: newsswitch.id }}} className="flex items-center space-x-1 h-[100%]">
                    <AccordionTrigger className="w-[17%] h-[100%] float-left" > 
                      <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={newsswitch.imageUrl} /></span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                      <span className="w-[100%] flex text-left">{newsswitch.title}</span>
                      <span className="w-[100%] flex">
                        <nav className="w-[70%]">
                          <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                          <g fill="red">
                              <path d="M8.172 8.005c0-3.833.01-6.976.02-6.985.01-.011.59-.02 1.285-.02 1.009 0 1.322.009 1.525.044a3.599 3.599 0 0 1 2.952 2.91c.04.212.046.708.046 4.034 0 3.553.004 3.97-.107 4.355-.02.066-.043.13-.07.211a3.62 3.62 0 0 1-2.998 2.422c-.278.028-2.528.04-2.606.011-.044-.018-.047-.658-.047-6.982Zm4.091.235a1.418 1.418 0 0 0-.974-.905 1.408 1.408 0 0 0-1.695.94 1.663 1.663 0 0 0-.013.818 1.428 1.428 0 0 0 1.708.968c.447-.119.795-.44.972-.9.096-.249.098-.648.002-.92ZM3.246 3.903c-.182.035-.46.174-.608.304-.305.263-.455.638-.432 1.078.011.23.026.29.119.476.135.281.341.487.623.626.194.096.243.108.496.116.228.009.31 0 .464-.052.629-.212 1.009-.823.9-1.45a1.33 1.33 0 0 0-1.562-1.098Z"></path>
                              <path d="M2.997 1.047a3.619 3.619 0 0 0-2.87 2.638c-.127.49-.136.777-.122 4.578.008 3.492.012 3.572.07 3.842.322 1.452 1.354 2.489 2.82 2.83.193.044.435.053 2.004.062 1.624.01 1.792.008 1.835-.035.044-.044.047-.604.047-6.948 0-4.703-.01-6.918-.03-6.959-.028-.052-.078-.055-1.775-.052-1.381.003-1.796.012-1.978.044ZM5.622 13.88l-1.181-.015c-1.087-.01-1.203-.017-1.42-.072a2.458 2.458 0 0 1-1.82-1.896c-.065-.294-.065-7.508-.004-7.795A2.49 2.49 0 0 1 2.7 2.31c.383-.154.56-.172 1.8-.175l1.122-.003V13.88h.001Zm18.706"></path>
                          </g> 
                          </svg> <p className="float-left small-font text-red-600">Nintendo Switch 1</p><p className="float-left pl-[1em]"> - </p> 
                          {newsswitch.deals.map((deal) => (                               
                              <img key={deal.id} width="20px" src={newsswitch.logoStore} className="ml-2 h-[25px] float-left" title={deal.storeName}/>                                
                            ))}
                        </nav>
                      </span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row-price h-[100%] float-left">
                      {newsswitch.deals.map((deal) => (
                      <span key={deal.id} className="width-price-value flex float-right text-green-600">${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                      ))}
                      {newsswitch.deals.map((deal) => (
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
                {bestSwitchDeals.map((bestswitch, index) => (
                <AccordionItem key={bestswitch.id+'_'+index} value="item-1" className={(index=== bestSwitchDeals.length-1)?"hover:bg-primary/30 height-row text-secondary-foreground medium-bold":
                "hover:bg-primary/30 height-row text-secondary-foreground medium-bold separator-bottom"}>
                  <Link href={{pathname: '/switch1/infogame', query: { id: bestswitch.id }}} className="flex items-center space-x-1 h-[100%]">
                  <AccordionTrigger className="w-[17%] h-[100%] float-left" > 
                    <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={bestswitch.imageUrl} /></span>
                  </AccordionTrigger>
                  <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                    <span className="w-[100%] flex text-left ">{bestswitch.title}</span>
                    <span className="w-[100%] flex">
                      <nav className="w-[70%]">
                          <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                          <g fill="red">
                              <path d="M8.172 8.005c0-3.833.01-6.976.02-6.985.01-.011.59-.02 1.285-.02 1.009 0 1.322.009 1.525.044a3.599 3.599 0 0 1 2.952 2.91c.04.212.046.708.046 4.034 0 3.553.004 3.97-.107 4.355-.02.066-.043.13-.07.211a3.62 3.62 0 0 1-2.998 2.422c-.278.028-2.528.04-2.606.011-.044-.018-.047-.658-.047-6.982Zm4.091.235a1.418 1.418 0 0 0-.974-.905 1.408 1.408 0 0 0-1.695.94 1.663 1.663 0 0 0-.013.818 1.428 1.428 0 0 0 1.708.968c.447-.119.795-.44.972-.9.096-.249.098-.648.002-.92ZM3.246 3.903c-.182.035-.46.174-.608.304-.305.263-.455.638-.432 1.078.011.23.026.29.119.476.135.281.341.487.623.626.194.096.243.108.496.116.228.009.31 0 .464-.052.629-.212 1.009-.823.9-1.45a1.33 1.33 0 0 0-1.562-1.098Z"></path>
                              <path d="M2.997 1.047a3.619 3.619 0 0 0-2.87 2.638c-.127.49-.136.777-.122 4.578.008 3.492.012 3.572.07 3.842.322 1.452 1.354 2.489 2.82 2.83.193.044.435.053 2.004.062 1.624.01 1.792.008 1.835-.035.044-.044.047-.604.047-6.948 0-4.703-.01-6.918-.03-6.959-.028-.052-.078-.055-1.775-.052-1.381.003-1.796.012-1.978.044ZM5.622 13.88l-1.181-.015c-1.087-.01-1.203-.017-1.42-.072a2.458 2.458 0 0 1-1.82-1.896c-.065-.294-.065-7.508-.004-7.795A2.49 2.49 0 0 1 2.7 2.31c.383-.154.56-.172 1.8-.175l1.122-.003V13.88h.001Zm18.706"></path>
                          </g> 
                          </svg> <p className="float-left small-font text-red-600">Nintendo Switch 1</p><p className="float-left pl-[1em]"> - </p> 
                          {bestswitch.deals.map((deal) => (                               
                              <img key={deal.id} width="20px" src={bestswitch.logoStore} className="ml-2 h-[25px] float-left" title={deal.storeName}/>                                
                            ))}
                        </nav>
                    </span>
                  </AccordionTrigger>
                  <AccordionTrigger className="with-row-price h-[100%] float-left">
                    {bestswitch.deals.map((deal, index) => (
                    <span key={deal.id} className={(deal.discountPercentage=== 0)?"width-price-value flex float-right text-black-600":"width-price-value flex float-right text-green-600"}>${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                    ))}
                    {bestswitch.deals.map((deal) => (
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