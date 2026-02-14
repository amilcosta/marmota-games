import "server-only"
import { neon } from "@neondatabase/serverless"
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

export async function getGameDealsDTO(): Promise<GameDealDTO[]> {
  //const currentUser = await getCurrentUser();
  const currentUser ="";

  // Get all active deals with game information
  /*const dealsData = await sql`
    SELECT 
      g.id as game_id,
      g.title,
      g.description,
      g.genre,
      g.platform,
      g.image_url,
      d.id as deal_id,
      d.store_name,
      d.original_price,
      d.sale_price,
      d.discount_percentage,
      d.deal_url,
      d.expires_at,
      CASE WHEN uf.id IS NOT NULL THEN true ELSE false END as is_favorite
    FROM games g
    JOIN deals d ON g.id = d.game_id
    LEFT JOIN user_favorites uf ON g.id = uf.game_id AND uf.user_id = ${currentUser?.id || 0}
    WHERE d.is_active = true 
    AND (d.expires_at IS NULL OR d.expires_at > NOW())
    ORDER BY d.discount_percentage DESC, g.title
  `*/
  //const dealsData = await sql`
  //    SELECT idJuego 
  //    FROM juego 
  // `
  
  const client = await pool.connect();
  const { rows } = await client.query('SELECT j."idJuego" as game_id,j.nombrereal as title, c.nombre as platform, j."idJuego" as deal_id, j.nombre, '+
    'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, '+
    'pt."enlaceTienda" as deal_url, c."logoConsola" as logo_console '+
    'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
    'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
    'and pt.activo=1 and pt."fkConsola"=c."idConsola" limit 5'
  );
  

  //const dealsData = await sql `SELECT version()`;

  // Group deals by game
  const gamesMap = new Map<number, GameDealDTO>()

  for (const row of rows) {
    if (!gamesMap.has(row.game_id)) {
      let discount = parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1));
      if(discount<0){
          discount = 0;
      }

      let platform_name= row.platform=="switch1" ? "Nintendo Switch 1" : row.platform=="switch2" ? "Nintendo Switch 2" : 
      row.platform=="ps4" ? "PlayStation 4" : "PlayStation 5";

      gamesMap.set(row.game_id, {
        id: row.game_id,
        title: row.title ? row.title : row.nombre,
        description: row.description,
        genre: row.genre,
        platform: row.platform,
        platformName: platform_name,
        imageUrl: row.image_url,
        deals: [],
        isFavorite: currentUser ? row.is_favorite : undefined,
        logoConsole: row.logo_console,
        logoStore: row.logo_store,
      })
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

    
  }
  client.release();
  //pool.end();
  
  return Array.from(gamesMap.values())
}

export async function toggleFavoriteDTO(gameId: number): Promise<boolean> {
  //const currentUser = await getCurrentUser()

  //if (!currentUser) {
  //  throw new Error("Authentication required")
 // }

  /*const [existing] = await sql`
    SELECT id FROM user_favorites 
    WHERE user_id = ${currentUser.id} AND game_id = ${gameId}
  `

  if (existing) {
    await sql`
      DELETE FROM user_favorites 
      WHERE user_id = ${currentUser.id} AND game_id = ${gameId}
    `
    return false
  } else {
    await sql`
      INSERT INTO user_favorites (user_id, game_id)
      VALUES (${currentUser.id}, ${gameId})
    `
    return true
  }*/
 return true;
}

/*export async function getUserFavoritesDTO(): Promise<GameDealDTO[]> {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return []
  }

  const favoritesData = await sql`
    SELECT 
      g.id as game_id,
      g.title,
      g.description,
      g.genre,
      g.platform,
      g.image_url,
      d.id as deal_id,
      d.store_name,
      d.original_price,
      d.sale_price,
      d.discount_percentage,
      d.deal_url,
      d.expires_at
    FROM games g
    JOIN user_favorites uf ON g.id = uf.game_id
    JOIN deals d ON g.id = d.game_id
    WHERE uf.user_id = ${currentUser.id}
    AND d.is_active = true 
    AND (d.expires_at IS NULL OR d.expires_at > NOW())
    ORDER BY uf.created_at DESC, d.discount_percentage DESC
  `

  const gamesMap = new Map<number, GameDealDTO>()

  for (const row of favoritesData) {
    if (!gamesMap.has(row.game_id)) {
      gamesMap.set(row.game_id, {
        id: row.game_id,
        title: row.title,
        description: row.description,
        genre: row.genre,
        platform: row.platform,
        imageUrl: row.image_url,
        deals: [],
        isFavorite: true,
      })
    }

    const game = gamesMap.get(row.game_id)!
    game.deals.push({
      id: row.deal_id,
      storeName: row.store_name,
      originalPrice: Number.parseFloat(row.original_price),
      salePrice: Number.parseFloat(row.sale_price),
      discountPercentage: row.discount_percentage,
      dealUrl: row.deal_url,
      expiresAt: row.expires_at,
    })
  }

  return Array.from(gamesMap.values())
}*/

