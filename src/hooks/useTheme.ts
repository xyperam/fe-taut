import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "@/redux/slice/theme.slice";

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, loading, error, success, isFetched } = useSelector(
    (state: RootState) => state.theme
  );

  //fetching kalau belum
  useEffect(() => {
    if (!isFetched) {
      dispatch(getTheme());
    }
  }, [dispatch, isFetched]);
  return {
    theme,
    loading,
    error,
    success,
  };
};
