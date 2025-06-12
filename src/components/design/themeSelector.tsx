import DefaultTheme from "../themesBox/defaultTheme";
import DarkTheme from "../themesBox/darkTheme";
import OrangeTheme from "../themesBox/orangeTheme";

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}

export default function ThemeSelector({
  selectedTheme,
  onThemeSelect,
}: ThemeSelectorProps) {
  const themes = [
    { key: "default", component: <DefaultTheme />, label: "default" },
    { key: "dark", component: <DarkTheme />, label: "dark" },
    { key: "sunset", component: <OrangeTheme />, label: "sunset" }, // Ganti jika ada tema lain
  ];

  return (
    <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
      <h1 className="text-lg font-semibold mb-4">Gaya Tema</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {themes.map((theme) => {
          console.log("compare", {
            fromRedux: selectedTheme,
            fromMap: theme.key,
          });

          return (
            <button
              key={theme.key}
              onClick={() => onThemeSelect(theme.key)}
              className={` w-full max-w-[180px] mx-auto cursor-pointer rounded-md border-2 p-2 transition focus:outline-none focus:ring-2 ${
                selectedTheme === theme.key
                  ? "ring-3 ring-[#6C63FF]"
                  : "border-transparent"
              }`}
            >
              <div className="w-full aspect-[3/4] flex items-center justify-center">
                {theme.component}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
