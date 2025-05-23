import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { SocialPlatform } from "@/lib/socialPlatforms";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  platform: SocialPlatform | null;
  value: string;
  onChange: (value: string) => void;
};

export default function DialogSocmedInput({
  open,
  onClose,
  platform,
  value,
  onChange,
}: Props) {
  if (!platform) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <FontAwesomeIcon icon={platform.icon} className="mr-2" />
            Add your {platform.name}
          </DialogTitle>
        </DialogHeader>
        <Input
          placeholder={`${platform.baseUrl}yourname`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </DialogContent>
    </Dialog>
  );
}
