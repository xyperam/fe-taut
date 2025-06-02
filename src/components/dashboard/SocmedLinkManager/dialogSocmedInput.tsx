import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input, InputWithPrefix } from "@/components/ui/input";
import { SocialPlatform } from "@/lib/socialPlatforms";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronLeft } from "lucide-react";

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  platform: SocialPlatform | null;
  value: string;
  onChange: (value: string) => void;
  onBack?: () => void;
  onSubmit: () => void;
  error?: string | null;
};

export default function DialogSocmedInput({
  open,
  onClose,
  platform,
  value,
  onChange,
  onBack = () => {},
  onSubmit,
  error,
}: Props) {
  if (!platform) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {/* Tombol back terpisah */}
        <button
          onClick={onBack}
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-2 left-1 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
          <ChevronLeft className="" />
        </button>
        <DialogHeader>
          <DialogTitle>
            <FontAwesomeIcon icon={platform.icon} className="mr-2" />
            Tambahkan link {platform.name}
          </DialogTitle>
        </DialogHeader>

        <InputWithPrefix
          prefix={`${platform.baseUrl}`}
          type="text"
          placeholder="Username"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <div className="flex flex-row gap-2 mt-4">
          <Button className="flex-1" onClick={onSubmit}>
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
