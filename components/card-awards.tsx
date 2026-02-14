
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const CardAwardsComponent = ({ game, award}: any) => {

    return (
        <Link key={game.id} href={{pathname: '/gameawards/infogame', query: { id: game.id,aw: award }}} className="">
            <Card className="bg-squirtle-gray pos-sticky product-box-awards text-secondary-foreground">
                <CardHeader className="card-header-search">
                    <CardTitle className="high-font-award">{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="medium-bold">
                    <img width="100%" src={game.imageUrl} className="" title={game.title}/>
                </CardContent>
                <CardFooter>
                    {game.winner==1 ? 
                    <div className="w-[150px] trophy">
                        <img src="https://nbg1.your-objectstorage.com/marmota/tienda_logo/trophy.png" width="18%" alt="trophy" className="float-left " />
                        <span className="ml-[1em]">Ganador</span>
                    </div>
                        : "" }
                </CardFooter>
            </Card>
        </Link>
    );
}

export default CardAwardsComponent;