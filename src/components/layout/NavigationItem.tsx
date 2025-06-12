"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
interface NavItemProps {
  label: string;
  icon: IconDefinition;
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
            ? "bg-[#A7A3F0] text-white"
            : "text-gray-700 hover:bg-[#A7A3F0] hover:text-white"
        }
      `}
    >
      <FontAwesomeIcon icon={icon} className="text-xl mr-2" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default NavigationItem;
