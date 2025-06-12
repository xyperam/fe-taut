import { ColorPickerPopover } from "../ui/colorPicker";
import { Theme } from "@/redux/slice/theme.slice";
import { extractHexFromGradient } from "@/helper/extractHexFromGradient";
export default function BackgroundSelector({
  selected,
  onSelect,
  theme,
  updateThemeField,
  updateMultipleThemeFields,
}: {
  selected: string | null;
  onSelect: (s: string) => void;
  theme: Theme;
  updateThemeField: <K extends keyof Theme>(key: K, value: Theme[K]) => void;
  updateMultipleThemeFields: (payload: Partial<Theme>) => void;
}) {
  const bgType = [
    { bgType: "flat" },
    { bgType: "gradient", className: "bg-gradient-to-b" },
  ];

  const handleBackgroundTypeChange = (
    type: "flat" | "gradient",
    value?: string
  ) => {
    updateMultipleThemeFields({
      backgroundType: type,
      ...(value && { background: value }),
    });
  };

  return (
    <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
      <h1 className="text-lg font-semibold mb-4">Background</h1>
      <div className="flex flex-row flex-wrap justify-center gap-8">
        <div
          onClick={() => handleBackgroundTypeChange("flat")}
          className={`${
            theme.backgroundType === "flat" ? "ring-4 ring-blue-400" : ""
          } w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md cursor-pointer`}
          style={{
            backgroundColor:
              theme.backgroundType === "flat" ? theme.background : "#6b7280", // fallback slate
          }}
          // className="bg-slate-600 backdrop:aspect-square w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md"
        >
          <h1 className="text-whi">Flat Color</h1>
        </div>
        <div
          onClick={() =>
            handleBackgroundTypeChange(
              "gradient",
              "bg-gradient-to-b from-[#3b82f6]"
            )
          }
          className={`${
            theme.backgroundType === "gradient" ? "ring-4 ring-blue-400" : ""
          } bg-gradient-to-b from-[#3b82f6] w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md cursor-pointer`}
          // className="bg-gradient-to-b from-[#3b82f6] aspect-square w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md"
        >
          <h1 className="text-whi">Gradient</h1>
        </div>
      </div>
      <div className="top-full mt-4 left-3 relative">
        <ColorPickerPopover
          color={
            theme.backgroundType === "flat"
              ? theme.background
              : extractHexFromGradient(theme.background)
          }
          onChange={(color) => {
            if (theme.backgroundType === "flat") {
              updateThemeField("background", color);
            } else {
              const gradient = `bg-gradient-to-b from-[${color}]`;
              updateThemeField("background", gradient);
            }
          }}
        />
      </div>
    </div>
  );
}
