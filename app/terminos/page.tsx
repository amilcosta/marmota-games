import Image from "next/image";
import marmota from "@/public/marmotapay.png";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/footer";

export default async function Terminos() {
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
                                        <h1 className="text-secondary-foreground w-[100%] text-3xl pb-3">Términos y Condiciones</h1>
                                        <div className="medium-font min-h-48 text-left">
                                            El acceso y la utilización de este sitio web (en adelante, el Sitio), así como de sus servicios proporcionados a través de las redes sociales 
                                            (Twitter, Instagram, Telegram y otras plataformas adicionales) o cualquier otra página o aplicación accesible desde el Sitio, están sujetos 
                                            a la aceptación plena de los términos y condiciones que se detallan en este documento. <br></br>
                                            Al acceder al Sitio, utilizarlo directa o indirectamente, leerlo o participar en él, el usuario acepta automáticamente estos Términos y Condiciones en su totalidad. 
                                            Si no se aceptan dichas condiciones, se excluye la posibilidad de acceder o hacer uso de la información disponible en los diversos medios proporcionados por Marmota Pay. <br></br>
                                                     
                                        </div>
                                        <h1 className="text-secondary-foreground w-[100%] text-3xl pb-3">Privacidad y Confidencialidad</h1>
                                        <div className="medium-font min-h-52 text-left">
                                            Al acceder a nuestro sitio web o utilizar nuestra aplicación y servicios en cualquiera de nuestras plataformas, usted acepta explícitamente las siguientes disposiciones:<br></br>
                                            <p>- <span className="font-bold">Uso de la Información del Usuario:</span> Marmota Pay se reserva el derecho de utilizar la información recopilada de los Usuarios dentro de los límites establecidos por la legislación vigente. 
                                                Su acceso al sitio y el uso de nuestra aplicación y servicios implican la aceptación de estas condiciones.</p><br></br>
                                            <p>- <span className="font-bold">Veracidad de la Información:</span> La exactitud de la información personal proporcionada en la aplicación o el sitio es responsabilidad exclusiva del Usuario. 
                                                Marmota Pay no asume la responsabilidad de verificar la identidad del Usuario y se reserva el derecho, a su discreción, de llevar a cabo dicha verificación.</p><br></br>    
                                        </div>
                                        <h1 className="text-secondary-foreground w-[100%] text-3xl pb-3">Responsabilidad</h1>
                                        <div className="medium-font min-h-48 text-left">
                                            Marmota Pay opera únicamente como una plataforma de divulgación de información en todos sus sitios web y redes sociales. En ningún caso asumimos responsabilidad por el uso que los usuarios finales hagan de dicha información, 
                                            ni garantizamos la veracidad o cumplimiento de las ofertas proporcionadas por terceros, ya sean veraces o falsas.<br></br>
                                            Los precios finales en las tiendas pueden ser diferentes a los mostrados. Siempre verifica el monto que vas a pagar. Considera y verifica los costos asociados a la compra, como el
                                            valor de los envíos de paquetes u otros, antes de pagar.<br></br>
                                            NUNCA entregues información confidencial, por ningún medio te la pediremos. NUNCA te pediremos información confidencial sobre tus compras.
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