export async function getNewDealsDTO(): Promise<GameDealDTO[]> {
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id,j.nombrereal as title, c.nombre as platform, j."idJuego" as deal_id, j.nombre, '+
        'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, '+
        'c."logoConsola" as logo_console, t."logoTienda" as logo_store, t."idTienda" as store_id, c."idConsola" as id_consola '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and pt.precio<=pt."precioViejo" and pt.activo=1 and pt."fkConsola"=c."idConsola" order by pt.fecha desc, precio asc limit 10');
    const gamesMap = new Map<string, GameDealDTO>();
    for (const row of rows) {
      let discount = parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1));
      let platform_name= row.platform=="switch1" ? "Nintendo Switch 1" : row.platform=="switch2" ? "Nintendo Switch 2" : 
        row.platform=="ps4" ? "PlayStation 4" : "PlayStation 5";
      if(discount<0){
            discount = 0;
        }
        //if (!gamesMap.has(row.game_id)) {
        gamesMap.set(row.game_id+'_'+row.store_id+"_"+row.id_consola, {
            id: row.game_id,
            title: row.title ? row.title : row.nombre,
            description: row.description,
            genre: row.genre,
            platform: row.platform,
            platformName: platform_name,
            imageUrl: row.image_url,
            deals: [
              {
              id: row.deal_id,
              storeName: row.store_name,
              originalPrice: Number.parseFloat(row.original_price),
              salePrice: Number.parseFloat(row.sale_price),
              discountPercentage: discount,//parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1)),
              dealUrl: row.deal_url,
              expiresAt: row.expires_at
              }
            ],
            logoConsole: row.logo_console,
            logoStore: row.logo_store,
        })
        
    }

    client.release();
   
    return Array.from(gamesMap.values());
}

export async function getBestDealsDTO(): Promise<GameDealDTO[]> {
    const client = await pool.connect();
    const {rows}  = await client.query('SELECT j."idJuego" as game_id,j.nombrereal as title, c.nombre as platform, j."idJuego" as deal_id, j.nombre,'+
        'j.img_url as image_url, t."nombreTienda" as store_name, pt.precio as sale_price, pt."precioViejo" as original_price, '+
        'c."logoConsola" as logo_console, t."logoTienda" as logo_store, t."idTienda" as store_id, c."idConsola" as id_consola '+
        'FROM "JUEGO" j, "CONSOLA" c, "DETALLEJUEGO" dj, "TIENDA" t, "PRECIOTIENDA" pt '+
        'WHERE j."idJuego"= dj."fkJuegoDetalle" and dj."fkConsolaDetalle"=c."idConsola" and j."idJuego"=pt."fkJuego" and pt."fkTienda"=t."idTienda" '+
        'and pt.precio<=pt."precioViejo" and pt.activo=1 and pt."fkConsola"=c."idConsola" order by sale_price asc limit 10');
    const gamesMap = new Map<string, GameDealDTO>();
    for (const row of rows) {
      let discount = parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1));
      if(discount<0){
            discount = 0;
        }
      let platform_name= row.platform=="switch1" ? "Nintendo Switch 1" : row.platform=="switch2" ? "Nintendo Switch 2" : 
        row.platform=="ps4" ? "PlayStation 4" : "PlayStation 5";
        //if (!gamesMap.has(row.game_id)) {
            gamesMap.set(row.game_id+'_'+row.store_id+"_"+row.id_consola, {
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
                  discountPercentage: discount,//parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1)),
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
