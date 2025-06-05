"use client";

import React from "react";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Preview from "@/components/preview/preview";
import DesignContent from "@/components/design/design";
import { useProfileCardLogic } from "@/hooks/useProfileCardLogic";

export default function DashboardPage() {
  const { profile, socialLinks } = useProfileCardLogic();
  return (
    <main className="flex flex-col w-full h-full overflow-hidden">
      {/* Header Utama */}
      <div className="bg-[#9FB3DF] px-4 py-3 shadow-md z-10">
        <h1 className="text-lg font-semibold text-white">Your link </h1>
      </div>

      {/* Konten Utama */}
      <div className="flex flex-1 overflow-hidden">
        {/* Konten dashboard */}
        <div className="flex-1 overflow-y-auto ">
          <DesignContent />
        </div>

        {/* Preview hanya di desktop */}
        <div className="hidden md:flex bg-white border-l overflow-y-auto">
          <div className="p-4 w-full h-full flex justify-center items-center">
            <Preview />
          </div>
        </div>
      </div>
    </main>
  );
}
