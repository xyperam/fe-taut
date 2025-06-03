import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getTheme, updateUserTheme } from "@/redux/slice/theme.slice";
import { useCallback, useEffect } from "react";
import { defaultThemes } from "@/lib/theme";

export const useDesignSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    theme: themeData,
    loading,
    error,
    isFetched,
  } = useSelector((state: RootState) => state.theme);

  // ⬇️ Fetch theme on mount (only once)
  useEffect(() => {
    console.log("Redux theme:", themeData);
    console.log("isFetched:", isFetched);
    if (!isFetched || !themeData) {
      dispatch(getTheme());
    }
  }, [dispatch, isFetched, themeData]);

  // ⬇️ Function to update theme by name
  const selectedThemeByName = useCallback(
    (name: string) => {
      const selected = defaultThemes.find((t) => t.name === name);
      if (selected) {
        dispatch(updateUserTheme(selected));
      }
    },
    [dispatch]
  );

  return {
    theme: themeData, // ✅ re-expose sebagai 'theme'
    loading,
    error,
    selectedThemeByName,
  };
};
