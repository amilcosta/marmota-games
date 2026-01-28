import "server-only"
//import { getCurrentUser } from "./auth"
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export interface GameDealDTO {
  id: number,
  title: string
  description: string
  genre: string
  platform: string
  platformName: string
  imageUrl: string
  logoConsole: string
  logoStore: string
  deals: {
    id: number
    storeName: string
    originalPrice: number
    salePrice: number
    discountPercentage: number
    dealUrl: string
    expiresAt: string | null
  }[]
  isFavorite?: boolean
}

export interface StoreDTO {
  id: number,
  title: string
  nombreStore: string
  logoStore: string
  deals: {
    id: number
    originalPrice: number
    salePrice: number
    discountPercentage: number
    dealUrl: string
    expiresAt: string | null
  }[]
}

export interface HistoryStore {
    id: number,
    price: number,
    dateHistory: number,
    storeName: string, 
}

export interface GameInfo {
    title: string,
    genre: string[],
    platform: string,
    platformid: number,
    platformUrl: string,
    releaseDate: string,
    clasificationList: ClasificaGameDTO[],
    description: string,
    imagesGame: GameImages[]
}

export interface ClasificaGameDTO {
    id: number,
    clasification: string,
    url: string
}

export interface GameImages {
    title: string,
    url: string
}

export async function getPs4DTO(): Promise<GameDealDTO[]> {

    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id,j.nombre as title, c.nombre as platform, j."idJuego" as deal_id, '+
        'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, pt."enlaceTienda" as deal_url,c."logoConsola" as logo_console '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and c."idConsola"=4 and pt.activo=1 and pt."fkConsola"=4 limit 5');
    const gamesMap = new Map<number, GameDealDTO>();

    for (const row of rows) {
        let discount = (100-(row.sale_price*100)/row.original_price);
        if(discount<0){
            discount = 0;
        }
        let platform_name= row.platform=="switch1" ? "Nintendo Switch 1" : row.platform=="switch2" ? "Nintendo Switch 2" : 
            row.platform=="ps4" ? "PlayStation 4" : "PlayStation 5";

        if (!gamesMap.has(row.game_id)) {
            gamesMap.set(row.game_id, {
                id: row.game_id,
                title: row.title,
                description: row.description,
                genre: row.genre,
                platform: row.platform,
                platformName: platform_name,
                imageUrl: row.image_url,
                deals: [],
                logoConsole: row.logo_console,
                logoStore: row.logo_store,
            })
        }

        const game = gamesMap.get(row.game_id)!
        game.deals.push({
            id: row.deal_id,
            storeName: row.store_name,
            originalPrice: Number.parseFloat(row.original_price),
            salePrice: Number.parseFloat(row.sale_price),
            discountPercentage: discount,//(100-(row.sale_price*100)/row.original_price),
            dealUrl: row.deal_url,
            expiresAt: row.expires_at,
        })
    }

    client.release();
    pool.end;
    return Array.from(gamesMap.values());
}

