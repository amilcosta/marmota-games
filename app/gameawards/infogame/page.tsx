import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getGamesMatch, getGamesTienda } from "@/lib/game-awards";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Footer from "@/components/footer";

export default async function InfoGameAwardsPage({
    params, 
    searchParams
} : {
    params: Promise<{}>;
    searchParams: Promise<{ id:number,aw:number }>;
}) {

    const { id, aw }     = await searchParams; 
    const juegoMatch = await getGamesMatch(id);
    const juegosTienda = await getGamesTienda(id);

    let award25='';
    let award24='';
    if(aw==24){
        award24='bg-primary';
    }
    if(aw==25){
        award25='bg-primary';
    }

    return (
        
        <div className="min-h-screen bg-[rgb(21,93,137)]">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <NavigationMenu className="relative z-10 flex  w-screen text-secondary-foreground  w-[100%]">
                        <NavigationMenuList className="center m-0 flex flex-wrap list-none rounded-md bg-white p-1 shadow-blackA4">
                            <NavigationMenuItem>
                                <NavigationMenuLink className={`block select-none rounded px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none ${award25} hover:bg-primary/30`} 
                                style={{cursor: 'pointer'}} asChild>
                                    
                                    <a href="/gameawards?aw=25" className="flex items-center space-x-1 hover:text-gray-600">Game Awards 25</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={`block select-none rounded px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none ${award24} hover:bg-primary/30 focus:shadow-violet7`} 
                                style={{cursor: 'pointer'}} asChild>

                                    
                                    <a href="/gameawards?aw=24" className="flex items-center space-x-1 hover:text-gray-600">Game Awards 24</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>        
                    <div className="grid grid-info gap-info border rounded-lg shadow-sm bg-squirtle-gray mt-[2em]">
                        <div className="text-secondary-foreground colspan-award">
                            
                            {juegoMatch.map((matchgame, index) => (
                                <img key={index} width="100%" src={matchgame.imageUrl} className="" title={matchgame.title}/>
                            ))}
                            
                        </div>
                        <div className="text-secondary-foreground m-4">
                            {juegoMatch.map((matchgame, index) => (
                            <div key={index} className="w-[100%] pt-[1em] medium-bold">
                                <div className="w-[100%] ">
                                    Nombre: {matchgame.title}
                                </div>
                                <div className="w-[100%]">
                                    Generos: 
                                    {matchgame.genre.map((gen, index) => (
                                        <span className="pr-1 text-gray-300 bg-secondary round-price" key={index}>{gen}</span>
                                    ))}
                                </div>
                                <div className="w-[100%] ">
                                    Fecha lanzamiento: {matchgame.releaseDate}
                                </div>
                                <div className="w-[100%] ">
                                    Clasificación
                                </div>
                                <div className="w-[100%] ">
                                    {matchgame.clasificationList.map((clasifica, index) =>(
                                        <span key={index} className="pr-1 float-left" >
                                            <Image src={clasifica.url} width={50} height={50} alt={clasifica.clasification} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            ))}
                        </div>
                        <div className="col-span-2 text-secondary-foreground m-4">
                            <Accordion className="w-[100%] mt-12 rounded-md bg-squirtle-gray shadow-[0_2px_10px] shadow-black/5" type="single">
                            {juegosTienda.map((storegame, index) => (
                                
                                <AccordionItem key={index} value="item-1" className={(index=== juegosTienda.length-1)?"hover:bg-primary/30 height-row-award text-secondary-foreground medium-bold":
                                "hover:bg-primary/30 height-row-award text-secondary-foreground medium-bold separator-bottom"}>
                                
                                    <AccordionTrigger className="w-[15%] h-[100%] float-left cursor-default" > 
                                        <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={storegame.logoStore}  /></span>
                                    </AccordionTrigger>
                                    <AccordionTrigger className="width-info-title h-[100%] float-left pl-1 small-font cursor-default"> 
                                        <span className="w-[100%] flex text-left">{storegame.title}</span>
                                        <span className="w-[100%] flex"><img className="w-[10%] h-[10%]" src={storegame.platformUrl}/> 
                                         - <p className={`text-${storegame.color}-500`}>{storegame.platform}</p>
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionTrigger className="width-info-price h-[100%] float-left cursor-default">
                                    
                                    <span  className="w-[50%] flex float-right medium-font text-green-600 text-area-rows">${storegame.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                    
                                    {
                                        storegame.discountPercentage>0 ? 
                                        <span className="w-[40%] small-font text-sm flex float-right text-gray-500 line-through pt-1 mr-1 text-area-rows">${storegame.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                        : ""
                                    }
                                    
                                    <span className="w-[42%] flex float-right text-primary-foreground bg-secondary round-price mt-1">-{storegame.discountPercentage} %</span>
                                    
                                    </AccordionTrigger>
                                    <div className="m-auto mt-4 width-info-bottom  flex float-right">
                                                
                                        <Button  className="cursor-pointer w-[90%] ml-2 small-font bg-accent">
                                            <a href={storegame.dealUrl} target="_blank" rel="noopener noreferrer">
                                            
                                            Comprar ahora
                                            </a>
                                        </Button>   
                                                              
                                    </div>
                                </AccordionItem>
                            ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}