type Shape = "circle" | "square";

interface ProfileShapeSelectorProps {
  selected: Shape | null;
  onSelect: (shape: Shape) => void;
}

export default function ProfileShapeSelector({
  selected,
  onSelect,
}: ProfileShapeSelectorProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-6 bg-white p-4 rounded-md">
      {["circle", "square"].map((shape) => {
        const isSelected = selected === shape;

        return (
          <div
            key={shape}
            onClick={() => onSelect(shape as Shape)}
            className={`flex justify-center items-center h-24 w-24 border rounded-lg cursor-pointer transition 
              ${isSelected ? "ring-4 ring-[#6C63FF]" : "border-gray-300"}`}
          >
            <div
              className={`h-12 w-12 ${
                shape === "circle" ? "rounded-full" : "rounded-lg"
              } bg-gray-600`}
            />
          </div>
        );
      })}
    </div>
  );
}
