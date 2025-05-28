import { addLink, getLinks } from "@/redux/slice/link.slice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFetchLinks } from "./useFetchLinks";
export function useLinkState() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);

  const [isAddLinkDialogOpen, setAddLinkDialogOpen] = useState(false);
  const openAddLinkDialog = () => setAddLinkDialogOpen(true);
  const closeAddLinkDialog = () => setAddLinkDialogOpen(false);

  const handleSubmit = async (title: string, url: string) => {
    setError(null);
    try {
      await dispatch(
        addLink({
          title,
          url,
          active: true,
          platform: "custom",
          type: "website",
        })
      ).unwrap();
      dispatch(getLinks());
      closeAddLinkDialog(); // tutup dialog jika berhasil
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat menyimpan link");
    }
  };

  return {
    isAddLinkDialogOpen,
    openAddLinkDialog,
    closeAddLinkDialog,
    handleSubmit,
    error,
  };
}
