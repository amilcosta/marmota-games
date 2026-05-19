//import Search from '@/components/search-game';
// ;
import Search from '@/components/search-videogame';
import Navigation from "@/components/navigation";
import TopMenuGames from "@/components/top-menu-games";
import Table from '@/components/table-search';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getTiendas, getPlatforms } from "@/lib/search-handler";
import Footer from "@/components/footer";
import Slider from '@/components/price-range';
//import { Slider as SliderPrimitive } from 'radix-ui';


export default async function GameSearch({searchParams}:{
    searchParams?:{
        query?: string;
        page?: string;
        precio?: string;
        t?: string;
        pf: string;
        p1: string;
        p2: string;
    }
}){
    
    const query = searchParams?.query || '';
    const priceval = searchParams?.precio || '';
    const shopval = searchParams?.t || '';
    const page = searchParams?.page ? parseInt(searchParams.page) : 1;
    const platform = searchParams?.pf ? parseInt(searchParams.pf) : 0;
    const p1 = searchParams?.p1 ? searchParams.p1 : '0';
    const p2 = searchParams?.p2 ? searchParams.p2 : '130000';
    const tiendas = await getTiendas();
    const platforms = await getPlatforms();
    

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Consultar por Videojuego</h1>
                    <Search placeholder="Buscar Juego" />
                </div>
                <div className="grid grid-search md:grid-cols-4 lg:grid-cols-4 gap-info">
                    
                    <div className="w-[100%] mt-12 text-secondary-foreground">
                        <Card className="bg-squirtle-gray rounded-md shadow-[0_2px_10px] shadow-black/5 border-0 pos-sticky">
                            <CardHeader>
                                <CardContent className="medium-bold text-secondary-foreground">  
                                    <Slider price_init={p1} price_end={p2}></Slider>
                                    
                                    <div className="w-[100%] block mt-4 float-left">
                                        Tienda
                                    </div>
                                    <div className="soft-bold w-[100%] block ">
                                        {tiendas?.map((tienda, index) => ( 
                                        tienda.id.toString()==shopval || shopval=='' ?     
                                        <div key={index} className="w-[100%] float-left">
                                            {shopval=='' ?
                                            <a href={"?query="+query+"&p1="+p1+"&p2="+p2+"&t="+tienda.id+"&pf="+platform} className="hover:text-accent"> {tienda.nombre} </a>
                                            : <a href={"?query="+query+"&p1="+p1+"&p2="+p2+"&t="+tienda.id+"&pf="+platform} className="hover:text-accent font-normal"> {tienda.nombre} </a>
                                            }
                                        </div>
                                        : "" ))}
                                        { shopval!='' ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&p1="+p1+"&p2="+p2} className="hover:text-accent"> &larr; Limpiar Filtro </a>
                                        </div>
                                        ):""}
                                    </div>

                                    <div className="w-[100%] block mt-3 float-left">
                                        Plataforma
                                    </div>
                                    <div className="soft-bold w-[100%] block ">
                                        {platforms?.map((plat, index) => ( 
                                         plat.id==platform || platform==0 ?     
                                        <div key={index} className="w-[100%] float-left">
                                            { platform==0 ? 
                                            <a href={"?query="+query+"&p1="+p1+"&p2="+p2+"&t="+shopval+"&pf="+plat.id} className="hover:text-accent "> {plat.nombre} </a>
                                           :  <a href={"?query="+query+"&p1="+p1+"&p2="+p2+"&t="+shopval+"&pf="+plat.id} className="hover:text-accent font-normal"> {plat.nombre} </a>
                                            }
                                        </div>
                                        : "" ))}
                                        { platform!=0 ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&p1="+p1+"&p2="+p2+"&t="+shopval} className="hover:text-accent"> &larr; Limpiar Filtro </a>
                                        </div>
                                        ):""}
                                    </div>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="col-span-3 ">
                        <h3 className="text-3xl font-bold medium-font text-secondary-foreground mb-2">Resultado:</h3>
                        <Table query={query} priceinit={p1} priceend={p2} shop={shopval} page={page} platform={platform}/>
                    </div>
                </div>
                
            </main>
            <Footer />
        </div>
    )
}