'use client';
import NavigationItem from "./NavigationItem";
import { navItems } from "./navItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
export default function Sidebar(){
  
  return(
        <aside className="hidden md:flex flex-col w-64 bg-amber-700">
            <h2 className="text-xl font-bold mb-4 ml-4 mt-4">TAUT</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
            <div className="flex flex-row w-full gap-2 ml-4">
            <Avatar>
             <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>IlhamImani</h1>

            </div>
                </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-amber-50">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }}
                >Logout</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <nav className="flex flex-col gap-2">
                 {navItems.map((item) => (
          <NavigationItem key={item.path} {...item} orientation="vertical" />
        ))}
            </nav>
        </aside>
    )
}