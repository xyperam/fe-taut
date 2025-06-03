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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {themes.map((theme) => {
          console.log("compare", {
            fromRedux: selectedTheme,
            fromMap: theme.key,
          });

          return (
            <button
              key={theme.key}
              onClick={() => onThemeSelect(theme.key)}
              className={`cursor-pointer rounded-md border-2 p-2 transition focus:outline-none focus:ring-2 ${
                selectedTheme === theme.key
                  ? "border-blue-600 ring-blue-200"
                  : "border-transparent"
              }`}
            >
              {theme.component}
            </button>
          );
        })}
      </div>
    </div>
  );
}
