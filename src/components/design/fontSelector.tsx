import { fonts } from "@/lib/fontData";
import { ColorPickerPopover } from "../ui/colorPicker";
import { Theme } from "@/redux/slice/theme.slice";
const fontList = Object.keys(fonts) as Array<keyof typeof fonts>;
export default function FontSelector({
  selected,
  onSelect,
  theme,
  updateThemeField,
}: {
  theme: Theme;
  selected: string | null;
  onSelect: (s: string) => void;
  updateThemeField: <K extends keyof Theme>(key: K, value: Theme[K]) => void;
}) {
  return (
    <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
      <h1 className="text-lg font-semibold mb-4">Font</h1>
      <div className="grid grid-cols-3 gap-x-2 gap-y-3 place-items-center">
        {fontList.map((font) => (
          <div
            key={font}
            onClick={() => onSelect(font)}
            style={{ fontFamily: font }}
            className={`w-full flex justify-center cursor-pointer border rounded-md transition p-2 hover:border-gray-300 hover:shadow
          ${selected === font ? "ring-3 ring-[#6C63FF]" : "border-gray-400"}`}
          >
            {font}
          </div>
        ))}
      </div>
      <ColorPickerPopover
        color={theme?.buttonColor || "#00000"}
        onChange={(color) => updateThemeField("textColor", color)}
      />
    </div>
  );
}
