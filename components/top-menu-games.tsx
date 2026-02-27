
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";

interface menuClassProps {
    allSelected: string,
    switchSelected: string,
    switchTwoSelected: string,
    ps4Selected: string,
    ps5Selected: string
}

export default function TopMenuGames({allSelected,switchSelected,switchTwoSelected, ps4Selected, ps5Selected}:menuClassProps) {
    return (
    <div className="mb-8 w-[100%]">
        <NavigationMenu className="relative z-10 flex  w-screen text-secondary-foreground  w-[100%]">
            <NavigationMenuList className="center m-0 flex flex-wrap list-none rounded-md bg-white p-1 shadow-blackA4">
                <NavigationMenuItem>
                    <NavigationMenuLink className={`block select-none rounded px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none ${allSelected} hover:bg-primary/30`} 
                    style={{cursor: 'pointer'}} asChild>
                        
                        <a href="/" className="flex items-center space-x-1 hover:text-gray-600">Todas las consolas</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={`block select-none rounded px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none ${switchSelected} hover:bg-primary/30 focus:shadow-violet7`} 
                    style={{cursor: 'pointer'}} asChild>

                        
                        <a href="/switch1" className="flex items-center space-x-1 hover:text-gray-600">Nintendo Switch</a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink className={`block select-none rounded px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none ${switchTwoSelected} hover:bg-primary/30 focus:shadow-violet7`} 
                    style={{cursor: 'pointer'}} asChild>
                        <Link href="/switch2" className="flex items-center space-x-1 hover:text-gray-600">Nintendo Switch 2</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink className={`block select-none rounded px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none ${ps4Selected} hover:bg-primary/30 focus:shadow-violet7`} 
                    style={{cursor: 'pointer'}} asChild>
                        <Link href="/ps4" className="flex items-center space-x-1 hover:text-gray-600">Play Station 4</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink className={`block select-none rounded px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none ${ps5Selected} hover:bg-primary/30 focus:shadow-violet7`} 
                    style={{cursor: 'pointer'}} asChild>
                        <Link href="/ps5" className="flex items-center space-x-1 hover:text-gray-600">Play Station 5</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={`block select-none rounded px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none hover:bg-primary/30 focus:shadow-violet7`} 
                    style={{cursor: 'pointer'}} asChild>
                        <Link href="/gameawards" className="flex items-center space-x-1 hover:text-gray-600">Game Awards</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                
            </NavigationMenuList>
        </NavigationMenu>
    </div>
    )
}