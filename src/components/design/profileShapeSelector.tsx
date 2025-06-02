type Shape = "circle" | "square";

export default function ProfileShapeSelector({
  selected,
  onSelect,
}: {
  selected: Shape | null;
  onSelect: (s: Shape) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-6">
      {["circle", "square"].map((shape) => (
        <div
          key={shape}
          onClick={() => onSelect(shape as Shape)}
          className={`flex justify-center items-center border rounded-lg h-24 w-24 cursor-pointer transition ${
            selected === shape
              ? "border-black ring-2 ring-black"
              : "border-gray-500"
          }`}
        >
          <div
            className={`h-12 w-12 ${
              selected === shape ? "bg-black" : "bg-gray-500"
            } ${shape === "circle" ? "rounded-full" : "rounded-lg"}`}
          ></div>
        </div>
      ))}
    </div>
  );
}
