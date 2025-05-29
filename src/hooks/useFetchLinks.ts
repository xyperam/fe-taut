import { editLink, getLinks, deleteLink } from "@/redux/slice/link.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useFetchLinks() {
  const dispatch = useDispatch<AppDispatch>();
  const { links, loading, error } = useSelector(
    (state: RootState) => state.link
  );

  const fetch = useCallback(() => {
    dispatch(getLinks());
  }, [dispatch]);

  const update = useCallback(
    async (id: string, field: "title" | "url", value: string) => {
      const linkId = Number(id);
      const existingLink = links.find((link) => link.id === linkId);

      if (!existingLink) throw new Error(`Link with ID ${id} not found`);

      const updatedLink = {
        ...existingLink,
        [field]: value,
        // Fallback defensif tetap aman
        type: existingLink.type ?? "website",
        platform: existingLink.platform ?? "custom",
      };

      try {
        await dispatch(editLink(updatedLink)).unwrap();
      } catch (err) {
        console.error("Failed to update link:", err);
        throw err;
      }
    },
    [dispatch, links]
  );
  const handleDeleteCard = useCallback(
    async (id: string) => {
      const linkId = Number(id);
      const existingLink = links.find((link) => link.id === linkId);

      if (!existingLink) {
        console.warn(`Link with ID ${id} not found for deletion`);
        return;
      }

      try {
        await dispatch(deleteLink(existingLink.id)).unwrap();
      } catch (err) {
        console.error("Gagal Delete Link:", err);
      }
    },
    [dispatch, links]
  );

  return { links, loading, error, fetch, update, handleDeleteCard };
}
