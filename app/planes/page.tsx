import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default async function PlanPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-[100%] flex text-secondary-foreground justify-center">
                    <div className="  w-[60%]">
                        <span className="w-[100%] text-2xl font-bold block text-center"> Planes </span>
                        <span className="w-[100%] block text-secondary-foreground">
                            <p><strong>Marmota pay</strong> te ofrece la oportunidad de escoger un plan de notificaciones de las ofertas de videojuegos asociadas 
                            a las tiendas que tenemos registradas, con el fin de poder ayudarte a conocer cuando una tienda ha bajado de precio de algun videojuego.</p>
                            <p> </p>

                        </span>
                    </div>
                </div>
                <div className="w-[100%] flex text-secondary-foreground justify-center text-3xl font-bold mt-10">
                    Escoge el plan que se adapte a ti
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="w-[100%] mt-12 text-secondary-foreground">
                        <Card className="bg-squirtle-gray rounded-md text-secondary-foreground">
                            <CardHeader>
                                <CardTitle className="text-center text-secondary-foreground">Plan Gratis</CardTitle>
                            </CardHeader>
                            <CardContent className="medium-bold">
                                <div className="flex text-2xl">CLP $0/Mes </div>
                                <div className="flex text-xs text-gray-600">Incluye impuestos </div>
                                <br></br>
                                <hr></hr>
                                <div className="flex mt-2">
                                    <div className="float-left display-block w-plan-check">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00b090" className="mr-3">
                                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                                        <path d="M16.293 8.293 11 13.586l-2.293-2.293-1.414 1.414L11 16.414l6.707-6.707-1.414-1.414z"/>
                                        </svg>
                                    </div>
                                    <div className="float-left display-block w-[93%]">
                                    <span className="text-gray-600 text-base"> Acceso a la web</span>
                                    </div>
                                </div>
                                <div className="flex mt-2">
                                    <div className="float-left display-block w-plan-check">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00b090" >
                                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                                        <path d="M16.293 8.293 11 13.586l-2.293-2.293-1.414 1.414L11 16.414l6.707-6.707-1.414-1.414z"/>
                                        </svg>
                                    </div>
                                    <div className="float-left display-block w-[93%]">
                                        <span className="text-gray-600 text-base"> Recibir notificacion sobre 3 videojuegos aleatorios que han bajado de precio 
                                        en canal gratis de Telegram</span>
                                    </div>
                                </div>
                                <div className="mt-9">
                                    <Button  className="cursor-pointer w-[50%] small-font bg-accent block m-auto">
                                        <a href="/auth/signup" target="_blank" rel="noopener noreferrer">
                                            Registrarse
                                        </a>
                                    </Button>   
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-[100%] mt-12 text-secondary-foreground">
                        <Card className="bg-squirtle-gray rounded-md text-secondary-foreground">
                            <CardHeader>
                                <CardTitle className="text-center">Plan Premium</CardTitle>
                            </CardHeader>
                            <CardContent className="medium-bold">
                                <div className="flex text-2xl">CLP $3.000/Mes </div>
                                <div className="flex text-xs text-gray-600">Incluye impuestos </div>
                                <br></br>
                                <hr></hr>
                                <div className="flex mt-2">
                                    <div className="float-left display-block w-plan-check">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00b090">
                                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                                        <path d="M16.293 8.293 11 13.586l-2.293-2.293-1.414 1.414L11 16.414l6.707-6.707-1.414-1.414z"/>
                                        </svg>
                                    </div>
                                    <div className="float-left display-block w-[93%]">
                                        <span className="text-gray-600 pl-1 text-base"> Acceso a la web</span>
                                    </div>
                                </div>
                                <div className="flex mt-2">
                                    <div className="float-left display-block w-plan-check">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00b090">
                                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                                        <path d="M16.293 8.293 11 13.586l-2.293-2.293-1.414 1.414L11 16.414l6.707-6.707-1.414-1.414z"/>
                                        </svg>
                                    </div>
                                    <div className="float-left display-block w-[93%]">
                                    <span className="text-gray-600 pl-1 text-base"> Recibir notificacion de  <strong>todos</strong> los videojuegos que han bajado de precio 
                                        en los canales premium de Telegram clasificado por consola de videojuegos
                                    </span>
                                    </div>
                                </div>
                                <div className="flex mt-2">
                                    <div className="float-left display-block w-plan-check">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#00b090">
                                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                                        <path d="M16.293 8.293 11 13.586l-2.293-2.293-1.414 1.414L11 16.414l6.707-6.707-1.414-1.414z"/>
                                        </svg>
                                    </div>
                                    <div className="float-left display-block w-[93%]">
                                    <span className="text-gray-600 pl-1 text-base"> Asistencia por parte de los administradores
                                    </span>
                                    </div>
                                </div>
                                <div className="mt-9">
                                    <Button  className="cursor-pointer w-[50%] small-font bg-accent block m-auto">
                                        <a href="/auth/signup" target="_blank" rel="noopener noreferrer">
                                            Registrarse
                                        </a>
                                    </Button>   
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )

}