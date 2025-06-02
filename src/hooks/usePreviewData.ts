// hooks/usePreviewData.ts
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "@/redux/store";
import { getLinks } from "@/redux/slice/link.slice";
import { getProfile } from "@/redux/slice/profile.slice";

export function usePreviewData() {
  const dispatch = useDispatch<AppDispatch>();

  const { links } = useSelector((state: RootState) => state.link);
  const { profile, isFetched: isProfileFetched } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    // Fetch data hanya kalau belum ada
    if (!links.length) {
      dispatch(getLinks());
    }
    if (!isProfileFetched) {
      dispatch(getProfile());
    }
  }, [dispatch, links.length, isProfileFetched]);

  const socialLinks = links.filter((link) => link.type === "social_media");
  const linkButtons = links.filter((link) => link.type === "website");

  return {
    profile,
    socialLinks,
    linkButtons,
  };
}
