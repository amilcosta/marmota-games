//import { cache } from "react"
//import { cookies } from "next/headers"
//import bcrypt from "bcryptjs"
import { Pool } from 'pg';
import axios from 'axios';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export interface User {
  id: number
  email: string
  role: string
}

/*export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const [user] = await sql`
      SELECT id, email, role 
      FROM users 
      WHERE id = ${decoded.userId}
    `

    return user ? { id: user.id, email: user.email, role: user.role } : null
  } catch (error) {
    return null
  }
})

export async function signIn(email: string, password: string) {
  const [user] = await sql`
    SELECT id, email, password_hash, role 
    FROM users 
    WHERE email = ${email}
  `

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("Invalid credentials")
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" })

  const cookieStore = await cookies()
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })

  return { id: user.id, email: user.email, role: user.role }
}
*/
export async function signUp(email: string, cel: string) {//password: string
  //const hashedPassword = await bcrypt.hash(password, 12);

  const client = await pool.connect();

  const queryUser = 'SELECT "idUsuario" FROM "USUARIO" WHERE correo = $1';
  const values = [email];
  
  const result = await client.query(queryUser, values);
  if (result.rows.length>0) {
    client.release();
    //throw new Error("Usuario ya existe registrado")
    return  { message: "El correo ya se encuentra registrado", code: 400 };
  }
  
  //const toknumber= process.env.TOKEN_NUMBER;
  const nuevouser = 'INSERT INTO "USUARIO" (correo, "fechaCreacion") values ($1, CURRENT_DATE) RETURNING "idUsuario"';
  const valuesuser = [email];

  const result1 = await client.query(nuevouser, valuesuser);

  //return await signIn(email, password)
  client.release();

  /*const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: 'test.email@gm.com',
    to: 'dk.yoshi.gamer@gmail.com',
    subject: 'Hello World',
    html: '<strong>it works!</strong>'
  });

  if (error) {
    return console.log(error);
  }*/

  const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_PRIVATE_GROUP_ID;
  const message = "El usuario "+email+" ha pedido solicitud de ser premium";
  const url = `https://api.telegram.org${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=markdown`;

  try {
      const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
      });
      if(response.data.ok){
        return { message: "Se ha registrado el correo exitosamente", code: 200 };
      }
  }catch (error) {
    return { message: "Error Envio mensaje", code: 400 };
  }

  //return { message: "Se ha registrado el correo exitosamente", code: 200 };
}

/*export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
}*/
