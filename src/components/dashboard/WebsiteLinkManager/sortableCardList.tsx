import SortableCard from "./sortableCard";
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFetchLinks } from "@/hooks/useFetchLinks";
import UploadAndCrop from "@/components/core/upload/uploadAndCrop";
import PreviewDialog from "@/components/core/upload/previewDialog";
import { RemoveImageDialog } from "./removeImageDialog";
// Tipe data
type LinkItem = {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
};

export default function SortableCardList() {
  const {
    links,
    loading,
    error,
    fetch,
    update,
    handleDeleteCard,
    uploadHeaderImage,
    handleDeleteImage,
  } = useFetchLinks();
  const [items, setItems] = useState<LinkItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [onOpenModalRemove, setOpenModalRemove] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const defaultImage = "/images/imageAdd.png";
  //get data from Redux
  useEffect(() => {
    fetch();
  }, [fetch]);

  //update local state when redux state changing
  useEffect(() => {
    if (links && links.length > 0) {
      const filtered = links
        .filter((link) => link.type === "website") // ⬅️ filter berdasarkan tipe
        .map((link) => ({
          id: String(link.id),
          title: link.title,
          url: link.url,
          // imageUrl: link.imageUrl,
          imageUrl:
            link.imageUrl && link.imageUrl.trim() !== ""
              ? link.imageUrl
              : defaultImage,
        }));
      setItems(filtered);
    }
  }, [links]);
  //handle update

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };
  const handleDeleteItem = async (id: string) => {
    try {
      await handleDeleteCard(id); // Hapus dari Redux / backend
      setItems((prev) => prev.filter((item) => item.id !== id)); // Hapus dari local state
    } catch (err) {
      console.error("Gagal menghapus item:", err);
    }
  };

  const onDeleteImg = async () => {
    if (selectedId) {
      try {
        await handleDeleteImage(selectedId);
        setOpenModalRemove(false);
      } catch (err) {
        console.error("Gagal menghapus gambar header:", err);
      }
    }
  };

  const handleUpdateItem = async (
    id: string,
    field: "title" | "url",
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

    try {
      await update(id, field, value);
      await fetch(); //Sync ke Redux dan backend
    } catch (err) {
      console.error("Update gagal:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {String(error)}</div>;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <SortableCard
                key={item.id}
                id={item.id}
                title={item.title}
                url={item.url}
                imageUrl={item.imageUrl}
                onUpdate={handleUpdateItem}
                onDelete={() => handleDeleteItem(item.id)}
                onOpenModalUpload={() => {
                  setSelectedId(item.id);
                  setOpenModal(true);
                }}
                onOpenModalRemove={() => {
                  setSelectedId(item.id);
                  setSelectedImageUrl(item.imageUrl);
                  setOpenModalRemove(true);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <RemoveImageDialog
        open={onOpenModalRemove}
        imageUrl={selectedImageUrl || defaultImage}
        onClose={() => {
          setOpenModalRemove(false);
        }}
        onOpenModalUpload={() => {
          setOpenModal(true);
          setOpenModalRemove(false);
        }}
        onDeleteImg={() => {
          onDeleteImg();
        }}
      />
      <UploadAndCrop
        key={openModal ? "modal-open" : "modal-closed"}
        open={openModal}
        onOpenChange={setOpenModal}
        onCropComplete={(blob) => {
          setCroppedImage(blob);
          setOpenModal(false);
        }}
      />
      <PreviewDialog
        open={!!croppedImage}
        onOpenChange={(v) => !v && setCroppedImage(null)}
        image={croppedImage}
        onBack={() => setCroppedImage(null)}
        onUpload={async (blob) => {
          try {
            const targetId = selectedId; // pastikan selectedId di-set saat buka modal
            if (!targetId)
              throw new Error("No target selected for header image");
            await uploadHeaderImage(targetId, blob);
            setCroppedImage(null);
          } catch (err) {
            console.error("Upload header image gagal:", err);
          }
        }}
      />
    </>
  );
}
