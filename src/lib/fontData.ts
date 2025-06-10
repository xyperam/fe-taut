// fonts.ts
import {
  Inter,
  Poppins,
  Roboto,
  Open_Sans,
  Outfit,
  Nunito,
  DM_Sans,
  Pacifico,
  Caveat,
  Raleway,
} from "next/font/google";

// Panggil loader-nya di module scope
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: ["400"],
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

// Kemudian masukkan ke objek
export const fonts = {
  Inter: inter,
  Poppins: poppins,
  Roboto: roboto,
  "Open Sans": openSans,
  Outfit: outfit,
  Nunito: nunito,
  "DM Sans": dmSans,
  Pacifico: pacifico,
  Caveat: caveat,
  Raleway: raleway,
} as const;
