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

export default async function GameSearch({searchParams}:{
    searchParams?:{
        query?: string;
        page?: string;
        precio?: string;
        t?: string;
        pf: string;
    }
}){
    
    const query = searchParams?.query || '';
    const priceval = searchParams?.precio || '';
    const shopval = searchParams?.t || '';
    const page = searchParams?.page ? parseInt(searchParams.page) : 1;
    const platform = searchParams?.pf ? parseInt(searchParams.pf) : 0;
    const tiendas = await getTiendas();
    const platforms = await getPlatforms();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-secondary-foreground mb-2">Consultar por videojuego</h1>
                    <Search placeholder="Buscar juego" />
                </div>
                <div className="grid grid-search md:grid-cols-4 lg:grid-cols-4 gap-info">
                    
                    <div className="w-[100%] mt-12 text-secondary-foreground">
                        <Card className="bg-squirtle-gray rounded-md shadow-[0_2px_10px] shadow-black/5 border-0 pos-sticky">
                            <CardHeader>
                                <CardContent className="medium-bold text-secondary-foreground">
                                    <div className="flex">
                                        Precio
                                    </div>
                                    <div className="soft-bold w-[100%] block ">
                                        { priceval=='5-8' || priceval=='' ? ( 
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio=5-8"+"&t="+shopval+"&pf="+platform} className="hover:text-accent">$5.000 a $8.000</a>
                                        </div>
                                        ): ""}
                                        { priceval=='8-10' || priceval=='' ? ( 
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio=8-10"+"&t="+shopval+"&pf="+platform} className="hover:text-accent">$8.000 a $10.000</a>
                                        </div>
                                        ):""}

                                        { priceval=='10-15' || priceval=='' ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio=10-15"+"&t="+shopval+"&pf="+platform} className="hover:text-accent">$10.000 a $15.000</a>
                                        </div>
                                        ):""}

                                        { priceval=='15-20' || priceval=='' ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio=15-20"+"&t="+shopval+"&pf="+platform} className="hover:text-accent">$15.000 a $20.000</a>
                                        </div>
                                        ):""}

                                        { priceval=='20-30' || priceval=='' ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio=20-30"+"&t="+shopval+"&pf="+platform} className="hover:text-accent">$20.000 a $30.000</a>
                                        </div>
                                        ):""}

                                        { priceval=='30-40' || priceval=='' ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio=30-40"+"&t="+shopval+"&pf="+platform} className="hover:text-accent">$30.000 a $40.000</a>
                                        </div>
                                        ):""}

                                        { priceval=='40-100' || priceval=='' ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio=40-100"+"&t="+shopval+"&pf="+platform} className="hover:text-accent">mas de $40.000</a>
                                        </div>
                                        ):""}

                                        { priceval!='' ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&t="+shopval} className="hover:text-accent"> volver filtro </a>
                                        </div>
                                        ):""}
                                    </div>
                                    <div className="w-[100%] block mt-3 float-left">
                                        Tienda
                                    </div>
                                    <div className="soft-bold w-[100%] block ">
                                        {tiendas?.map((tienda, index) => ( 
                                        tienda.id.toString()==shopval || shopval=='' ?     
                                        <div key={index} className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio="+priceval+"&t="+tienda.id+"&pf="+platform} className="hover:text-accent"> {tienda.nombre} </a>
                                        </div>
                                        : "" ))}
                                        { shopval!='' ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio="+priceval} className="hover:text-accent"> volver filtro </a>
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
                                            <a href={"?query="+query+"&precio="+priceval+"&t="+shopval+"&pf="+plat.id} className="hover:text-accent"> {plat.nombre} </a>
                                        </div>
                                        : "" ))}
                                        { platform!=0 ? (
                                        <div className="w-[100%] float-left">
                                            <a href={"?query="+query+"&precio="+priceval+"&t="+shopval} className="hover:text-accent"> volver filtro </a>
                                        </div>
                                        ):""}
                                    </div>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="col-span-3 ">
                        <h3 className="text-3xl font-bold medium-font text-secondary-foreground mb-2">Resultado:</h3>
                        <Table query={query} price={priceval} shop={shopval} page={page} platform={platform}/>
                    </div>
                </div>
                
            </main>
            <Footer />
        </div>
    )
}