export async function getNewPs4DTO(): Promise<GameDealDTO[]> {
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id,j.nombrereal as title, c.nombre as platform, j."idJuego" as deal_id, j.nombre, '+
        'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, '+
        'c."logoConsola" as logo_console, t."logoTienda" as logo_store, t."idTienda" as store_id '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and c."idConsola"=4 and pt.precio<=pt."precioViejo" and pt.activo=1 and pt."fkConsola"=4 '+ 
        'order by pt.fecha desc, precio asc limit 10');
    const gamesMap = new Map<string, GameDealDTO>();
    for (const row of rows) {
        let discount = (100-(row.sale_price*100)/row.original_price);
        if(discount<0){
            discount = 0;
        }
        let platform_name= row.platform=="switch1" ? "Nintendo Switch 1" : row.platform=="switch2" ? "Nintendo Switch 2" : 
            row.platform=="ps4" ? "PlayStation 4" : "PlayStation 5";

        gamesMap.set(row.game_id+'_'+row.store_id, {
            id: row.game_id,
            title: row.title ? row.title : row.nombre,
            description: row.description,
            genre: row.genre,
            platform: row.platform,
            platformName: platform_name,
            imageUrl: row.image_url,
            deals: [{
                id: row.deal_id,
                storeName: row.store_name,
                originalPrice: Number.parseFloat(row.original_price),
                salePrice: Number.parseFloat(row.sale_price),
                discountPercentage: discount,///(100-(row.sale_price*100)/row.original_price),
                dealUrl: row.deal_url,
                expiresAt: row.expires_at,
            }],
            logoConsole: row.logo_console,
            logoStore: row.logo_store,
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getBestPs4DTO(): Promise<GameDealDTO[]> {
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id,j.nombre as title, c.nombre as platform, j."idJuego" as deal_id, '+
        'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, '+
        'c."logoConsola" as logo_console, t."logoTienda" as logo_store, t."idTienda" as store_id '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and c."idConsola"=4 and pt.activo=1 and pt."fkConsola"=4 '+ 
        'order by sale_price asc limit 10');
    const gamesMap = new Map<string, GameDealDTO>();
    for (const row of rows) {
        let discount = (100-(row.sale_price*100)/row.original_price);
        if(discount<0){
            discount = 0;
        }
        let platform_name= row.platform=="switch1" ? "Nintendo Switch 1" : row.platform=="switch2" ? "Nintendo Switch 2" : 
            row.platform=="ps4" ? "PlayStation 4" : "PlayStation 5";

            gamesMap.set(row.game_id+'_'+row.store_id, {
                id: row.game_id,
                title: row.title,
                description: row.description,
                genre: row.genre,
                platform: row.platform,
                platformName: platform_name,
                imageUrl: row.image_url,
                deals: [{
                    id: row.deal_id,
                    storeName: row.store_name,
                    originalPrice: Number.parseFloat(row.original_price),
                    salePrice: Number.parseFloat(row.sale_price),
                    discountPercentage: discount,//(100-(row.sale_price*100)/row.original_price),
                    dealUrl: row.deal_url,
                    expiresAt: row.expires_at,
                }],
                logoConsole: row.logo_console,
                logoStore: row.logo_store,
            })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getOffertsPs4DTO(juegoId: Number): Promise<StoreDTO[]> {
    const client = await pool.connect();
    const query = 'SELECT t."idTienda" as store_id, t."logoTienda" as logo_store,j.nombre as title, t."nombreTienda" as store_name, '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, pt."enlaceTienda" as deal_url, j."pkJuegoMatch" as match '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"=$1 and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and c."idConsola"=4 '+
        'and pt.activo=1 and pt."fkConsola"=4 order by sale_price asc';

    const values = [juegoId];
    const {rows} = await client.query(query, values);
    let possibleRepeat;

    const gamesMap = new Map<number, StoreDTO>();
    for (const row of rows) {
        let discount = parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1));
        if(discount<0){
            discount = 0;
        }
        possibleRepeat = row.match;
        if (!gamesMap.has(row.store_id)) {
            gamesMap.set(row.store_id, {
                id: row.store_id,
                title: row.title,
                nombreStore: row.store_name,
                logoStore: row.logo_store,
                deals: [{
                    id: row.store_id,
                    originalPrice: Number.parseFloat(row.original_price),
                    salePrice: Number.parseFloat(row.sale_price),
                    discountPercentage: discount,//parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1)),
                    dealUrl: row.deal_url,
                    expiresAt: row.expires_at,
                }],
            })
        }
    }

    const query2 = 'SELECT t."idTienda" as store_id, t."logoTienda" as logo_store,j.nombrereal as title, t."nombreTienda" as store_name, '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, pt."enlaceTienda" as deal_url, j.nombre '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"<>$1 and j."pkJuegoMatch"=$2 and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and c."idConsola"=4 '+
        'and pt.activo=1 and pt."fkConsola"=4 order by sale_price asc';
    const values2 = [juegoId, possibleRepeat];
    const matchdata = await client.query(query2, values2);

    if(matchdata.rows.length>0){
        for (const row of matchdata.rows) {
            let discount = parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1));
        if(discount<0){
            discount = 0;
        }
        if (!gamesMap.has(row.store_id)) {
            gamesMap.set(row.store_id, {
                id: row.store_id,
                title: row.title ? row.title : row.nombre,
                nombreStore: row.store_name,
                logoStore: row.logo_store,
                deals: [{
                    id: row.store_id,
                    originalPrice: Number.parseFloat(row.original_price),
                    salePrice: Number.parseFloat(row.sale_price),
                    discountPercentage: discount,//parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1)),
                    dealUrl: row.deal_url,
                    expiresAt: row.expires_at,
                }],
            })
        }
        }
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getInfoGameStorePs4DTO(juegoId: Number): Promise<HistoryStore[]> {
    const client = await pool.connect();
    const historyMap = new Map<number, HistoryStore>();
    const values = [juegoId];

    const query1 = 'SELECT j."pkJuegoMatch" as match FROM "JUEGO" j WHERE j."idJuego"=$1 ';
    const getmatch = await client.query(query1, values);

    if(getmatch.rows[0].match!=null){
        for(const row of getmatch.rows){
            const values2 = [row.match];
             const queryids = 'SELECT j."idJuego" as id from "JUEGO" j, "PRECIOTIENDA" p where j."pkJuegoMatch"=$1 '+
            'and j."idJuego"=p."fkJuego" and p.activo=1 and p."fkConsola"=4 ';
            const idsjuegos = await client.query(queryids,values2);

            let idsadd: number[]=[];
            const lastElement = idsjuegos.rows[idsjuegos.rows.length - 1]; 
            for(const row of idsjuegos.rows){
                idsadd.push(parseInt(row.id));
            }

            const valueId = [idsadd];
            const query = 'SELECT ht.precio,ht.fecha,t."nombreTienda" as store_name, t."idTienda" as store_id '+
            'FROM "HISTORICOTIENDA" ht, "TIENDA" t '+
            'WHERE ht."fkJuegoHistorial" = ANY($1) and t."idTienda"=ht."fkTiendaHistorial" and ht."fkConsola"=4 '+
            'order by fecha asc, store_name ';

        
            const {rows} = await client.query(query, valueId);
            let countrows: number = 0;
            for (const row of rows) {
                historyMap.set(countrows,{
                    id: row.store_id,
                    price: row.precio,
                    dateHistory: row.fecha,
                    storeName: row.store_name
                });
                countrows=countrows+1;
            }
        }
    }else{
        const query = 'SELECT ht.precio,ht.fecha,t."nombreTienda" as store_name, t."idTienda" as store_id '+
        'FROM "HISTORICOTIENDA" ht, "TIENDA" t '+
        'WHERE ht."fkJuegoHistorial"=$1 and t."idTienda"=ht."fkTiendaHistorial" and ht."fkConsola"=4 '+
        'order by fecha asc, store_name ';

    
        const {rows} = await client.query(query, values);
        let countrows: number = 0;
        for (const row of rows) {
            historyMap.set(countrows,{
                id: row.store_id,
                price: row.precio,
                dateHistory: row.fecha,
                storeName: row.store_name
            });
            countrows=countrows+1;
        }
    }

    


    client.release();
    return Array.from(historyMap.values());
}

export async function getInfoGamePs4DTO(juegoId: Number): Promise<GameInfo[]> {
    const client = await pool.connect();
    const infoMap = new Map<number, GameInfo>();
    const clasificacionLista: ClasificaGameDTO[] = [];
    const imageGameList: GameImages[]=[];
    const queryInfo = 'SELECT j."idJuego" as game_id, j.nombre, dj."fechaLanzamiento" as release_date, dj.edicion, c."nombre" as platform, '+
        'c."logoConsola" as logo, c."idConsola" as idconsola, j.descripcion, dj.portada, dj.contraportada '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj '+
        'WHERE j."idJuego"=$1 and j."idJuego"=dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and c."idConsola"=4 ';
    
    const queryGeneros = 'SELECT g."nombreGenero" as genre '+
        'FROM "GENERO" g, "LISTAGENERO" lg '+
        'WHERE g."idGenero"=lg."fkGeneroLista" and lg."fkJuegoLista"=$1 ';

    const queryClasificacion = 'SELECT cl."idClasificacion" as id_clasifica, cl.nombre, cl."urlImage" as url_image  FROM "CLASIFICACION" cl, "CLASIFICAJUEGO" cj '+
        'WHERE cl."idClasificacion"= cj."fkClasificacion" '+
        'and cj."fkJuego"=$1 ';    

    const values = [juegoId];    
    const result1 = await client.query(queryGeneros, values);
    let listaGeneros: string[]=[];
    for (const genres of result1.rows) {
        listaGeneros.push(genres.genre);
    }

    const resultClasi = await client.query(queryClasificacion, values);
    for (const clasi of resultClasi.rows){
        clasificacionLista.push({
            id: clasi.id_clasifica,
            clasification: clasi.nombre, 
            url: clasi.url_image
        })
    }

    const result2 = await client.query(queryInfo, values);
    for (const info of result2.rows) {
        imageGameList.push({title: "", url: info.portada});
        imageGameList.push({title: "", url: info.contraportada})

        infoMap.set(info.game_id, {
            title: info.nombre,
            genre: listaGeneros,
            platform: info.platform,
            platformid: info.idconsola,
            platformUrl: info.logo,
            releaseDate: info.release_date ? info.release_date.toLocaleDateString('en-GB'): "",
            clasificationList: clasificacionLista,
            description: info.descripcion,
            imagesGame: imageGameList
        })
    }
 
    client.release();
    return Array.from(infoMap.values());
}

export async function getBestOffertsPs4DTO(juegoId: Number): Promise<StoreDTO[]> {
    const client = await pool.connect();
    const query = 'SELECT t."idTienda" as store_id, t."logoTienda" as logo_store,j.nombre as title, t."nombreTienda" as store_name, '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, pt."enlaceTienda" as deal_url '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"=$1 and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and c."idConsola"=4 and pt.activo=1 and pt."fkConsola"=4 '+
        'order by sale_price asc limit 1';

    const values = [juegoId];
    const {rows} = await client.query(query, values);

    const gamesMap = new Map<number, StoreDTO>();
    for (const row of rows) {
        if (!gamesMap.has(row.store_id)) {
            gamesMap.set(row.store_id, {
                id: row.store_id,
                title: row.title,
                nombreStore: row.store_name,
                logoStore: row.logo_store,
                deals: [{
                    id: row.store_id,
                    originalPrice: Number.parseFloat(row.original_price),
                    salePrice: Number.parseFloat(row.sale_price),
                    discountPercentage: parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1)),
                    dealUrl: row.deal_url,
                    expiresAt: row.expires_at,
                }],
            })
        }
    }

    client.release();
    return Array.from(gamesMap.values());
}