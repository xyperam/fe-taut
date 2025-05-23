"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Ellipsis, Plus } from "lucide-react";

interface ProfileCardProps {
  profile: {
    displayname: string;
    bio: string;
    profilePicture?: string;
  };
  onEditClick: () => void;
  onSocmedPicker: () => void;
  onSettingsClick: () => void;
}

export default function ProfileCard({
  profile,

  onSocmedPicker,
  onSettingsClick,
}: ProfileCardProps) {
  return (
    <div className="  flex flex-row justify-between items-center w-full">
      <div className="flex gap-2 items-center ">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={profile.profilePicture || "https://github.com/shadcn.png"}
            alt="Profile Picture"
          />

          <AvatarFallback>{profile.displayname?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <div>
          <div className="ml-2">
            <h1 className="text-lg">{profile.displayname}</h1>
            <p className="text-sm">{profile.bio}</p>
          </div>
          <div className="p-1">
            <Button
              variant="default"
              className="rounded-full w-5 h-5 p-0"
              onClick={onSocmedPicker}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full w-10 h-10 p-0 mr-2"
        onClick={onSettingsClick}
      >
        <Ellipsis className="w-10 h-10" />
      </Button>
    </div>
  );
}
