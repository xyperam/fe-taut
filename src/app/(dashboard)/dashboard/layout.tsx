"use client";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottomNav";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fonts } from "@/lib/fontData";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const themeFont = useSelector(
    (state: RootState) => state.theme.theme?.fontFamily || "Poppins"
  );
  const fontKey = themeFont as keyof typeof fonts;
  const fontVariableClass =
    fonts[fontKey]?.variable || fonts["Poppins"].variable;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`flex flex-col h-screen ${fontVariableClass}`}>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {/* main content and preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 h-full overflow-y-auto bg-[#EAEAEA]">
            {children}
          </main>
          {/* Mobile only */}
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
