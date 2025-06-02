import { useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";

export function ColorPickerPopover() {
  const [color, setColor] = useState("#f97316");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          src="/images/color-wheel.png"
          alt="color-pallete"
          width={50}
          height={50}
          quality={100}
          className="w-[50px] h-[50px]"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <HexColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
}
