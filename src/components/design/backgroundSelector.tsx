import { ColorPickerPopover } from "../ui/colorPicker";
import { Theme } from "@/redux/slice/theme.slice";
export default function BackgroundSelector({
  selected,
  onSelect,
  theme,
  updateThemeField,
}: {
  selected: string | null;
  onSelect: (s: string) => void;
  theme: Theme;
  updateThemeField: <K extends keyof Theme>(key: K, value: Theme[K]) => void;
}) {
  const bgType = [
    { bgType: "flat" },
    { bgType: "gradient", className: "bg-gradient-to-b" },
  ];
  return (
    <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
      <h1 className="text-lg font-semibold mb-4">Background</h1>
      <div className="flex flex-row flex-wrap justify-center gap-8">
        <div className="bg-slate-600 backdrop:aspect-square w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md">
          <h1 className="text-whi">Flat Color</h1>
        </div>
        <div className="bg-gradient-to-b from-[#3b82f6] aspect-square w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md">
          <h1 className="text-whi">Gradient</h1>
        </div>
      </div>
      <div className="top-full mt-4 left-3">
        <ColorPickerPopover
          color={theme?.background || "#00000"}
          onChange={(color) => updateThemeField("background", color)}
        />
      </div>
    </div>
  );
}
