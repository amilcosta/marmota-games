import Image from "next/image";
import marmota from "@/public/marmotapay.png";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/footer";

export default async function Nosotros() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="grid grid-cols-1">
                        <div className="w-[100%] mt-12 text-secondary-foreground">
                            <Card className="bg-squirtle-gray rounded-md shadow-[0_2px_10px] shadow-black/5 border-0">
                                <CardContent className="medium-bold">
                                    <div className="grid grid-cols-1 justify-center pt-2 text-center">
                                        <h1 className="text-secondary-foreground w-[100%] text-3xl pb-3">Nosotros</h1>
                                        <div className="medium-font min-h-64">
                                            Marmota Pay nació como una opcion de visualizacion de precios de videojuegos fisicos, mostrando los descuentos que ocurren en el año 
                                            de las distintas Tiendas Chilenas que se dedican a la venta de videojuegos. <br></br>
                                            Ha sido una iniciativa motivada por la necesidad de buscar una mejor opcion para la compra de videojuegos fisicos, que afecte lo menos posible
                                            el bolsillo del amante de los videojuegos y asi ser mas viable su coleccion.<br></br><br></br>
                                            
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
        
    )
}