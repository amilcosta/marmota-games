//import { getCurrentUser } from "@/lib/auth"
import { signOutAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Gamepad2, Heart, Home, LogOut, User } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import marmota from "@/public/marmotapay.png";
//<Gamepad2 className="h-8 w-8 text-blue-600" />

export default async function Navigation() {
  //const user = await getCurrentUser()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={marmota} width={60} height={60} alt="Marmota Pay" />
              <span className="text-xl font-bold text-secondary-foreground">Marmota Pay</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 w-bottom-header">
            <Link href="/search" className="flex items-center space-x-2 w-[70%]">
              <Button className="medium-font w-[100%] bg-accent">Buscar Videojuegos</Button>
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  )
}
