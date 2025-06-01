type Theme = {
  name?: string;
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
    name: "Sunset",
    background: "#fff7ed",
    textColor: "#1f2937",
    buttonColor: "#f97316",
    buttonTextColor: "#fff",
    buttonShape: "pill",
  },
  {
    background: "#FFFBEA",
    textColor: "#111827",
    buttonColor: "#F59E0B",
    buttonTextColor: "#FFFBEA",
  },
];
