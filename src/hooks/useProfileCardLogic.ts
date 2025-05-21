import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/redux/slice/profile.slice";

import type { AppDispatch, RootState } from "@/redux/store";

export function useProfileCardLogic() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.profile
  );

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSocmedOpen, setIsSocmedOpen] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const handleSubmitEdit = (data: { username: string; bio: string }) => {
    console.log(data);
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
  };
}
