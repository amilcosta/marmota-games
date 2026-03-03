"use server"

import {  signUp} from "@/lib/auth";
//import { FormState } from "react-hook-form";
//import { redirect, RedirectType } from "next/navigation";

export interface RespuestaDTO {
  message: String,
  code: Number
}

/*export async function signInAction(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    //await signIn(email, password)
    //redirect("/")
  } catch (error) {
    return { error: "Invalid credentials" }
  }
}

export async function signUpActionOld(formData:any):Promise<RespuestaDTO> {
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
  
}*/

type FormState = {
  message: string ;
  code: number
};

export async function signUpAction( prevState: FormState,formData: FormData): Promise<FormState> {
  console.log("inicio auh");
  
  const email = formData.get("email") as string;
  const numero = "56"+formData.get("numero") as string;


  const resul = await signUp(email, numero);
  return {message: resul?.message? resul.message : "", code: resul?.code ? resul.code : 200};

}

/*export async function signOutAction() {
  await signOut()
  redirect("/auth/signin")
}*/
