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
// Tipe data
type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export default function SortableCardList() {
  const { links, loading, error, fetch, update } = useFetchLinks();
  const [items, setItems] = useState<LinkItem[]>([]);

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

  const handleUpdateItem = async (
    id: string,
    field: "title" | "url",
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );

    try {
      await update(id, field, value); // ✅ Sync ke Redux dan backend
    } catch (err) {
      console.error("Update gagal:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {String(error)}</div>;

  return (
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
              onUpdate={handleUpdateItem}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
