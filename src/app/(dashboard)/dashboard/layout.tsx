"use client";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottomNav";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">{children}</main>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
