'use client";';
import React, { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/redux/slice/profile.slice";
import { CircleEllipsis, Ellipsis, Pencil, Plus } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

export default function ProfileCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.profile
  );
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="  flex flex-row justify-between items-center w-full">
      <div className="flex gap-2 items-center ">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={profile.profilePicture || "https://github.com/shadcn.png"}
            alt="Profile Picture"
          />
          console.log("Profile Picture URL:", profile.profilePicture);
          <AvatarFallback>{profile.displayname?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <div>
          <div className="ml-2">
            <h1 className="text-lg">{profile.displayname}</h1>
            <p className="text-sm">{profile.bio}</p>
          </div>
          <div className="p-1">
            <Button variant="default" className="rounded-full w-5 h-5 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full w-10 h-10 p-0 mr-2"
        onClick={() => setOpen(true)}
      >
        <Ellipsis className="w-10 h-10" />
      </Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[30vh] overflow-y-auto">
          <DrawerHeader>
            <VisuallyHidden>
              <DrawerTitle>Pengaturan</DrawerTitle>
            </VisuallyHidden>
          </DrawerHeader>
          {/* Konten drawer di sini */}
          <div className="p-4">Edit Foto Profil</div>
          <div className="p-4">Edit Tampilan Nama and Bio</div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
