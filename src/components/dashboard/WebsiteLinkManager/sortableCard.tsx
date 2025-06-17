import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardItem } from "./cardItem";
import { useFetchLinks } from "@/hooks/useFetchLinks";

type Props = {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  active: boolean;
  onUpdate: (
    id: string,
    field: "title" | "url" | "active",
    value: string | boolean
  ) => void;
  onDelete: () => void;
  onOpenModalUpload: () => void;
  onOpenModalRemove: () => void;
  onToggle: () => void;
};
export default function SortableCard({
  id,
  title,
  url,
  imageUrl,
  active,
  onUpdate,
  onDelete,
  onOpenModalUpload,
  onOpenModalRemove,
  onToggle,
}: Props) {
  const { handleDeleteCard } = useFetchLinks();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <CardItem
      title={title}
      url={url}
      imageUrl={imageUrl}
      style={style}
      cardRef={setNodeRef}
      dragHandleProps={{ ...attributes, ...listeners }}
      onUpdate={(field, val) => onUpdate(id, field, val)}
      onDelete={onDelete} // Updated to pass id as an argument
      onOpenModalUpload={onOpenModalUpload}
      onOpenModalRemove={onOpenModalRemove}
      onToggle={onToggle}
      active={active}
    />
  );
}
