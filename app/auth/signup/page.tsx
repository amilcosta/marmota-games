"use client"
import { signUpAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { FormEvent } from 'react';
import React, { useState, useActionState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription,DialogFooter, DialogClose } from '@/components/ui/dialog';
import Image from "next/image";
import marmota from "@/public/marmotapay.png";

export default function SignUpPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  /*const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //event.preventDefault();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signUpAction(formData);
    console.log("resultado resp: ",result)

    if (result.code==400) {
      setModalMessage(result.message);
      setShowModal(true);
    } else {
      // Handle successful submission
    }
  };*/
  
  const [state, dispatch] = useActionState(signUpAction, { email: "" });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={marmota} width={60} height={60} alt="Marmota Pay" />
              <span className="text-xl font-bold text-secondary-foreground">Marmota Pay</span>
            </Link>
          </div>
          </div>
        </div>
      </nav>
      <div className="min-h-[90vh] flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>Crear una cuenta para avisarte tus ofertas de 3 juegos favoritos</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={dispatch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="Enter your email" />
              </div>
              
              <Button type="submit" className="w-full bg-accent" onClick={() => setIsDialogOpen(true)}>
                Registrar
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/auth/signin" className="text-sm text-blue-600 hover:underline">
                Ya tienes una cuenta registrada?
              </Link>
            </div>
            {state.code && ( 
            <Dialog open={isDialogOpen} >
              <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription >
                  Make changes to your profile.
                </DialogDescription>

                <div className="grid gap-4 py-4">
                  {/* Your form elements or content here */}
                  <p>{state.message}</p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => setIsDialogOpen(false)} type="button" className="bg-accent">
                      Close
                    </Button>
                  </DialogClose>
                  
                </DialogFooter>
              </DialogContent>
            </Dialog>
            )}
            
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
