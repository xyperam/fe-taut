// themesBox/DarkTheme.tsx
import { Button } from "@/components/ui/button";

export default function DarkTheme() {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="border  w-full h-auto p-5  bg-gray-900">
        <div className="py-4 px-0 flex flex-col gap-4 relative rounded-md bg-gray-900 overflow-hidden p-4 w-full h-full justify-center mt-10 mb-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-700 border border-gray-500 rounded px-4 py-2 text-sm text-center shadow-sm"
            />
          ))}
        </div>
      </div>
      <p>Dark Theme</p>
    </div>
  );
}
