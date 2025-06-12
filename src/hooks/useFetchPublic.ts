import { getPublic } from "@/redux/slice/public.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useFetchPublic(username: string) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, isFetched } = useSelector(
    (state: RootState) => state.public
  );

  useEffect(() => {
    if (!isFetched && username) {
      dispatch(getPublic(username));
    }
  }, [dispatch, isFetched, username]);

  return { data, loading, error, isFetched };
}
