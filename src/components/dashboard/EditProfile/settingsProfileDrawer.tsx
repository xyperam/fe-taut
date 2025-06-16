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
  onEditPhotoClick: () => void;
}

export default function SettingsProfileDrawer({
  open,
  onOpenChange,
  onEditClick,
  onEditPhotoClick,
}: SettingsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[30vh]">
        <DrawerHeader>
          <VisuallyHidden>
            <DrawerTitle>Pengaturan</DrawerTitle>
          </VisuallyHidden>
        </DrawerHeader>

        <div className="p-4 cursor-pointer" onClick={onEditPhotoClick}>
          Edit Profile Picture
        </div>

        <div className="p-4 cursor-pointer" onClick={onEditClick}>
          Edit Display Name and Bio
        </div>
      </DrawerContent>
    </Drawer>
  );
}
