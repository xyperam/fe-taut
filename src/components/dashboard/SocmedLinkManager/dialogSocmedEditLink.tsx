import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { InputWithPrefix } from "@/components/ui/input";
import { SocialPlatform } from "@/lib/socialPlatforms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  platform: SocialPlatform | null;
  value: string;
  onChange: (value: string) => void;
  onBack?: () => void;
  onSubmit: () => void;
  onDelete: () => void;
};

export default function DialogSocmedEdit({
  open,
  onClose,
  platform,
  value,
  onChange,
  onBack = () => {},
  onSubmit,
  onDelete,
}: Props) {
  if (!platform) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <FontAwesomeIcon icon={platform.icon} className="mr-2" />
            Edit Link {platform.name}
          </DialogTitle>
        </DialogHeader>
        <InputWithPrefix
          prefix={`${platform.baseUrl}`}
          type="text"
          placeholder="Username"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex flex-col gap-2 mt-4">
          <Button
            className="flex-1 bg-sky-400 hover:bg-sky-600 text-white "
            onClick={onSubmit}
          >
            Save
          </Button>
          <Button
            className="flex-1 bg-gray-300 hover:bg-red-200 text-black "
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "black" }} />
            Delete Icon
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
