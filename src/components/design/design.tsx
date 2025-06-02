"use client";
import { useState } from "react";
import ProfileShapeSelector from "./profileShapeSelector";
import ButtonShapeSelector from "./buttonShapeSelector";
import { ColorPickerPopover } from "../ui/colorPicker";
import ThemeSelector from "./themeSelector";

export default function DesignContent() {
  const [selectedShape, setSelectedShape] = useState<
    "circle" | "square" | null
  >("circle");
  const [selectedButtonShape, setSelectedButtonShape] = useState<string | null>(
    null
  );
  const [selectedTheme, setSelectedTheme] = useState<string>("default");

  return (
    <section className="flex-1 flex justify-center overflow-y-auto bg-[#ebe8e8] mt-4 w-full pb-24">
      <div className="w-full max-w-md md:max-w-2xl space-y-4 p-4">
        {/* Profile Picture Shape Section */}
        <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
          <h1 className="text-lg font-semibold mb-4">Bingkai Foto Profil</h1>
          <ProfileShapeSelector
            selected={selectedShape}
            onSelect={setSelectedShape}
          />
        </div>

        <ThemeSelector
          selectedTheme={selectedTheme}
          onThemeSelect={setSelectedTheme}
        />

        <ButtonShapeSelector
          selected={selectedButtonShape}
          onSelect={setSelectedButtonShape}
        />
      </div>
    </section>
  );
}
