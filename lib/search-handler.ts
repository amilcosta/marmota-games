import "server-only";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export interface GameDealDTO {
  id: number,
  title: string
  description: string
  genre: string[]
  platform: string
  platformid: number
  imageUrl: string
  logoConsole: string
  logoStore: string
  releaseDate: string
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

export interface TiendaDTO {
  id: number,
  nombre: string,
}

export interface PlaformDTO {
  id: number,
  nombre: string,
}

export async function getGamesDTO(juegoName: string, prices: string[], tienda: number, page: number, platform: number): Promise<GameDealDTO[]> {


  //const values = [`%${juegoName}%`];
  let values = [];
  let query: string = '';
  let offset: number = (page-1)*12
  values.push(`%${juegoName}%`);
  if(prices.length>0){
    values.push(parseInt(prices[0]));
    values.push(parseInt(prices[1]));
    if(tienda>0){
      values.push(tienda);  
      if(platform>0){
        values.push(platform)
        values.push(12*offset);
        values.push(12);
        query =  'select j.*, dj."fkConsolaDetalle" as idconsola ,dj."edicion",dj."fechaLanzamiento" as release_date, c."nombre" as platform,c."logoConsola", '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, t."nombreTienda" as store_name, t."idTienda" as store_id, t."logoTienda" as logo_store, '+
        'j.img_url as image_url '+
        'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
        'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt.precio>=$2 and pt.precio<=$3 and t."idTienda"=$4 and c."idConsola"=$5 '+
        'and pt."fkConsola"=c."idConsola" and pt.activo=1 order by pt.precio asc offset $6 rows fetch next $7 rows only';
      }else{
        values.push(12*offset);
        values.push(12);
        query =  'select j.*, dj."fkConsolaDetalle" as idconsola ,dj."edicion",dj."fechaLanzamiento" as release_date, c."nombre" as platform,c."logoConsola", '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, t."nombreTienda" as store_name, t."idTienda" as store_id, t."logoTienda" as logo_store, '+
        'j.img_url as image_url '+
        'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
        'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" and pt.activo=1 '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt.precio>=$2 and pt.precio<=$3 and t."idTienda"=$4 and pt."fkConsola"=c."idConsola" order by pt.precio asc offset $5 rows fetch next $6 rows only';
      }
    }else if(platform>0){
        values.push(platform)
        values.push(12*offset);
        values.push(12);
        query =  'select j.*, dj."fkConsolaDetalle" as idconsola ,dj."edicion",dj."fechaLanzamiento" as release_date, c."nombre" as platform,c."logoConsola", '+
      'pt.precio as sale_price, pt."precioViejo" as original_price, t."nombreTienda" as store_name, t."idTienda" as store_id, t."logoTienda" as logo_store, '+
      'j.img_url as image_url '+
      'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
      'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
      'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt.precio>=$2 and pt.precio<=$3 and c."idConsola"=$4 '+
      'and pt."fkConsola"=c."idConsola" and pt.activo=1 order by pt.precio asc offset $5 rows fetch next $6 rows only';
    }else{
      values.push(12*offset);
      values.push(12);
      query =  'select j.*, dj."fkConsolaDetalle" as idconsola ,dj."edicion",dj."fechaLanzamiento" as release_date, c."nombre" as platform,c."logoConsola", '+
      'pt.precio as sale_price, pt."precioViejo" as original_price, t."nombreTienda" as store_name, t."idTienda" as store_id, t."logoTienda" as logo_store, '+
      'j.img_url as image_url '+
      'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
      'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
      'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt.activo=1 and pt.precio>=$2 and pt.precio<=$3 and pt."fkConsola"=c."idConsola" order by pt.precio asc offset $4 rows fetch next $5 rows only';
    }
  }else{
    if(tienda>0){
      values.push(tienda);
      if(platform>0){
        values.push(platform)
        values.push(12*offset);
        values.push(12);
        query =  'select j.*, dj."fkConsolaDetalle" as idconsola ,dj."edicion",dj."fechaLanzamiento" as release_date, c."nombre" as platform,c."logoConsola", '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, t."nombreTienda" as store_name, t."idTienda" as store_id, t."logoTienda" as logo_store, '+
        'j.img_url as image_url '+
        'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
        'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and t."idTienda"=$2 and c."idConsola"=$3 '+
        'and pt."fkConsola"=c."idConsola" and pt.activo=1 order by pt.precio asc offset $4 rows fetch next $5 rows only';
      }else{
        values.push(12*offset);
        values.push(12);
        query =  'select j.*, dj."fkConsolaDetalle" as idconsola ,dj."edicion",dj."fechaLanzamiento" as release_date, c."nombre" as platform,c."logoConsola", '+
        'pt.precio as sale_price, pt."precioViejo" as original_price, t."nombreTienda" as store_name, t."idTienda" as store_id, t."logoTienda" as logo_store, '+
        'j.img_url as image_url '+
        'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
        'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" and pt.activo=1 '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and t."idTienda"=$2 and pt."fkConsola"=c."idConsola" order by pt.precio asc offset $3 rows fetch next $4 rows only';
      }
    }else if(platform>0){
      values.push(platform)
      values.push(12*offset);
      values.push(12);
      query =  'select j.*, dj."fkConsolaDetalle" as idconsola ,dj."edicion",dj."fechaLanzamiento" as release_date, c."nombre" as platform,c."logoConsola", '+
      'pt.precio as sale_price, pt."precioViejo" as original_price, t."nombreTienda" as store_name, t."idTienda" as store_id, t."logoTienda" as logo_store, '+
      'j.img_url as image_url '+
      'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
      'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" and c."idConsola"=$2 '+
      'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt."fkConsola"=c."idConsola" and pt.activo=1 order by pt.precio asc offset $3 rows fetch next $4 rows only';
    }else{
      values.push(12*offset);
      values.push(12);
      query =  'select j.*, dj."fkConsolaDetalle" as idconsola ,dj."edicion",dj."fechaLanzamiento" as release_date, c."nombre" as platform,c."logoConsola", '+
      'pt.precio as sale_price, pt."precioViejo" as original_price, t."nombreTienda" as store_name, t."idTienda" as store_id, t."logoTienda" as logo_store, '+
      'j.img_url as image_url '+
      'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
      'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
      'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt."fkConsola"=c."idConsola" and pt.activo=1 order by pt.precio asc offset $2 rows fetch next $3 rows only';
    }
  }
  
  const client = await pool.connect();

  const gamesMap = new Map<string, GameDealDTO>();
  const {rows} = await client.query(query, values);

  for (const row of rows) {
      const valueId = [row.idJuego];
      const queryGeneros = 'SELECT g."nombreGenero" as genre '+
        'FROM "GENERO" g, "LISTAGENERO" lg '+
        'WHERE g."idGenero"=lg."fkGeneroLista" and lg."fkJuegoLista"=$1 ';
      const result1 = await client.query(queryGeneros, valueId);
      let listaGeneros: string[]=[];
      for (const genres of result1.rows) {
        listaGeneros.push(genres.genre);
      }

      let discount = parseFloat((100-(row.sale_price*100)/row.original_price).toFixed(1));
      if(discount<0){
          discount = 0;
      }

      gamesMap.set(row.idJuego+'_'+row.store_id+'_'+row.idconsola , {
          id: row.idJuego,
          title: row.nombre,
          description: row.description,
          genre: listaGeneros,
          platform: row.platform,
          platformid: row.idconsola,
          imageUrl: row.image_url,
          releaseDate: row.release_date ? row.release_date.toLocaleDateString('en-GB'): "",
          deals: [
            {
            id: row.game_id,
            storeName: row.store_name,
            originalPrice: Number.parseFloat(row.original_price),
            salePrice: Number.parseFloat(row.sale_price),
            discountPercentage: discount,//(100-(row.sale_price*100)/row.original_price),
            dealUrl: row.deal_url,
            expiresAt: row.expires_at
            }
          ],
          logoConsole: row.logo_console,
          logoStore: row.logo_store,
      })      
    }
    client.release();
    //pool.end();
    
    return Array.from(gamesMap.values())
}

export async function getTiendas(){
  const client = await pool.connect();
  const { rows } = await client.query('SELECT "idTienda" as id_tienda, "nombreTienda" as tienda FROM "TIENDA" where activo=1 order by id_tienda ');

  const tiendasMap = new Map<string, TiendaDTO>()
  
  for (const row of rows) {
    tiendasMap.set(row.id_tienda, {
        id: row.id_tienda,
        nombre: row.tienda,
    })
  }

  client.release();
   
  return Array.from(tiendasMap.values());
}

export async function getTotalFiltro(juegoName: string, prices: string[], tienda: number, page: number, platform:number) {
  let values = [];
  let query: string = '';
  let offset: number = (page-1)*12
  values.push(`%${juegoName}%`);
  if(prices.length>0){
    values.push(parseInt(prices[0]));
    values.push(parseInt(prices[1]));
    if(tienda>0){
      values.push(tienda);
      if(platform>0){
        values.push(platform)
        query =  'select count(j."idJuego") as cantidad '+
        'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
        'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt.precio>=$2 and pt.precio<=$3 and t."idTienda"=$4 '+
        'and c."idConsola"=$5 and pt."fkConsola"=c."idConsola" and pt.activo=1 ';
      }else{
        query =  'select count(j."idJuego") as cantidad '+
        'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
        'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt.precio>=$2 and pt.precio<=$3 and t."idTienda"=$4 '+
        'and pt."fkConsola"=c."idConsola" and pt.activo=1 ';
      }
    }else if(platform>0){
       values.push(platform)
       query =  'select count(j."idJuego") as cantidad '+
      'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
      'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
      'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt.precio>=$2 and pt.precio<=$3 '+
      'and c."idConsola"=$4 and pt."fkConsola"=c."idConsola" and pt.activo=1 ';
    }else{
      query =  'select count(j."idJuego") as cantidad  '+
      'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
      'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
      'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt.precio>=$2 and pt.precio<=$3 '+
      'and pt."fkConsola"=c."idConsola" and pt.activo=1 ';
    }
  }else{
    if(tienda>0){
      values.push(tienda);
      if(platform>0){
        values.push(platform)
        query =  'select count(j."idJuego") as cantidad '+
        'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
        'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and t."idTienda"=$2 '+
        'and c."idConsola"=$3 and pt."fkConsola"=c."idConsola" and pt.activo=1 ';
      }else{
        query =  'select count(j."idJuego") as cantidad '+
        'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
        'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
        'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and t."idTienda"=$2 and pt."fkConsola"=c."idConsola" and pt.activo=1 ';
      }
    }else if(platform>0){
      values.push(platform)
      query =  'select count(j."idJuego") as cantidad  '+
      'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
      'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
      'and c."idConsola"=$2 and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt."fkConsola"=c."idConsola" and pt.activo=1 ';
    }else{
      query =  'select count(j."idJuego") as cantidad  '+
      'from "JUEGO" j, "DETALLEJUEGO" dj, "CONSOLA" c, "PRECIOTIENDA" pt, "TIENDA" t '+
      'where UPPER(j."nombre") like UPPER($1) and  dj."fkJuegoDetalle"=j."idJuego" and dj."fkConsolaDetalle"=c."idConsola" '+
      'and pt."fkJuego"=j."idJuego" and pt."fkTienda"=t."idTienda" and pt."fkConsola"=c."idConsola" and pt.activo=1 ';
    }
  }

  const client = await pool.connect();
  const {rows} = await client.query(query, values);

  let totalRows: number=0;
  for (const row of rows) {
    totalRows = row.cantidad;
  }

  client.release();

  return totalRows;
}


export async function getPlatforms(){
  const client = await pool.connect();
  const { rows } = await client.query('SELECT "idConsola" as id_platform, nombre as platform FROM "CONSOLA" order by id_platform ');

  const tiendasMap = new Map<string, PlaformDTO>()
  
  for (const row of rows) {
    let consola='';
    switch (row.platform){
      case 'switch1':
        consola='Nintendo Switch 1';
        break;
      case 'switch2':
        consola='Nintendo Switch 2';
        break;
      case 'ps4':
        consola= 'PlayStation 4';
        break;
      case 'ps5':
        consola = 'PlayStation 5';
        break;    
    }
    tiendasMap.set(row.id_platform, {
        id: row.id_platform,
        nombre: consola,
    })
  }

  client.release();
   
  return Array.from(tiendasMap.values());
}