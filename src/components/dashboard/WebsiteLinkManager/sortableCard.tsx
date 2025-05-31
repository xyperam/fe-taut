import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardItem } from "./cardItem";
import { useFetchLinks } from "@/hooks/useFetchLinks";

type Props = {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  onUpdate: (id: string, field: "title" | "url", value: string) => void;
  onDelete: () => void;
  onOpenModalUpload: () => void;
  onOpenModalRemove: () => void;
};
export default function SortableCard({
  id,
  title,
  url,
  imageUrl,
  onUpdate,
  onDelete,
  onOpenModalUpload,
  onOpenModalRemove,
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
    />
  );
}
