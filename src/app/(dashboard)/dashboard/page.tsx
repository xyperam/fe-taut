"use client";

import React from "react";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Preview from "@/components/preview/preview";

export default function DashboardPage() {
  return (
    <main className="flex flex-col w-full h-full overflow-hidden">
      {/* Header Utama */}
      <div className="bg-[#A7A3F0] px-4 py-3 shadow-md z-10">
        <h1 className="text-lg font-semibold text-white">Your link </h1>
        {/* <span>http://localhost:3000/{username}</span> */}
      </div>

      {/* Konten Utama */}
      <div className="flex flex-1 overflow-hidden">
        {/* Konten dashboard */}
        <div className="flex-1 overflow-y-auto">
          <DashboardContent />
        </div>

        {/* Preview hanya di desktop */}
        <div className="hidden md:flex w-[400px] bg-white border-l overflow-y-auto h-screen">
          <div className="-mt-8 w-full flex justify-center items-center">
            <Preview />
          </div>
        </div>
      </div>
    </main>
  );
}
