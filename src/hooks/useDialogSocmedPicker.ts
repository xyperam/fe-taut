import { useCallback, useState } from "react";

export function useDialogSocmedPicker() {
  const [open, setOpen] = useState(false);
  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);
  const handleOpenChange = useCallback((value: boolean) => setOpen(value), []);

  return {
    open,
    openDialog,
    closeDialog,
    handleOpenChange,
  };
}
