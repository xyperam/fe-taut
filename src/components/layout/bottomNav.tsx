"use client";
import NavigationItem from "./NavigationItem";
import { navItems } from "./navItem";
export default function BottomNav() {
  return (
    <nav className="md:hidden flex flex-row fixed bottom-0 left-0 right-0 bg-blue-300">
      {navItems.map((item) => (
        <NavigationItem
          className="justify-between"
          key={item.path}
          {...item}
          orientation="vertical"
        />
      ))}
    </nav>
  );
}
