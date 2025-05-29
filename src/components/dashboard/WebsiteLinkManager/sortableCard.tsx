import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardItem } from "./cardItem";
import { useFetchLinks } from "@/hooks/useFetchLinks";

type Props = {
  id: string;
  title: string;
  url: string;
  onUpdate: (id: string, field: "title" | "url", value: string) => void;
  onDelete: () => void;
  onOpenModalUpload: () => void;
};
export default function SortableCard({
  id,
  title,
  url,
  onUpdate,
  onDelete,
  onOpenModalUpload,
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
      style={style}
      cardRef={setNodeRef}
      dragHandleProps={{ ...attributes, ...listeners }}
      onUpdate={(field, val) => onUpdate(id, field, val)}
      onDelete={onDelete} // Updated to pass id as an argument
      onOpenModalUpload={onOpenModalUpload}
    />
  );
}
