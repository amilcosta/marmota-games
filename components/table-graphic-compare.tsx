import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {ChartComponent} from "@/components/LightweightChart";

export default function TableGrpahicCompare({data}:{data:any[]}) {

    let labelGames: string[]  = [];
    let setsVal = [];
    let storeval: number[]    = [];
    let labelStore: string [] = [];
    let cantprices: number    = 0;
    const gamesMap = new Map();
    const mapaTiendaFecha = new Map();

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    for(let stores of data){
        //console.log("DATA: ",stores)
        for(let historial of stores.history){
            let date = new Date(historial.dateHistory * 1000); // Convert to milliseconds
            let dayval = date.getDate();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');//date.toLocaleString('default', { month: 'long' }); // Get full month name
            let year = date.getFullYear();
            let day ="";
            if (dayval < 10) {
                day = '0' + dayval;
            }else{
                day = dayval.toString();
            }
            let labelYear = year+'-'+month+'-'+day;

            if(!labelGames.includes(labelYear)){
                labelGames.push(labelYear);    
                cantprices=cantprices+1;        
            }
            if(!storeval.includes(historial.id)){
                storeval.push(historial.id);
                labelStore.push(historial.storeName);
            }

            if (!mapaTiendaFecha.has(historial.storeName+"-"+stores.title)) {
                mapaTiendaFecha.set(historial.storeName+"-"+stores.title, []);
            }
            //mapaTiendaFecha.get(stores.storeName).push({fecha: labelYear, precio: stores.price})
            if(!mapaTiendaFecha.get(historial.storeName+"-"+stores.title).some(item => typeof item === 'object' && item.time === labelYear)){
                mapaTiendaFecha.get(historial.storeName+"-"+stores.title).push({ time: labelYear, value: historial.price});
            }
        }
    }

    for(const labels of labelGames){
        let precioAnterior: number = 0;
        let timeAnterior: string ="";
        for(const [stor, data] of mapaTiendaFecha){
            let flag: number =0;
            if (!gamesMap.has(stor)) {
                gamesMap.set(stor, []);
            }
            for(const datafech of data){
                precioAnterior = datafech.value;
                timeAnterior = datafech.time;
                if(labels.includes(datafech.time)){
                    gamesMap.get(stor)?.push({time: datafech.time, value: datafech.value})
                    flag = 1;
                }
            }
            
            if(flag === 0){
                gamesMap.get(stor)?.push({time: timeAnterior, value: precioAnterior})
            }
        }

    }

    for(const [key, data] of mapaTiendaFecha){
        let setValues = {
            label: key.toUpperCase(),
            data: data,
            borderColor: getRandomColor(),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            stepped: true,
        }
        setsVal.push(setValues);
    }

    const linedata = {
        labels: labelGames,
        lines: setsVal
    }


    return (
        <div className="mb-8 text-secondary-foreground">
            <Card className="bg-squirtle-gray">
                <CardHeader>
                    <CardTitle>Precio por tienda y videojuego</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartComponent data={linedata} />
                </CardContent>
            </Card>
        </div>
    )

}