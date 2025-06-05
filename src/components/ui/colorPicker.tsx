import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

interface ColorPickerPopoverProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPickerPopover({
  color,
  onChange,
}: ColorPickerPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          src="/images/color-wheel.png"
          alt="color-pallete"
          width={50}
          height={50}
          quality={100}
          className="w-[50px] h-[50px] cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
