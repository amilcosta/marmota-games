import { getGameDealsDTO, getNewDealsDTO, getBestDealsDTO } from "@/lib/deals-dal"
import GameDealCard from "@/components/game-deal-card"
import Navigation from "@/components/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import Link from "next/link";
import TopMenuGames from "@/components/top-menu-games";
import Footer from "@/components/footer";


export default async function HomePage() {
  const gameDeals = await getGameDealsDTO();
  const newDeals = await getNewDealsDTO();
  const bestDeals = await getBestDealsDTO();


  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopMenuGames allSelected='bg-primary' switchSelected='' switchTwoSelected='' ps4Selected=''/>

        {gameDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay descuentos en este momento.</p>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Juegos más Populares</h1>
            <Carousel opts={{ align: "start", }} className="w-full">
              <CarouselContent>
                {gameDeals.map((game) => (
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
              {newDeals.map((newsdeals, index) => (              
                <AccordionItem key={newsdeals.id+'_'+index} value={index + '_'} className={(index=== newDeals.length-1)?"hover:bg-primary/30 height-row text-secondary-foreground medium-bold":
                "hover:bg-primary/30 height-row text-secondary-foreground medium-bold separator-bottom"}>
                  <Link href={{pathname: `/${newsdeals.platform}/infogame`, query: { id: newsdeals.id }}} className="flex items-center space-x-1 h-[100%]">
                    <AccordionTrigger className="w-[17%] h-[100%] float-left " > 
                      <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={newsdeals.imageUrl} /></span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                      <span className="w-[100%] flex text-left">{newsdeals.title}</span>
                      <span className="w-[100%] flex"><img width="20px" src={newsdeals.logoConsole} className="mr-2"/>  - 
                      {newsdeals.deals.map((deal) => (
                        <img key={deal.id} width="20px" src={newsdeals.logoStore} className="ml-2" title={deal.storeName}/>
                      ))}
                      </span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row-price h-[100%] float-left">
                      {newsdeals.deals.map((deal) => (
                      <span key={deal.id} className="width-price-value flex float-right text-green-600">${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                      ))}
                      {newsdeals.deals.map((deal) => (
                        deal.discountPercentage>0?  
                      <span key={deal.id} className="width-discount-value flex float-right text-primary-foreground bg-secondary round-price mt-1">{-deal.discountPercentage.toFixed(1)} %</span>
                        :""
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
              {bestDeals.map((bestdeals, index) => (
                <AccordionItem key={bestdeals.id+'_'+index} value={bestdeals.title} className={(index=== bestDeals.length-1)?"hover:bg-primary/30 height-row text-secondary-foreground medium-bold":
                "hover:bg-primary/30 height-row text-secondary-foreground medium-bold separator-bottom"}>
                  <Link href={{pathname: `/${bestdeals.platform}/infogame`, query: { id: bestdeals.id }}} className="flex items-center space-x-1 h-[100%]">
                    <AccordionTrigger className="w-[17%] h-[100%] float-left" > 
                      <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={bestdeals.imageUrl} /></span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                      <span className="w-[100%] flex text-left">{bestdeals.title}</span>
                      <span className="w-[100%] flex"><img width="20px" src={bestdeals.logoConsole} className="mr-2"/>  - 
                        {bestdeals.deals.map((deal) => (
                        <img key={deal.id} width="20px" src={bestdeals.logoStore} className="ml-2" title={deal.storeName}/>
                        ))}
                      </span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row-price h-[100%] float-left">
                      {bestdeals.deals.map((deal) => (
                      <span key={deal.id} className={(deal.discountPercentage=== 0)?"width-price-value flex float-right text-black-600":
                        "width-price-value flex float-right text-green-600"}>${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                      ))}
                      {bestdeals.deals.map((deal) => (
                      deal.discountPercentage>0?  
                      <span key={deal.id} className="width-discount-value flex float-right text-primary-foreground bg-secondary round-price mt-1">
                        {-deal.discountPercentage.toFixed(1)} %</span>
                        :""
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
