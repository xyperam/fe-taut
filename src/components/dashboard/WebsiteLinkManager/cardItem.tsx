import { Card } from "@/components/ui/card";
import { EditableTextField } from "./editableField";
import {
  GripVertical,
  MoreVertical,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToggleOff,
  faToggleOn,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
type Props = {
  title: string;
  url: string;
  onUpdate: (field: "title" | "url", value: string) => void;
  dragHandleProps?: any;
  cardRef?: (node: HTMLElement | null) => void;
  style?: React.CSSProperties;
  onDelete: () => void;
  onOpenModalUpload: () => void;
};

export const CardItem = ({
  title,
  url,
  onUpdate,
  dragHandleProps,
  cardRef,
  style,
  onDelete,
  onOpenModalUpload,
}: Props) => {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <Card ref={cardRef} style={style} className="p-1 py-3">
      <div className="flex flex-col">
        <div className="flex flex-row items-center  gap-4 relative">
          <div
            {...dragHandleProps}
            className="cursor-grab text-gray-400 touch-none select-none active:cursor-grabbing self-center"
          >
            <GripVertical />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden gap-1">
            <EditableTextField
              value={title}
              onSave={(val) => onUpdate("title", val)}
              placeholder="Title"
            />
            <EditableTextField
              value={url}
              onSave={(val) => onUpdate("url", val)}
              placeholder="URL"
            />
          </div>
          <div
            className="w-24 h-12 relative cursor-pointer"
            onClick={onOpenModalUpload}
          >
            <Image
              src="/images/imageAdd.png"
              alt="Foto Profil"
              fill
              className="object-contain w-24 h-12 relative "
            />
          </div>
        </div>
        <div className="flex flex-row justify-end gap-3 px-5 pt-3 ">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-lg text-gray-400 hover:text-red-400 cursor-pointer"
            onClick={onDelete}
          />
          <button
            onClick={() => setIsToggled((prev) => !prev)}
            className="cursor-pointer"
          >
            {isToggled ? (
              <FontAwesomeIcon
                icon={faToggleOff}
                className="text-gray-500 text-lg"
              />
            ) : (
              <FontAwesomeIcon
                icon={faToggleOn}
                className="text-blue-500 text-lg"
              />
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};
