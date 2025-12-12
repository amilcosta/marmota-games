import "server-only"
import { getCurrentUser } from "./auth"
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
  title: string,
  nombreStore: string,
  logoStore: string,
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

export async function getSwitchTwoDTO(): Promise<GameDealDTO[]> {

    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id,j.nombre as title, c.nombre as platform, j."idJuego" as deal_id, '+
        'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, pt."enlaceTienda" as deal_url '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and c."idConsola"=2 and pt.activo=1 limit 5');
    const gamesMap = new Map<number, GameDealDTO>();

    for (const row of rows) {
        if (!gamesMap.has(row.game_id)) {
            gamesMap.set(row.game_id, {
                id: row.game_id,
                title: row.title,
                description: row.description,
                genre: row.genre,
                platform: row.platform,
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
            discountPercentage: (100-(row.sale_price*100)/row.original_price),
            dealUrl: row.deal_url,
            expiresAt: row.expires_at,
        })
    }

    client.release();
    pool.end;
    return Array.from(gamesMap.values());
}

export async function getNewSwitchTwoDTO(): Promise<GameDealDTO[]> {
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id,j.nombre as title, c.nombre as platform, j."idJuego" as deal_id, '+
        'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, '+
        'c."logoConsola" as logo_console, t."logoTienda" as logo_store, t."idTienda" as store_id '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and c."idConsola"=2 and pt.precio<=pt."precioViejo" and pt.activo=1 '+ 
        'order by pt.fecha desc, precio asc limit 10');
    const gamesMap = new Map<string, GameDealDTO>();
    for (const row of rows) {
        
        gamesMap.set(row.game_id+'_'+row.store_id, {
            id: row.game_id,
            title: row.title,
            description: row.description,
            genre: row.genre,
            platform: row.platform,
            imageUrl: row.image_url,
            deals: [{
                id: row.deal_id,
                storeName: row.store_name,
                originalPrice: Number.parseFloat(row.original_price),
                salePrice: Number.parseFloat(row.sale_price),
                discountPercentage: (100-(row.sale_price*100)/row.original_price),
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

export async function getBestSwitchTwoDTO(): Promise<GameDealDTO[]> {
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id,j.nombre as title, c.nombre as platform, j."idJuego" as deal_id, '+
        'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, '+
        'c."logoConsola" as logo_console, t."logoTienda" as logo_store, t."idTienda" as store_id '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and c."idConsola"=2 and pt.activo=1 '+ 
        'order by sale_price asc limit 10');
    const gamesMap = new Map<string, GameDealDTO>();
    for (const row of rows) {
        
            gamesMap.set(row.game_id+'_'+row.store_id, {
                id: row.game_id,
                title: row.title,
                description: row.description,
                genre: row.genre,
                platform: row.platform,
                imageUrl: row.image_url,
                deals: [{
                    id: row.deal_id,
                    storeName: row.store_name,
                    originalPrice: Number.parseFloat(row.original_price),
                    salePrice: Number.parseFloat(row.sale_price),
                    discountPercentage: (100-(row.sale_price*100)/row.original_price),
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

export async function getOffertsDTO(juegoId: Number): Promise<StoreDTO[]> {
    const client = await pool.connect();
    const query = 'SELECT t."idTienda" as store_id, t."logoTienda" as logo_store,j.nombre as title, t."nombreTienda" as store_name, '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, pt."enlaceTienda" as deal_url '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"=$1 and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and c."idConsola"=2 '+
        'order by sale_price asc';

    const values = [juegoId];
    const {rows} = await client.query(query, values);

    const gamesMap = new Map<number, StoreDTO>();
    for (const row of rows) {
        let discount = parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1));
        if(discount<0){
            discount = discount*-1;
        }

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
                    discountPercentage: discount,
                    dealUrl: row.deal_url,
                    expiresAt: row.expires_at,
                }],
            })
        }
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getInfoGameStoreDTO(juegoId: Number): Promise<HistoryStore[]> {
    const client = await pool.connect();
    const historyMap = new Map<number, HistoryStore>();
    const query = 'SELECT ht.precio,ht.fecha,t."nombreTienda" as store_name, t."idTienda" as store_id '+
        'FROM "HISTORICOTIENDA" ht, "TIENDA" t '+
        'WHERE ht."fkJuegoHistorial"=$1 and t."idTienda"=ht."fkTiendaHistorial" '+
        'order by fecha asc, store_name ';

    const values = [juegoId];
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


    client.release();
    return Array.from(historyMap.values());
}

export async function getInfoGameDTO(juegoId: Number): Promise<GameInfo[]> {
    const client = await pool.connect();
    const infoMap = new Map<number, GameInfo>();
    const clasificacionLista: ClasificaGameDTO[] = [];
    const imageGameList: GameImages[]=[];
    const queryInfo = 'SELECT j."idJuego" as game_id, j.nombre, dj."fechaLanzamiento" as release_date, dj.edicion, c."nombre" as platform, '+
        'c."logoConsola" as logo, c."idConsola" as idconsola, j.descripcion, dj.portada, dj.contraportada '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj '+
        'WHERE j."idJuego"=$1 and j."idJuego"=dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and c."idConsola"=2 ';
    
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
            releaseDate: info.release_date.toLocaleDateString('en-GB'),
            clasificationList: clasificacionLista,
            description: info.descripcion,
            imagesGame: imageGameList
        })
    }
 
    client.release();
    return Array.from(infoMap.values());
}

export async function getBestOffertsDTO(juegoId: Number): Promise<StoreDTO[]> {
    const client = await pool.connect();
    const query = 'SELECT t."idTienda" as store_id, t."logoTienda" as logo_store,j.nombre as title, t."nombreTienda" as store_name, '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, pt."enlaceTienda" as deal_url '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"=$1 and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and c."idConsola"=2 '+
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
