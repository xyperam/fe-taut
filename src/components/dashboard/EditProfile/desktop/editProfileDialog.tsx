import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  bio: string;
  onSubmit: (data: { username: string; bio: string }) => void;
}

export default function EditProfileDialog({
  open,
  onOpenChange,
  username,
  bio,
  onSubmit,
}: EditProfileDialogProps) {
  const [nameValue, setNameValue] = React.useState(username);
  const [bioValue, setBioValue] = React.useState(bio);

  useEffect(() => {
    if (open) {
      setNameValue(username);
      setBioValue(bio);
    }
  }, [open, username, bio]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Display Name and Bio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="username"
            placeholder="Username"
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <Textarea
            className="h-24"
            name="bio"
            placeholder="Bio"
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={() => onSubmit({ username: nameValue, bio: bioValue })}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
