type Theme = {
  name: string;
  background: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonBorderColor?: string;
  buttonShape?: "pill" | "rounded" | "square";
  fontFamily?: string;
  useBackgroundImage?: boolean;
  backgroundImageUrl?: string;
};

export const defaultThemes: Theme[] = [
  {
    name: "sunset",
    background: "#fff7ed",
    textColor: "#1f2937",
    buttonColor: "#f97316",
    buttonTextColor: "#fff",
    buttonShape: "pill",
  },
  {
    name: "default",
    background: "#FFFBEA",
    textColor: "#111827",
    buttonColor: "#F59E0B",
    buttonTextColor: "#FFFBEA",
  },
  {
    name: "dark",
    background: "#1F2937",
    textColor: "#D1D5DB",
    buttonColor: "#374151",
    buttonTextColor: "#F9FAFB",
    buttonBorderColor: "#6B7280",
    buttonShape: "rounded" as const,
    fontFamily: "system-ui, sans-serif",
    useBackgroundImage: false,
    backgroundImageUrl: "",
  },
];
