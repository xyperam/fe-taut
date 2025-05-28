"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { getCroppedImg } from "@/lib/cropImage";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

type CroppedArea = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCropComplete: (image: Blob) => void;
};

export default function UploadAndCrop({
  open,
  onOpenChange,
  onCropComplete,
}: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedArea | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const handleCropComplete = useCallback((_: any, croppedArea: CroppedArea) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  const handleCropAndSend = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setLoading(true);
    try {
      const croppedImg = (await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      )) as Blob;
      onCropComplete(croppedImg);
      // Optionally reset
      setImageSrc(null);
    } catch (e) {
      console.error("Crop error:", e);
    } finally {
      setLoading(false);
    }
  }, [imageSrc, croppedAreaPixels, onCropComplete]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[400px]">
        <DialogHeader>
          <DialogTitle>Upload & Crop</DialogTitle>
          <DialogDescription>
            Select and crop your profile picture.
          </DialogDescription>
        </DialogHeader>

        <Input type="file" accept="image/*" onChange={handleFileChange} />

        {imageSrc && (
          <>
            <div className="relative w-full h-[300px] bg-gray-200 rounded mt-4 overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>

            <Slider
              min={1}
              max={3}
              step={0.1}
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
              className="pt-4"
            />

            <Button
              onClick={handleCropAndSend}
              className="mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Cropping..." : "Crop"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Helper
const readFile = (file: File): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as string));
    reader.readAsDataURL(file);
  });
