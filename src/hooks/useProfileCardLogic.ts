import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "@/redux/slice/profile.slice";

import type { AppDispatch, RootState } from "@/redux/store";
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
  const handleSubmitEdit = (data: { username: string; bio: string }) => {
    dispatch(
      updateProfile({
        displayname: data.username,
        bio: data.bio,
      })
    );
    setIsEditOpen(false);
  };

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
  };
}
