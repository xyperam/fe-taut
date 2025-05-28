import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardItem } from "./cardItem";

type Props = {
  id: string;
  title: string;
  url: string;
  onUpdate: (id: string, field: "title" | "url", value: string) => void;
};

export default function SortableCard({ id, title, url, onUpdate }: Props) {
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
    />
  );
}
