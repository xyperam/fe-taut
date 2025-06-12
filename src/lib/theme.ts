type Theme = {
  name: string;
  backgroundType: "flat" | "gradient";
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
    backgroundType: "flat",
    background: "#ECE9E4FF",
    textColor: "#1f2937",
    buttonColor: "#f97316",
    buttonTextColor: "#fff",
    buttonShape: "pill",
  },
  {
    name: "default",
    backgroundType: "flat",
    background: "#FCFCFCFF",
    textColor: "#111827",
    buttonColor: "#FCFAF6FF",
    buttonTextColor: "#FFFBEA",
  },
  {
    name: "dark",
    backgroundType: "flat",
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
