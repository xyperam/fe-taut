"use client";

import React from "react";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Preview from "@/components/preview/preview";
import DesignContent from "@/components/design/design";

export default function DashboardPage() {
  return (
    <main className="flex flex-col w-full h-full overflow-hidden">
      {/* Header Utama */}
      <div className="bg-blue-400 px-4 py-3 shadow-md z-10">
        <h1 className="text-lg font-semibold text-white">Your link </h1>
      </div>

      {/* Konten Utama */}
      <div className="flex flex-1 overflow-hidden">
        {/* Konten dashboard */}
        <div className="flex-1 overflow-y-auto">
          <DesignContent />
        </div>

        {/* Preview hanya di desktop */}
        <div className="hidden md:flex w-[400px] bg-white border-l overflow-y-auto">
          <div className="p-4 w-full flex justify-center items-start">
            <Preview />
          </div>
        </div>
      </div>
    </main>
  );
}
