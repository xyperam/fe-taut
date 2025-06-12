import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { debounce } from "lodash";
import {
  Theme,
  getTheme,
  updateUserTheme,
  setTheme,
} from "@/redux/slice/theme.slice";
import { useCallback, useEffect, useRef } from "react";
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

  const debouncedUpdateRef = useRef(
    debounce((key: keyof Theme, value: Theme[keyof Theme]) => {
      dispatch(updateUserTheme({ [key]: value }));
    }, 500)
  );

  // ⬇ Function to update theme by name
  const selectedThemeByName = useCallback(
    (name: string) => {
      const selected = defaultThemes.find((t) => t.name === name);
      if (selected) {
        dispatch(updateUserTheme(selected));
      }
    },
    [dispatch]
  );

  const selectedAvatarBorder = useCallback(
    (shape: "circle" | "square") => {
      dispatch(updateUserTheme({ avatarBorder: shape }));
    },
    [dispatch]
  );

  const updateThemeField = useCallback(
    <K extends keyof Theme>(key: K, value: Theme[K]) => {
      if (!themeData) return;

      //  update UI state instantly
      dispatch(setTheme({ ...themeData, [key]: value }));

      // update server dengan debounce
      debouncedUpdateRef.current(key, value);
    },
    [dispatch, themeData]
  );
  //Multiple payload
  const updateMultipleThemeFields = useCallback(
    (updates: Partial<Theme>) => {
      if (!themeData) return;

      dispatch(setTheme({ ...themeData, ...updates }));
      dispatch(updateUserTheme(updates)); // langsung dispatch tanpa debounce
    },
    [dispatch, themeData]
  );

  return {
    theme: themeData, //  re-expose sebagai 'theme'
    loading,
    error,
    selectedThemeByName,
    selectedAvatarBorder,
    updateThemeField,
    updateMultipleThemeFields,
  };
};
