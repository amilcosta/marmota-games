import Image from "next/image";
import marmota from "@/public/marmotapay.png";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function PreguntasFrecuentes() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 bg-squirtle-gray rounded-md pt-[2em] pb-[2em]">
                    <div className="grid grid-cols-1  w-[90%] m-auto">
                    <div className="justify-center text-center">
                        <h1 className="text-secondary-foreground w-[100%] text-3xl pb-3">Preguntas Frecuentes</h1>
                    </div>
                    
                    <Accordion type="single" defaultValue="nace" collapsible >
                        <AccordionItem value="nace" className="hover:bg-primary/30">
                            <AccordionTrigger className="text-secondary-foreground text-2xl">¿Cómo nació MarmotaPay?</AccordionTrigger>
                            <AccordionContent className="high-font">
                                Nació de una simple necesidad: Comprar el videojuego que queremos al mejor precio posible.<br></br>
                                Como muchos, hemos pasado horas navegando en internet buscando un juego que queremos, en esa búsqueda del “tesoro”
                                nos preguntamos: <br></br>¿por qué no hay una página que permita comparar precios entre tiendas?.<br></br><br></br>
                                Así que decidimos crear una página que sea una respuesta a nuestra necesidad.
                            </AccordionContent> 
                        </AccordionItem>

                        <AccordionItem value="busqueda" className="hover:bg-primary/30">
                            <AccordionTrigger className="text-secondary-foreground text-2xl">¿Qué buscamos?</AccordionTrigger>
                            <AccordionContent className="high-font">
                                Esta página nos ahorrará mucho tiempo a nosotros, y nuestro único deseo es ofrecerla a la comunidad para que tanto 
                                vendedores como compradores se beneficien.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="servicios" className="hover:bg-primary/30">
                            <AccordionTrigger className="text-secondary-foreground text-2xl">¿Cuáles servicios ofrecemos?</AccordionTrigger>
                            <AccordionContent className="high-font">
                                Mientras creábamos esta página pensamos en varios proyectos que nos parecieron interesantes, por ejemplo, la sección 
                                “Game Awards“, nuestra oferta principal es gratuita y es la poder buscar un videojuego en diferentes tiendas.<br></br><br></br>
                                Si te interesa escuchar más sobre lo que podemos ofrecer, visita la sección “El Cofre de la Marmota” para usuarios premium.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="almacena" className="hover:bg-primary/30">
                            <AccordionTrigger className="text-secondary-foreground text-2xl">¿Cómo almacenan mis datos?</AccordionTrigger>
                            <AccordionContent className="high-font">
                                Los únicos datos que almacenamos son los datos de los videojuegos, los cuales son públicos y de libre acceso para 
                                cualquier persona de internet. No almacenamos datos (cookies) de las personas que nos visitan.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="alianza" className="hover:bg-primary/30">
                            <AccordionTrigger className="text-secondary-foreground text-2xl">¿Tienen alguna alianza?</AccordionTrigger>
                            <AccordionContent className="high-font">
                                No, ninguna. No tenemos alianzas con tiendas, sitios webs, empresas u otros.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="mt-[2em]">
                        <h1 className="text-secondary-foreground text-2xl">*** IMPORTANTE ***</h1>
                        <h2 className="high-text">Si tienes dudas contáctanos directamente por Telegram.</h2>
                    </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}