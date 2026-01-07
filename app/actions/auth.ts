"use server"

import {  signUp, signOut } from "@/lib/auth"
import { redirect, RedirectType } from "next/navigation";

export interface RespuestaDTO {
  message: String,
  code: Number
}

export async function signInAction(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    //await signIn(email, password)
    //redirect("/")
  } catch (error) {
    return { error: "Invalid credentials" }
  }
}

export async function signUpActionOld(formData):Promise<RespuestaDTO> {
    const data = Object.fromEntries(formData);
    //const email = formData.get("email") as string;
    const email = data.email;
    //const password = formData.get("password") as string

    //if (password.length < 6) {
    //  return { error: "Password must be at least 6 characters" }
    //}

    //const resul = await signUp(email);

    
    //const respuesta: RespuestaDTO = {message: resul?.message ? resul.message : '', code: resul?.code ? resul.code : 200 };

    //redirect("/")

    const respuesta: RespuestaDTO = {message: 'Invalid', code: 400};
    return respuesta;
  
}

export async function signUpAction( prevState: { url: string },formData: FormData) {
 
  const email = formData.get("email") as string

  const resul = await signUp(email);

  return resul;//{message: 'Invalid', code: 400};

}

export async function signOutAction() {
  await signOut()
  redirect("/auth/signin")
}
