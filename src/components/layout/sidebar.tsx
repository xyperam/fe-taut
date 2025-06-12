"use client";
import { useDispatch, useSelector } from "react-redux";
import NavigationItem from "./NavigationItem";
import { navItems } from "./navItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { getProfile } from "@/redux/slice/profile.slice";
export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <aside
      className="hidden md:flex flex-col min-w-[180px] w-40 lg:w-56 xl:w-64 transition-all duration-300"
      style={{ backgroundColor: "#c7e1e1" }}
    >
      <h2 className="text-xl font-bold mb-4 ml-4 mt-4">TAUT</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row w-full gap-2 p-2 cursor-pointer bg-[#ffffff] hover:bg-gray-100">
            <Avatar className="w-14 h-14">
              <AvatarImage
                src={profile.profilePicture || "https://github.com/shadcn.png"}
                alt="Profile Picture"
              />

              <AvatarFallback>{profile.displayname?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <h1 className="text-lg">{profile.displayname}</h1>
            </div>
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
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavigationItem key={item.path} {...item} orientation="horizontal" />
        ))}
      </nav>
    </aside>
  );
}
