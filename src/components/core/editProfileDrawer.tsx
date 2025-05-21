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

interface EditProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  bio: string;
  onSubmit: (data: { username: string; bio: string }) => void;
}

export default function EditProfileDrawer({
  open,
  onOpenChange,
  username,
  bio,
  onSubmit,
}: EditProfileDrawerProps) {
  const [nameValue, setNameValue] = React.useState(username);
  const [bioValue, setBioValue] = React.useState(bio);
  useEffect(() => {
    if (open) {
      setNameValue(username);
      setBioValue(bio);
    }
  }, [open, username, bio]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[50vh] ">
        <DrawerHeader>
          <DrawerTitle>Edit tampilan nama dan bio</DrawerTitle>
        </DrawerHeader>
        {/* Konten drawer di sini */}
        <div className="px-4">
          <Input
            name="username"
            placeholder="Username"
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <Textarea
            className="mt-4 p-2 h-24"
            name="bio"
            placeholder="Bio"
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
          />
        </div>
        <Button
          className="m-4"
          onClick={() => onSubmit({ username: nameValue, bio: bioValue })}
        >
          Simpan
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
