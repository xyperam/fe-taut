import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

type EditableTextFieldProps = {
  value: string;
  onSave: (val: string) => void;
  placeholder?: string;
};

export function EditableTextField({
  value,
  onSave,
  placeholder,
}: EditableTextFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    if (tempValue !== value) {
      onSave(tempValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return isEditing ? (
    <Input
      ref={inputRef}
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
      placeholder={placeholder}
      className="text-base border-none focus:ring-0 focus-visible:ring-0 focus:outline-none shadow-none px-0 py-1 h-7"
    />
  ) : (
    <div className="flex items-center gap-2  ">
      <span
        className="text-base truncate overflow-hidden whitespace-nowrap "
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        {value || placeholder || "—"}
      </span>
      {/* <Pencil
        className="w-4 h-4 text-muted-foreground cursor-pointer "
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      /> */}
    </div>
  );
}
