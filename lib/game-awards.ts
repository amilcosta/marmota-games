import "server-only";
import { Pool } from 'pg';
import { platform } from "os";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export interface GameAwardDTO {
  id: number,
  title: string
  description: string
  platform: string
  imageUrl: string
  platformId: number
  winner: number
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
    imageUrl: string
}

export interface ClasificaGameDTO {
    id: number,
    clasification: string,
    url: string
}

export interface GameStores{
    title: string,
    platform: string,
    platformUrl: string,
    price: number,
    originalPrice: number,
    store: string,
    logoStore: string,
    dealUrl: string,
    discountPercentage: number,
    color: string
}

export async function getGameYear25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1260,1261,1262,1263,48,1264) order by title');
    /*const mockResponse = {
        rows: [{ game_id: 1,title: 'Clair Obscur: Expedition 33',description: '', platform:'PS5',image_url:'' }, 
            { game_id: 2,title: 'Death Stranding 2: On The Beach',description: '', platform:'PS5',image_url:'' },
            { game_id: 3,title: 'Donkey Kong Bananza',description: '', platform:'Switch 2',image_url:'' },
            { game_id: 4,title: 'Hades 2',description: '', platform:'PS5',image_url:'' },
            { game_id: 5,title: 'Hollow Knight: Silksong',description: '', platform:'PS5',image_url:'' },
            { game_id: 6,title: 'Kingdom Come: Deliverance II',description: '', platform:'PS5',image_url:'' }
        ],
        rowCount: 6,
    };
    const rows = mockResponse.rows;*/

    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Clair Obscur Expedition 33' ? 1 : 0
        });
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameNarrative25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1260,1261,1264)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Clair Obscur Expedition 33' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameArtDirection25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1260,1261,1263,48)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Clair Obscur Expedition 33' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameScoreMusic25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1260,1261,1263,48) order by game_id');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Clair Obscur Expedition 33' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameMusicDesign25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1260,1261,1265)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Battlefield 6' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameAction25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1265,1263)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Hades II' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGamesActionAdventure25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1261,48,1266) order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Hollow Knight: Silksong' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameFighting25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (13,230,78)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Fatal Fury: City Of The Wolves Special Edition' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameFamily25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1262,1267,117)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Donkey Kong Bananza' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameSports25(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (223,1267,117)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Mario Kart World' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameYear24(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (425,1268,232)  order by title');

    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Astro Bot' ? 1 : 0
        });
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameNarrative24(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (232,1269,1270)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Metaphor: Refantazio' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameArtDirection24(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (1268,1270,159)  order by title');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Metaphor: Refantazio' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}

export async function getGameScoreMusic24(): Promise<GameAwardDTO[]>{
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id, j.nombre as title, j.descripcion as description, '+
        'j.img_url as image_url, j."pkJuegoMatch" as juego_match, c.nombre as platform, c."idConsola" as platform_id '+
        'FROM "JUEGO" j '+
        'INNER JOIN "DETALLEJUEGO" dj on j."idJuego"=dj."fkJuegoDetalle" '+
        'INNER JOIN "CONSOLA" c on dj."fkConsolaDetalle"=c."idConsola" '+
        'WHERE j."idJuego" in (232,1269,1270,1271) order by game_id');
    const gamesMap = new Map<string, GameAwardDTO>();
    for (const row of rows) {
        gamesMap.set(row.game_id.toString(), {
            id: row.game_id,
            title: row.title,
            description: row.description,
            platform: row.platform,
            imageUrl: row.image_url,
            platformId: row.platform_id,
            winner: row.title=='Final Fantasy VII: Remake' ? 1 : 0
        })
    }

    client.release();
    return Array.from(gamesMap.values());
}




export async function getGamesMatch(juegoId: Number): Promise<GameInfo[]> {
    const client = await pool.connect();
    const gamesMap = new Map<string, GameInfo>();
    const clasificacionLista: ClasificaGameDTO[] = [];

    const queryInfo = 'SELECT j."idJuego" as game_id, j.nombre, dj."fechaLanzamiento" as release_date, dj.edicion, c."nombre" as platform, '+
        'c."logoConsola" as logo, c."idConsola" as idconsola, j.descripcion, dj.portada, dj.contraportada, j.img_url as image_url '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj '+
        'WHERE j."idJuego"=$1 and j."idJuego"=dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" ';
    
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
        gamesMap.set(info.game_id, {
            title: info.nombre,
            genre: listaGeneros,
            platform: info.platform,
            platformid: info.idconsola,
            platformUrl: info.logo,
            releaseDate: info.release_date ? info.release_date.toLocaleDateString('en-GB'): "",
            clasificationList: clasificacionLista,
            description: info.descripcion,
            imageUrl: info.image_url
        })
    }
        
    client.release();
    return Array.from(gamesMap.values());
}

export async function getGamesTienda(juegoId: Number): Promise<GameStores[]> {
    const client = await pool.connect();
    const values = [juegoId];
    const gamesMap = new Map<number, GameStores>();

    const query1 = 'SELECT j.nombrereal as match FROM "JUEGO" j WHERE j."idJuego"=$1 ';
    const getmatch = await client.query(query1, values);

    if(getmatch.rows.length>0){
        for(const row of getmatch.rows){
            const values2 = [row.match];
            const query = 'SELECT j.nombre,t."nombreTienda" as store_name, t."idTienda" as store_id,pt.precio, pt."precioViejo" as original_price, '+
            'pt."fkConsola" as id_consola, j."img_url" as image_url, t."logoTienda" as logo_store, pt."enlaceTienda" as deal_url, '+
            'c."nombre" as platform, c."logoConsola" as logo '+
            'FROM "JUEGO" j '+
            'INNER JOIN "PRECIOTIENDA" pt on pt."fkJuego"=j."idJuego" and activo=1 '+
            'INNER JOIN "TIENDA" t on t."idTienda"=pt."fkTienda" '+
            'INNER JOIN "CONSOLA" c on c."idConsola"=pt."fkConsola" ' +
            'WHERE j.nombrereal=$1 '+
            'order by id_consola, precio';
            
            const {rows} = await client.query(query, values2);
            let countrows: number = 0;
            for (const row of rows) {
                let discount = parseFloat((100-(row.precio*100)/row.original_price).toFixed(1));
                if(discount<0){
                    discount = 0;
                }
                let platform_name= row.platform=="switch1" ? "Nintendo Switch 1" : row.platform=="switch2" ? "Nintendo Switch 2" : 
                row.platform=="ps4" ? "PlayStation 4" : "PlayStation 5";
                let fontcolor= row.platform=="switch1" ? "red" : row.platform=="switch2" ? "red" : row.platform=="ps4" ? "blue" : "gray";

                gamesMap.set(countrows,{
                    title: row.nombre,
                    platform: platform_name,
                    platformUrl: row.logo,
                    price: row.precio,
                    originalPrice: row.original_price,
                    store: row.store_name,
                    logoStore: row.logo_store,
                    dealUrl: row.deal_url,
                    discountPercentage: discount,
                    color: fontcolor
                });
                 countrows=countrows+1;
            }
        }
    }

    client.release();
    return Array.from(gamesMap.values());
}