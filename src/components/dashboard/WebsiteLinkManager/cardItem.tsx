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
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

type Props = {
  title: string;
  url: string;
  onUpdate: (field: "title" | "url", value: string) => void;
  dragHandleProps?: any;
  cardRef?: (node: HTMLElement | null) => void;
  style?: React.CSSProperties;
};

export const CardItem = ({
  title,
  url,
  onUpdate,
  dragHandleProps,
  cardRef,
  style,
}: Props) => {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <Card
      ref={cardRef}
      style={style}
      className="flex flex-row items-center p-2 gap-2 relative"
    >
      <button
        onClick={() => setIsToggled((prev) => !prev)}
        className="absolute top-2 right-2"
      >
        {isToggled ? (
          <FontAwesomeIcon
            icon={faToggleOff}
            className="text-gray-500 text-xl"
          />
        ) : (
          <FontAwesomeIcon
            icon={faToggleOn}
            className="text-blue-500 text-xl"
          />
        )}
      </button>

      <div
        {...dragHandleProps}
        className="cursor-grab text-gray-400 touch-none select-none active:cursor-grabbing"
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
    </Card>
  );
};
