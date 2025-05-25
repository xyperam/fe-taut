import { SocialPlatform } from "@/lib/socialPlatforms";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addLink } from "@/redux/slice/link.slice";
import { platform } from "os";
export function useDialogSocmedPicker() {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);
  const handleOpenChange = useCallback((value: boolean) => setOpen(value), []);
  const [selectedPlatform, setSelectedPlatform] =
    useState<SocialPlatform | null>(null);
  const [inputDialogOpen, setInputDialogOpen] = useState(false);
  const [socialLink, setSocialLink] = useState("");

  const handleInputLink = async () => {
    const url = selectedPlatform
      ? `${selectedPlatform.baseUrl}${socialLink}`
      : "";
    const payload = {
      title: selectedPlatform?.name || "",
      platform: selectedPlatform?.platform || "",
      url: url,
      active: true,
      type: "social_media",
    };
    try {
      await dispatch(addLink(payload)).unwrap();
      setInputDialogOpen(false);
      setOpen(false);
    } catch (err) {
      console.error("Gagal input link:", err);
    }
  };

  const handleBackToSelectPlatform = useCallback(() => {
    setInputDialogOpen(false);
    setOpen(true);
  }, []);
  return {
    open,
    openDialog,
    closeDialog,
    handleOpenChange,
    selectedPlatform,
    setSelectedPlatform,
    inputDialogOpen,
    setInputDialogOpen,
    socialLink,
    setSocialLink,
    handleBackToSelectPlatform,
    handleInputLink,
  };
}
