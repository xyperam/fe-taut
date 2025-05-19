'use client';
import NavigationItem from "./NavigationItem";
import { navItems } from "./navItem";
export default function Sidebar(){
    return(
        <aside className="hidden md:flex flex-col w-64 bg-amber-700">
            <h2 className="text-lg font-bold mb-4">TAUT</h2>
            <nav className="flex flex-col gap-2">
                 {navItems.map((item) => (
          <NavigationItem key={item.path} {...item} orientation="vertical" />
        ))}
            </nav>
        </aside>
    )
}