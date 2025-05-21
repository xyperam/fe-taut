"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SettingsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditClick: () => void;
}

export default function SettingsProfileDrawer({
  open,
  onOpenChange,
  onEditClick,
}: SettingsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[30vh]">
        <DrawerHeader>
          <VisuallyHidden>
            <DrawerTitle>Pengaturan</DrawerTitle>
          </VisuallyHidden>
        </DrawerHeader>

        <div className="p-4 cursor-pointer">Edit Foto Profil</div>

        <div className="p-4 cursor-pointer" onClick={onEditClick}>
          Edit Tampilan Nama dan Bio
        </div>
      </DrawerContent>
    </Drawer>
  );
}
