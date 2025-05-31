"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type Props = {
  imageUrl: string;
  onDeleteImg: () => void;
  onOpenModalUpload: () => void;
  open: boolean;
  onClose: () => void;
};

export function RemoveImageDialog({
  imageUrl,
  onOpenModalUpload,
  onDeleteImg,
  open,
  onClose,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose(); // ✅ Hanya panggil saat dialog ditutup
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test</DialogTitle>
        </DialogHeader>
        <div className="w-24 h-12 relative cursor-pointer">
          <Image
            src={imageUrl?.trim() || "images/imageAdd.png"}
            alt="Foto Profil"
            fill
            className="object-contain w-24 h-12 relative "
          />
        </div>
        <Button onClick={onOpenModalUpload}>Ubah</Button>
        <Button onClick={onDeleteImg}>Hapus</Button>
      </DialogContent>
    </Dialog>
  );
}
