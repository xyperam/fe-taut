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
            theme.backgroundType === "flat" ? "ring-4 ring-[#6C63FF]" : ""
          } w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md cursor-pointer bg-[#1F2937]`}
          // style={{
          //   backgroundColor:
          //     theme.backgroundType === "flat" ? theme.background : "#6b7280", // fallback slate
          // }}
        >
          <h1 className="text-white">Flat Color</h1>
        </div>
        <div
          onClick={() =>
            handleBackgroundTypeChange(
              "gradient",
              `bg-gradient-to-b from-[${theme.background}]`
            )
          }
          className={`${
            theme.backgroundType === "gradient" ? "ring-4 ring-[#6C63FF]" : ""
          } bg-gradient-to-b from-[#1F2937] w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md cursor-pointer`}
          // className="bg-gradient-to-b from-[#3b82f6] aspect-square w-28 h-48 sm:w-28 md:w-32 flex items-center justify-center rounded-md"
        >
          <h1 className="text-white">Gradient</h1>
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
