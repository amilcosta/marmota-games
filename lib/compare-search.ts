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
  //deals: {
    //id: number
    storeName: string
    originalPrice: number
    salePrice: number
    discountPercentage: number
    dealUrl: string
    expiresAt: string | null
//
  isFavorite?: boolean
  history: {
    id: number
    price: number
    dateHistory: number
    storeName: string
  }[]
}

export async function getCompareGameDTO(juego: String): Promise<GameDealDTO[]>{

    //const products:GameDealDTO[] = [
    //{ id: 1, title: "iPhone 15", description: "test",genre:"Accion",platform:"", imageUrl:"",logoConsole:"",
     //   logoStore:"",storeName:"TodoJuegos", originalPrice: 9999,salePrice: 1111, discountPercentage: 10, dealUrl:"",expiresAt:""
     //   ,isFavorite: false},
    //{ id: 2, title: "iPhone 15", description: "test",genre:"Accion",platform:"", imageUrl:"",logoConsole:"",
    //    logoStore:"",storeName:"Kaio", originalPrice: 2999,salePrice: 2111, discountPercentage: 10, dealUrl:"",expiresAt:""
     //   ,isFavorite: false}
    //{ id: "2", name: "Galaxy S24", price: 899, brand: "Samsung", rating: 4.7 },
    //{ id: "3", name: "Pixel 8", price: 799, brand: "Google", rating: 4.6 }
    //];

    
    let values = [];
    values.push(`%${juego}%`);
    const query = 'SELECT j."idJuego" as id_juego, j.nombre, t."nombreTienda" as nombre_tienda,c.nombre as platform,c."logoConsola" as logo_consola, '+
        'pt.precio as sale_price, t."logoTienda" as logo_store, j.img_url as image_url, c."idConsola" as id_consola '+
        'FROM "JUEGO" j, "TIENDA" t, "CONSOLA" c, "PRECIOTIENDA" pt, "DETALLEJUEGO" dj '+
        'WHERE UPPER(j."nombre") like UPPER($1)  and j."idJuego"=dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt."fkConsola"=c."idConsola" and pt.activo=1 '+
        'order by pt.precio asc limit 8';

    let lista_products: GameDealDTO[]=[];
    //lista_products.push(products)

    const client = await pool.connect();
    const {rows} = await client.query(query, values);
    for (const row of rows) {
        const values2 = [row.id_juego,row.id_consola];
        const query2 = 'SELECT ht.precio,ht.fecha,t."nombreTienda" as store_name, t."idTienda" as store_id '+
        'FROM "HISTORICOTIENDA" ht, "TIENDA" t '+
        'WHERE ht."fkJuegoHistorial" = $1 and t."idTienda"=ht."fkTiendaHistorial" and ht."fkConsola"=$2 '+
        'order by fecha asc, store_name ';
        
        const {rows} = await client.query(query2, values2);
        let countrows: number = 0;
        let listHistoryByStore= [];
        for (const row of rows) {
            let history = {
                id: row.store_id,
                price: row.precio,
                dateHistory: row.fecha,
                storeName: row.store_name
            }
            listHistoryByStore.push(history);
        }

        let game: GameDealDTO = {
            id: row.id_juego,
            title: row.nombre,
            description: row.description,
            genre: row.genre,
            platform: row.platform,
            imageUrl: row.image_url,
            logoConsole: row.logo_consola,
            logoStore: row.logo_store,
            storeName: row.nombre_tienda,
            originalPrice: row.original_price,
            salePrice: Number.parseFloat(row.sale_price),
            discountPercentage: row.discount_percentage,
            dealUrl: "",
            isFavorite: false,
            expiresAt:"",
            history: listHistoryByStore
        };

        lista_products.push(game)
        

    }

    client.release();

    return lista_products;
}

