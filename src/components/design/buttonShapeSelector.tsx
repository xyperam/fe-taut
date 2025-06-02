import { Button } from "../ui/button";
import { ColorPickerPopover } from "../ui/colorPicker";

export default function ButtonShapeSelector({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (s: string) => void;
}) {
  const shapes = [
    { shape: "pill", className: "rounded-full" },
    { shape: "rounded", className: "rounded-md" },
    { shape: "square", className: "rounded-none" },
    { shape: "outline-pill", className: "rounded-full", outline: true },
    { shape: "outline-rounded", className: "rounded-md", outline: true },
    { shape: "outline-square", className: "rounded-none", outline: true },
  ];

  return (
    <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
      <h1 className="text-lg font-semibold mb-4">Desain Tombol</h1>
      <div className="grid grid-cols-3 gap-x-6 gap-y-2 place-items-center">
        {shapes.map((item) => (
          <div
            key={item.shape}
            onClick={() => onSelect(item.shape)}
            className={`w-full flex justify-center items-center cursor-pointer border rounded-lg transition p-2 ${
              selected === item.shape
                ? "border-blue-600 ring-2 ring-black"
                : "border-none"
            }`}
          >
            <Button
              variant={item.outline ? "outline" : "default"}
              className={`${item.className} w-full md:h-10 h-8`}
            />
          </div>
        ))}
      </div>
      <div className="top-full mt-4 left-3">
        <ColorPickerPopover />
      </div>
    </div>
  );
}
