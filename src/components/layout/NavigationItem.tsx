"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  icon: string;
  path: string;
  orientation?: "horizontal" | "vertical"; // baru
}

const NavigationItem = ({
  label,
  icon,
  path,
  orientation = "horizontal",
}: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`
        flex items-center justify-start p-2 rounded-lg transition-colors duration-200
         ${orientation === "vertical" ? "flex-col flex-1" : "justify-center"}
        ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default NavigationItem;
