import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { SocialPlatform, socialPlatforms } from "@/lib/socialPlatforms";
import * as Icons from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type DialogSocmedPickerProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  onSelect: (platform: SocialPlatform) => void;
};

export default function DialogSocmedPicker({
  open,
  onClose,
  onSelect,
}: DialogSocmedPickerProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] w-[400px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Add social media</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {socialPlatforms.map((platform) => {
            return (
              <div
                onClick={() => onSelect(platform)}
                key={platform.name}
                className="flex items-center justify-between p-2 border-b border-gray-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={platform.icon}
                    className="w-6 h-6 mr-2"
                  />
                  <span>{platform.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
