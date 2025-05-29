import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: (open: boolean) => void;
  onEditClick: () => void;
  onEditPhotoClick: () => void;
};

export default function DialogProfileSettings({
  open,
  onClose,
  onEditClick,
  onEditPhotoClick,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profil</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Button
            className="w-full"
            onClick={() => {
              onEditClick();
              onClose(false);
            }}
          >
            Ubah Data Profil
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              onEditPhotoClick();
              onClose(false);
            }}
          >
            Ganti Foto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
