import { SocialPlatform } from "@/lib/socialPlatforms";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  addLink,
  deleteLink,
  editLink,
  getLinks,
} from "@/redux/slice/link.slice";
import { platform } from "os";
export function useDialogSocmedPicker() {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  // const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);
  const handleOpenChange = useCallback((value: boolean) => setOpen(value), []);
  const [selectedPlatform, setSelectedPlatform] =
    useState<SocialPlatform | null>(null);
  const [inputDialogOpen, setInputDialogOpen] = useState(false);
  const [socialLink, setSocialLink] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const openEditDialog = (
    platform: SocialPlatform,
    existingUrl: string,
    linkId: number
  ) => {
    setIsEditMode(true);
    setEditingLinkId(linkId);
    setSelectedPlatform(platform);
    setSocialLink(existingUrl.replace(platform.baseUrl ?? "", "")); // hanya ambil bagian username
    setInputDialogOpen(true);
  };

  const resetDialogState = () => {
    setSelectedPlatform(null);
    setSocialLink("");
    setIsEditMode(false);
    setEditingLinkId(null);
  };

  const openDialog = useCallback(() => {
    resetDialogState();
    setOpen(true);
  }, []);

  const handleInputLink = async () => {
    if (!selectedPlatform) return;

    if (!socialLink.trim()) {
      setInputError("Username tidak boleh kosong.");
      return;
    }

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
      if (isEditMode && editingLinkId !== null) {
        await dispatch(editLink({ id: editingLinkId, ...payload })).unwrap();
      } else {
        await dispatch(addLink(payload)).unwrap();
        dispatch(getLinks());
      }
      setInputDialogOpen(false);
      setOpen(false);
      setIsEditMode(false);
      setEditingLinkId(null);
    } catch (err) {
      console.error("Gagal input link:", err);
    }
  };
  const handleDeleteLink = async () => {
    if (editingLinkId === null) return;
    try {
      await dispatch(deleteLink(editingLinkId)).unwrap();
      setInputDialogOpen(false);
      setOpen(false);
      setIsEditMode(false);
      setEditingLinkId(null);
    } catch (err) {
      console.error("Gagal delete link:", err);
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
    openEditDialog,
    isEditMode,
    setIsEditMode,
    setEditingLinkId,
    handleDeleteLink,
    inputError,
    setInputError,
  };
}
