import React, { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // onSelect: (platform: string) => void;
}

const platforms = [
  "Instagram",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Github",
  "Tiktok",
  "Youtube",
  "Snapchat",
];
export default function SocmedPickerDrawer({ open, onOpenChange }: Props) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[50vh] overflow-auto-y">
        <DrawerHeader>
          <DrawerTitle>Pilih </DrawerTitle>
        </DrawerHeader>
        {/* Konten drawer di sini */}
        <div className="flex flex-col gap-2">
          {platforms.map((platforms) => (
            <Button
              key={platforms}
              // onClick={() => onSelect(platforms)}
            >
              {platforms}
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
