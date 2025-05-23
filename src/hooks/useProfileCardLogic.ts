import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  updateProfile,
  updateProfilePicture,
} from "@/redux/slice/profile.slice";

import type { AppDispatch, RootState } from "@/redux/store";
import { blob } from "stream/consumers";
export function useProfileCardLogic() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error, isFetched } = useSelector(
    (state: RootState) => state.profile
  );
  useEffect(() => {
    if (!isFetched) {
      console.log("[useProfileCardLogic] Fetching profile...");
      dispatch(getProfile());
    }
  }, [dispatch, isFetched]);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSocmedOpen, setIsSocmedOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleSubmitEdit = (data: { username: string; bio: string }) => {
    dispatch(
      updateProfile({
        displayname: data.username,
        bio: data.bio,
      })
    );
    setIsEditOpen(false);
  };
  const handleCropComplete = useCallback((blob: Blob) => {
    setCroppedImage(blob);
    setShowCropper(false);
    setPreviewOpen(true);
  }, []);

  const handleBackToCrop = useCallback(() => {
    setPreviewOpen(false);
    setShowCropper(true);
  }, []);

  const handleUploadPicture = useCallback(
    async (blob: Blob) => {
      try {
        await dispatch(updateProfilePicture({ file: blob })).unwrap();
        setPreviewOpen(false);
      } catch (err) {
        console.error("gagal upload gambar:", err);
      }
    },
    [dispatch]
  );
  return {
    profile,
    loading,
    error,
    isSettingOpen,
    setIsSettingOpen,
    isEditOpen,
    setIsEditOpen,
    isSocmedOpen,
    setIsSocmedOpen,
    handleSubmitEdit,
    drawerOpen,
    setDrawerOpen,
    showCropper,
    setShowCropper,
    croppedImage,
    previewOpen,
    setPreviewOpen,
    handleCropComplete,
    handleBackToCrop,
    handleUploadPicture,
  };
}
