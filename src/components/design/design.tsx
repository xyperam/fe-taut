"use client";
import ProfileShapeSelector from "./profileShapeSelector";
import ButtonShapeSelector from "./buttonShapeSelector";
import { useDesignSettings } from "@/hooks/useDesignSetting";
import ThemeSelector from "./themeSelector";

export default function DesignContent() {
  const { theme, loading, selectedThemeByName } = useDesignSettings();

  if (loading || !theme) {
    return <div>Loading theme...</div>;
  }

  const handleThemeSelect = (name: string) => {
    selectedThemeByName(name); // langsung update Redux dan backend
  };

  return (
    <section className="flex-1 flex justify-center overflow-y-auto bg-[#ebe8e8] mt-4 w-full pb-24">
      <div className="w-full max-w-md md:max-w-2xl space-y-4 p-4">
        <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
          <h1 className="text-lg font-semibold mb-4">Bingkai Foto Profil</h1>
          <ProfileShapeSelector selected={"circle"} onSelect={() => {}} />
        </div>

        <ThemeSelector
          selectedTheme={theme?.name ?? "default"} // ✅ ambil langsung dari Redux, bukan state lokal
          onThemeSelect={handleThemeSelect}
        />

        <ButtonShapeSelector selected={"pill"} onSelect={() => {}} />
      </div>
    </section>
  );
}
