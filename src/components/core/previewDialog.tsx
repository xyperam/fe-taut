import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type PreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: Blob | null;
  onBack: () => void;
  onUpload: (blob: Blob) => void;
};

export default function PreviewDialog({
  open,
  onOpenChange,
  image,
  onBack,
  onUpload,
}: PreviewDialogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
        setPreviewUrl(null);
      };
    }
  }, [image]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[400px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>
            Hasil crop akan tampil di bawah.
          </DialogDescription>
        </DialogHeader>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Cropped preview"
            className="w-full mt-4 rounded border shadow object-cover"
          />
        )}

        <div className="flex flex-row gap-2 mt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            className="flex-1"
            onClick={() => image && onUpload(image)}
            disabled={!image}
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
