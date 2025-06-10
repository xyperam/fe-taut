import { fonts } from "@/lib/fontData";
const fontList = Object.keys(fonts) as Array<keyof typeof fonts>;
export default function FontSelector({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (s: string) => void;
}) {
  return (
    <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
      <h1>Font</h1>
      <div className="grid grid-cols-3 gap-x-6 gap-y-2 place-items-center">
        {fontList.map((font) => (
          <div
            key={font}
            onClick={() => onSelect(font)}
            style={{ fontFamily: font }}
            className={`w-full flex justify-center cursor-pointer border rounded-md transition p-2 hover:border-gray-300 hover:shadow
          ${
            selected === font
              ? "border-blue-600 ring-2 ring-black"
              : "border-gray-400"
          }`}
          >
            {font}
          </div>
        ))}
      </div>
    </div>
  );
}
