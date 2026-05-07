import { getGameDealsDTO, getNewDealsDTO, getBestDealsDTO } from "@/lib/deals-dal"
import GameDealCard from "@/components/game-deal-card"
import Navigation from "@/components/navigation";
//import Comparador from "@/components/comparador";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import Link from "next/link";
import TopMenuGames from "@/components/top-menu-games";
import Footer from "@/components/footer";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const gameDeals = await getGameDealsDTO();
  const newDeals = await getNewDealsDTO();
  const bestDeals = await getBestDealsDTO();

  let visibleSpin: boolean = false;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopMenuGames allSelected='bg-primary' switchSelected='' switchTwoSelected='' ps4Selected='' ps5Selected=''/>

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
          <div className="mb-8">
            <Link href={{pathname: `/gameawards`}}>
            <img src="https://nbg1.your-objectstorage.com/marmota/title_images/GameAwards2025Banner2.jpg" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Nuevos Descuentos</h1>
              <Accordion className="w-[100%] rounded-md bg-squirtle-gray shadow-[0_2px_10px] shadow-black/5" type="single">
              {newDeals.map((newsdeals, index) => (              
                <AccordionItem key={newsdeals.id+'_'+index} value={index + '_'} className={(index=== newDeals.length-1)?"hover:bg-primary/30 height-row text-secondary-foreground medium-bold":
                "hover:bg-primary/30 height-row text-secondary-foreground medium-bold separator-bottom"}>
                  <Link href={{pathname: `/${newsdeals.platform}/infogame`, query: { id: newsdeals.id }}} className="flex items-center space-x-1 h-[100%] ">
                    <AccordionTrigger className="w-[17%] h-[100%] float-left " > 
                      <span className="w-[100%] h-[100%]"><img className="w-[100%] h-[100%]" src={newsdeals.imageUrl} /></span>
                    </AccordionTrigger>
                    <AccordionTrigger className="with-row h-[100%] float-left pl-1 small-font"> 
                      <span className="w-[100%] flex text-left">{newsdeals.title}</span>
                      <span className="w-[100%] flex">
                        
                            {newsdeals.platform =='switch1' ? (
                            <nav className="w-[70%]">
                            <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                            <g fill="red">
                                <path d="M8.172 8.005c0-3.833.01-6.976.02-6.985.01-.011.59-.02 1.285-.02 1.009 0 1.322.009 1.525.044a3.599 3.599 0 0 1 2.952 2.91c.04.212.046.708.046 4.034 0 3.553.004 3.97-.107 4.355-.02.066-.043.13-.07.211a3.62 3.62 0 0 1-2.998 2.422c-.278.028-2.528.04-2.606.011-.044-.018-.047-.658-.047-6.982Zm4.091.235a1.418 1.418 0 0 0-.974-.905 1.408 1.408 0 0 0-1.695.94 1.663 1.663 0 0 0-.013.818 1.428 1.428 0 0 0 1.708.968c.447-.119.795-.44.972-.9.096-.249.098-.648.002-.92ZM3.246 3.903c-.182.035-.46.174-.608.304-.305.263-.455.638-.432 1.078.011.23.026.29.119.476.135.281.341.487.623.626.194.096.243.108.496.116.228.009.31 0 .464-.052.629-.212 1.009-.823.9-1.45a1.33 1.33 0 0 0-1.562-1.098Z"></path>
                                <path d="M2.997 1.047a3.619 3.619 0 0 0-2.87 2.638c-.127.49-.136.777-.122 4.578.008 3.492.012 3.572.07 3.842.322 1.452 1.354 2.489 2.82 2.83.193.044.435.053 2.004.062 1.624.01 1.792.008 1.835-.035.044-.044.047-.604.047-6.948 0-4.703-.01-6.918-.03-6.959-.028-.052-.078-.055-1.775-.052-1.381.003-1.796.012-1.978.044ZM5.622 13.88l-1.181-.015c-1.087-.01-1.203-.017-1.42-.072a2.458 2.458 0 0 1-1.82-1.896c-.065-.294-.065-7.508-.004-7.795A2.49 2.49 0 0 1 2.7 2.31c.383-.154.56-.172 1.8-.175l1.122-.003V13.88h.001Zm18.706"></path>
                            </g> 
                            </svg> <p className="float-left xsmall-font text-red-600 pt-[2px]">Nintendo Switch 1</p><p className="float-left pl-[1em]"> - </p> 
                            {newsdeals.deals.map((deal) => (                               
                                <img key={deal.id} width="20px" src={newsdeals.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                                
                              ))}
                            </nav>
                            ) : newsdeals.platform == 'switch2' ?( 
                              <nav className="w-[70%]">
                                <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                                  <g fill="red">
                                      <path d="M8.172 8.005c0-3.833.01-6.976.02-6.985.01-.011.59-.02 1.285-.02 1.009 0 1.322.009 1.525.044a3.599 3.599 0 0 1 2.952 2.91c.04.212.046.708.046 4.034 0 3.553.004 3.97-.107 4.355-.02.066-.043.13-.07.211a3.62 3.62 0 0 1-2.998 2.422c-.278.028-2.528.04-2.606.011-.044-.018-.047-.658-.047-6.982Zm4.091.235a1.418 1.418 0 0 0-.974-.905 1.408 1.408 0 0 0-1.695.94 1.663 1.663 0 0 0-.013.818 1.428 1.428 0 0 0 1.708.968c.447-.119.795-.44.972-.9.096-.249.098-.648.002-.92ZM3.246 3.903c-.182.035-.46.174-.608.304-.305.263-.455.638-.432 1.078.011.23.026.29.119.476.135.281.341.487.623.626.194.096.243.108.496.116.228.009.31 0 .464-.052.629-.212 1.009-.823.9-1.45a1.33 1.33 0 0 0-1.562-1.098Z"></path>
                                      <path d="M2.997 1.047a3.619 3.619 0 0 0-2.87 2.638c-.127.49-.136.777-.122 4.578.008 3.492.012 3.572.07 3.842.322 1.452 1.354 2.489 2.82 2.83.193.044.435.053 2.004.062 1.624.01 1.792.008 1.835-.035.044-.044.047-.604.047-6.948 0-4.703-.01-6.918-.03-6.959-.028-.052-.078-.055-1.775-.052-1.381.003-1.796.012-1.978.044ZM5.622 13.88l-1.181-.015c-1.087-.01-1.203-.017-1.42-.072a2.458 2.458 0 0 1-1.82-1.896c-.065-.294-.065-7.508-.004-7.795A2.49 2.49 0 0 1 2.7 2.31c.383-.154.56-.172 1.8-.175l1.122-.003V13.88h.001Zm18.706"></path>
                                  </g>
                                </svg><p className="float-left xsmall-font text-red-600">Nintendo Switch 2</p><p className="float-left pl-[1em]"> - </p>   
                                {newsdeals.deals.map((deal) => (
                                  <img key={deal.id} width="20px" src={newsdeals.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                                
                                ))}
                              </nav>
                            ): newsdeals.platform =='ps4' ? ( 
                              <nav className="w-[70%]">
                                <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                                  <path d="M15.858 11.451c-.313.395-1.08.676-1.08.676l-5.695 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.16-.054s.808-.286 1.943-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356ZM9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072v.001ZM1.2 12.508C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.453 8.453 0 0 1-4.018-.323v.001Z" fill="blue"></path>
                                </svg> <p className="float-left xsmall-font text-blue-600">Play Station 4</p> <p className="float-left pl-[1em]"> - </p> 
                                {newsdeals.deals.map((deal) => (
                                  <img key={deal.id} width="20px" src={newsdeals.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                                
                                ))}
                              </nav>
                            ): newsdeals.platform =='ps5' ? ( 
                              <nav className="w-[70%]">
                                <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                                  <path d="M15.858 11.451c-.313.395-1.08.676-1.08.676l-5.695 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.16-.054s.808-.286 1.943-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356ZM9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072v.001ZM1.2 12.508C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.453 8.453 0 0 1-4.018-.323v.001Z" fill="gray"></path>
                                </svg> <p className="float-left xsmall-font text-gray-600 pt-[2px]">Play Station 5</p> <p className="float-left pl-[1em]"> - </p>   
                                {newsdeals.deals.map((deal) => (     
                                  <img key={deal.id} width="20px" src={newsdeals.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                             
                                ))}
                              </nav>
                            ): ''}                       
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
                      <span className="w-[100%] flex">
                        {bestdeals.platform =='switch1' ? (
                            <nav className="w-[70%]">
                            <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                            <g fill="red">
                                <path d="M8.172 8.005c0-3.833.01-6.976.02-6.985.01-.011.59-.02 1.285-.02 1.009 0 1.322.009 1.525.044a3.599 3.599 0 0 1 2.952 2.91c.04.212.046.708.046 4.034 0 3.553.004 3.97-.107 4.355-.02.066-.043.13-.07.211a3.62 3.62 0 0 1-2.998 2.422c-.278.028-2.528.04-2.606.011-.044-.018-.047-.658-.047-6.982Zm4.091.235a1.418 1.418 0 0 0-.974-.905 1.408 1.408 0 0 0-1.695.94 1.663 1.663 0 0 0-.013.818 1.428 1.428 0 0 0 1.708.968c.447-.119.795-.44.972-.9.096-.249.098-.648.002-.92ZM3.246 3.903c-.182.035-.46.174-.608.304-.305.263-.455.638-.432 1.078.011.23.026.29.119.476.135.281.341.487.623.626.194.096.243.108.496.116.228.009.31 0 .464-.052.629-.212 1.009-.823.9-1.45a1.33 1.33 0 0 0-1.562-1.098Z"></path>
                                <path d="M2.997 1.047a3.619 3.619 0 0 0-2.87 2.638c-.127.49-.136.777-.122 4.578.008 3.492.012 3.572.07 3.842.322 1.452 1.354 2.489 2.82 2.83.193.044.435.053 2.004.062 1.624.01 1.792.008 1.835-.035.044-.044.047-.604.047-6.948 0-4.703-.01-6.918-.03-6.959-.028-.052-.078-.055-1.775-.052-1.381.003-1.796.012-1.978.044ZM5.622 13.88l-1.181-.015c-1.087-.01-1.203-.017-1.42-.072a2.458 2.458 0 0 1-1.82-1.896c-.065-.294-.065-7.508-.004-7.795A2.49 2.49 0 0 1 2.7 2.31c.383-.154.56-.172 1.8-.175l1.122-.003V13.88h.001Zm18.706"></path>
                            </g> 
                            </svg> <p className="float-left xsmall-font text-red-600 pt-[2px]">Nintendo Switch 1</p><p className="float-left pl-[1em]"> - </p> 
                            {bestdeals.deals.map((deal) => (                               
                                <img key={deal.id} width="20px" src={bestdeals.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                                
                              ))}
                            </nav>
                            ) : bestdeals.platform == 'switch2' ?( 
                              <nav className="w-[70%]">
                                <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                                  <g fill="red">
                                      <path d="M8.172 8.005c0-3.833.01-6.976.02-6.985.01-.011.59-.02 1.285-.02 1.009 0 1.322.009 1.525.044a3.599 3.599 0 0 1 2.952 2.91c.04.212.046.708.046 4.034 0 3.553.004 3.97-.107 4.355-.02.066-.043.13-.07.211a3.62 3.62 0 0 1-2.998 2.422c-.278.028-2.528.04-2.606.011-.044-.018-.047-.658-.047-6.982Zm4.091.235a1.418 1.418 0 0 0-.974-.905 1.408 1.408 0 0 0-1.695.94 1.663 1.663 0 0 0-.013.818 1.428 1.428 0 0 0 1.708.968c.447-.119.795-.44.972-.9.096-.249.098-.648.002-.92ZM3.246 3.903c-.182.035-.46.174-.608.304-.305.263-.455.638-.432 1.078.011.23.026.29.119.476.135.281.341.487.623.626.194.096.243.108.496.116.228.009.31 0 .464-.052.629-.212 1.009-.823.9-1.45a1.33 1.33 0 0 0-1.562-1.098Z"></path>
                                      <path d="M2.997 1.047a3.619 3.619 0 0 0-2.87 2.638c-.127.49-.136.777-.122 4.578.008 3.492.012 3.572.07 3.842.322 1.452 1.354 2.489 2.82 2.83.193.044.435.053 2.004.062 1.624.01 1.792.008 1.835-.035.044-.044.047-.604.047-6.948 0-4.703-.01-6.918-.03-6.959-.028-.052-.078-.055-1.775-.052-1.381.003-1.796.012-1.978.044ZM5.622 13.88l-1.181-.015c-1.087-.01-1.203-.017-1.42-.072a2.458 2.458 0 0 1-1.82-1.896c-.065-.294-.065-7.508-.004-7.795A2.49 2.49 0 0 1 2.7 2.31c.383-.154.56-.172 1.8-.175l1.122-.003V13.88h.001Zm18.706"></path>
                                  </g>
                                </svg><p className="float-left xsmall-font text-red-600">Nintendo Switch 2</p><p className="float-left pl-[1em]"> - </p>   
                                {bestdeals.deals.map((deal) => (
                                  <img key={deal.id} width="20px" src={bestdeals.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                                
                                ))}
                              </nav>
                            ): bestdeals.platform =='ps4' ? ( 
                              <nav className="w-[70%]">
                                <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                                  <path d="M15.858 11.451c-.313.395-1.08.676-1.08.676l-5.695 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.16-.054s.808-.286 1.943-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356ZM9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072v.001ZM1.2 12.508C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.453 8.453 0 0 1-4.018-.323v.001Z" fill="blue"></path>
                                </svg> <p className="float-left xsmall-font text-blue-600">Play Station 4</p> <p className="float-left pl-[1em]"> - </p> 
                                {bestdeals.deals.map((deal) => (
                                  <img key={deal.id} width="20px" src={bestdeals.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                                
                                ))}
                              </nav>
                            ): bestdeals.platform =='ps5' ? ( 
                              <nav className="w-[70%]">
                                <svg className="size-8 svg-icon svg-platform-nintendo-switch-1 width-icon-search pt-[3px] float-left" >
                                  <path d="M15.858 11.451c-.313.395-1.08.676-1.08.676l-5.695 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.16-.054s.808-.286 1.943-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356ZM9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072v.001ZM1.2 12.508C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.453 8.453 0 0 1-4.018-.323v.001Z" fill="gray"></path>
                                </svg> <p className="float-left xsmall-font text-gray-600 pt-[2px]">Play Station 5</p> <p className="float-left pl-[1em]"> - </p>   
                                {bestdeals.deals.map((deal) => (     
                                  <img key={deal.id} width="20px" src={bestdeals.logoStore} className="ml-2 h-[25px] float-left circle-image" title={deal.storeName}/>                             
                                ))}
                              </nav>
                            ): ''} 
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
