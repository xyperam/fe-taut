"use client";
import ProfileShapeSelector from "./profileShapeSelector";
import ButtonShapeSelector from "./buttonShapeSelector";
import { useDesignSettings } from "@/hooks/useDesignSetting";
import ThemeSelector from "./themeSelector";
import { Loader2 } from "lucide-react";
import BackgroundSelector from "./backgroundSelector";
export default function DesignContent() {
  const {
    theme,
    loading,
    selectedThemeByName,
    selectedAvatarBorder,
    updateThemeField,
  } = useDesignSettings();
  const isInitialLoading = !theme && loading;
  if (isInitialLoading || !theme) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Memuat tema...
      </div>
    );
  }

  const handleThemeSelect = (name: string) => {
    selectedThemeByName(name); // langsung update Redux dan backend
  };

  const handleAvatarBorderSelect = (shape: "circle" | "square") => {
    updateThemeField("avatarBorder", shape);
  };

  return (
    <section className="flex-1 flex justify-center overflow-y-auto bg-[#ebe8e8] mt-4 pb-24">
      <div className="w-full max-w-md md:max-w-2xl space-y-4 p-4">
        {/* {loading && theme && (
          <div className="flex items-center text-sm text-gray-500">
            <Loader2 className="animate-spin w-4 h-4 mr-2" /> Menyimpan
            perubahan...
          </div>
        )} */}
        <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
          <h1 className="text-lg font-semibold mb-4">Bingkai Foto Profil</h1>
          <ProfileShapeSelector
            selected={theme.avatarBorder as "circle" | "square"}
            onSelect={handleAvatarBorderSelect}
          />
        </div>

        <ThemeSelector
          selectedTheme={theme?.name ?? "default"} // ✅ ambil langsung dari Redux, bukan state lokal
          onThemeSelect={handleThemeSelect}
        />

        <ButtonShapeSelector
          selected={theme.buttonShape ?? "pill"}
          onSelect={(shape) => updateThemeField("buttonShape", shape)}
          theme={theme}
          updateThemeField={updateThemeField}
        />
        <BackgroundSelector />
      </div>
    </section>
  );
}
