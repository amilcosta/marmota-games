import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { getGameYear25, getGameNarrative25, getGameArtDirection25, getGameScoreMusic25, getGameMusicDesign25,
    getGameAction25, getGamesActionAdventure25, getGameFighting25, getGameFamily25, getGameSports25, getGameYear24,
    getGameNarrative24,getGameArtDirection24,getGameScoreMusic24
 } from "@/lib/game-awards";
import CardAwards from  '@/components/card-awards';


export default async function GameAwardsPage({
    params, 
    searchParams
} : {
    params: Promise<{}>;
    searchParams: Promise<{ aw:number }>;
}) {

    const { aw }     = await searchParams;

    const gamesYear25 = await getGameYear25();
    const gamesNarrative = await getGameNarrative25();
    const gamesArtDirect = await getGameArtDirection25();
    const gamesScoreMusic = await getGameScoreMusic25();
    const gamesMusicDesign = await getGameMusicDesign25();
    const gamesAction25 = await getGameAction25();
    const gamesActionAdventure25 = await getGamesActionAdventure25();
    const gamesFighting25 = await getGameFighting25();
    const gamesFamily25 = await getGameFamily25();
    const gamesSports25 = await getGameSports25();

    const gamesYear24 = await getGameYear24();
    const gamesNarrative24 =await getGameNarrative24();
    const gamesArtDirection24 = await getGameArtDirection24();
    const gamesScoreMusic24 = await getGameScoreMusic24();

    let anio='2025';
    if(aw==25){
        anio='2025';
    }
    if(aw==24){
        anio='2024';
    }

    return (
        <div className="min-h-screen bg-[rgb(21,93,137)]">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 ">
                    <h1 className="text-3xl font-bold text-white mb-2 text-center">Sección Game Awards</h1>
                    <Tabs defaultValue={anio} >
                        <TabsList >
                            <TabsTrigger value="2025" className="hover:bg-primary/30">
                                Game Awards 2025
                            </TabsTrigger>
                            <TabsTrigger value="2024" className="hover:bg-primary/30">
                                Game Awards 2024
                            </TabsTrigger>
                            {/*<TabsTrigger value="2023" className="hover:bg-primary/30">
                                Game Awards 2023
                            </TabsTrigger>*/}
                        </TabsList>
                        <TabsContent value="2025" className="pt-[2em]">
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Juego del Año</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesYear25.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} className="hover:bg-primary/30"></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Narrativa</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesNarrative.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Direccion de Arte</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesArtDirect.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Banda Sonora</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesScoreMusic.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Diseño de Musica</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesMusicDesign.map((game) => (
                                <CardAwards key={game.id} game={game}  award={25}></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Juego Acción</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesAction25.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Juego Acción-Aventura</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesActionAdventure25.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Juego de Pelea</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesFighting25.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Juego Familia</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesFamily25.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Juego de Deportes/Carreras</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesSports25.map((game) => (
                                <CardAwards key={game.id} game={game} award={25} ></CardAwards>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="2024" className="pt-[2em]">
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Juego del Año</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesYear24.map((game) => (
                                <CardAwards key={game.id} game={game} award={24} className="hover:bg-primary/30"></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Narrativa</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesNarrative24.map((game) => (
                                <CardAwards key={game.id} game={game} award={24} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Direccion de Arte</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesArtDirection24.map((game) => (
                                <CardAwards key={game.id} game={game} award={24} ></CardAwards>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Nominados Mejor Banda Sonora</h2>
                            <div className="grid grid-search-awards gap-4 pb-[2em]">
                                {gamesScoreMusic24.map((game) => (
                                <CardAwards key={game.id} game={game} award={24} ></CardAwards>
                                ))}
                            </div>
                            
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    )
}