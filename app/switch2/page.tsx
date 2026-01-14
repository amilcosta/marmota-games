import GameDealCard from "@/components/game-deal-card"
import Navigation from "@/components/navigation"
import { getSwitchTwoDTO, getNewSwitchTwoDTO, getBestSwitchTwoDTO } from "@/lib/switchtwo-deals"; 
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import Link from "next/link";
import TopMenuGames from "@/components/top-menu-games";
import Footer from "@/components/footer";

export default async function Switch2Page() {
    const switchDeals = await getSwitchTwoDTO();
    const newSwitchDeals = await getNewSwitchTwoDTO();
    const bestSwitchDeals = await getBestSwitchTwoDTO();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TopMenuGames allSelected='' switchSelected='' switchTwoSelected='bg-primary' ps4Selected=''/>

            {switchDeals.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No hay ofertas para Nintendo Switch 2 por el momento.</p>
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
            { switchDeals.length != 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div>
                <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Nuevos Descuentos</h1>
                <Accordion className="w-[100%] rounded-md bg-squirtle-gray shadow-[0_2px_10px] shadow-black/5" type="single">
                    {newSwitchDeals.map((newsswitch, index) => (
                    <AccordionItem key={newsswitch.id+'_'+index} value="item-1" className={(index=== newSwitchDeals.length-1)?"hover:bg-primary/30 height-row text-secondary-foreground medium-bold":
                    "hover:bg-primary/30 height-row text-secondary-foreground medium-bold separator-bottom"}>
                    <Link href={{pathname: '/switch2/infogame', query: { id: newsswitch.id }}} className="flex items-center space-x-1 h-[100%]">
                        <AccordionTrigger className="w-[17%] h-[100%] float-left" > 
                        <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={newsswitch.imageUrl} /></span>
                        </AccordionTrigger>
                        <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                        <span className="w-[100%] flex text-left ">{newsswitch.title}</span>
                        <span className="w-[100%] flex"><img width="20px" src={newsswitch.logoConsole} className="mr-2"/>  - 
                        {newsswitch.deals.map((deal) => (
                            <img key={deal.id} width="20px" src={newsswitch.logoStore} className="ml-2" title={deal.storeName}/>
                        ))}
                        </span>
                        </AccordionTrigger>
                        <AccordionTrigger className="with-row-price h-[100%] float-left">
                        {newsswitch.deals.map((deal) => (
                        <span key={deal.id} className="width-price-value flex float-right text-green-600">${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                        ))}
                        {newsswitch.deals.map((deal) => (
                        <span key={deal.id} className="width-discount-value flex float-right text-primary-foreground bg-secondary round-price mt-1">-{deal.discountPercentage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} %</span>
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
                    <Link href={{pathname: '/switch2/infogame', query: { id: bestswitch.id }}} className="flex items-center space-x-1 h-[100%]">
                        <AccordionTrigger className="w-[17%] h-[100%] float-left" > 
                            <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={bestswitch.imageUrl} /></span>
                        </AccordionTrigger>
                        <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                            <span className="w-[100%] flex text-left">{bestswitch.title}</span>
                            <span className="w-[100%] flex"><img width="20px" src={bestswitch.logoConsole} className="mr-2"/>  - 
                            {bestswitch.deals.map((deal) => (
                            <img key={deal.id} width="20px" src={bestswitch.logoStore} className="ml-2" title={deal.storeName}/>
                            ))}</span>
                        </AccordionTrigger>
                        <AccordionTrigger className="with-row-price h-[100%] float-left">
                            {bestswitch.deals.map((deal) => (
                            <span key={deal.id} className="width-price-value flex float-right text-green-600">${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                            ))}
                            {bestswitch.deals.map((deal) => (
                            <span key={deal.id} className="width-discount-value flex float-right text-primary-foreground bg-secondary round-price">-{deal.discountPercentage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} %</span>
                            ))}
                        </AccordionTrigger>
                    </Link>
                    </AccordionItem>
                    ))}
                </Accordion>
                </div>
            </div>
            ) : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"></div>}
        </main>
        </div>
    )
}