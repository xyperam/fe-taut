"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ellipsis, Plus } from "lucide-react";
import { socialPlatforms } from "@/lib/socialPlatforms";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { LinkItem } from "@/redux/slice/link.slice"; // Import LinkItem type

interface ProfileCardProps {
  profile: {
    displayname: string;
    bio: string;
    profilePicture?: string;
  };
  socialLinks: LinkItem[];
  onEditClick: () => void;
  onSocmedPicker: () => void;
  onSettingsClick: () => void;
  onEditLinkClick: (link: LinkItem) => void;
}

export default function ProfileCard({
  profile,
  socialLinks,
  onSocmedPicker,
  onSettingsClick,
  onEditLinkClick,
}: ProfileCardProps) {
  return (
    <div className="  flex flex-row justify-between items-center w-full">
      <div className="flex gap-2 items-center ml-2 ">
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
          <div className="p-1 flex items-center gap-2">
            {/* Render semua icon sosial media aktif */}
            {socialLinks
              .filter((link) => link.active)
              .map((link, idx) => {
                const platform = socialPlatforms.find(
                  (p) =>
                    p.platform.toLowerCase() === link.platform?.toLowerCase()
                );
                if (!platform) return null;
                return (
                  <a
                    key={idx}
                    onClick={(e) => {
                      onEditLinkClick(link);
                    }}
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <FontAwesomeIcon icon={platform.icon} className="w-4 h-4" />
                  </a>
                );
              })}
            <FontAwesomeIcon
              icon={faCirclePlus}
              onClick={onSocmedPicker}
              className="text-muted-foreground hover:text-primary"
            />
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full w-10 h-10 p-0 mr-2 text-muted-foreground hover:text-primary"
        onClick={onSettingsClick}
      >
        <Ellipsis className="w-10 h-10 " />
      </Button>
    </div>
  );
}
