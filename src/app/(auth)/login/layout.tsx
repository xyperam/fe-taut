import { ReactNode } from "react";
import type { Metadata } from "next";
import RootProvider from "@/provider";
export const metadata: Metadata = {
  title: "Login Page",
  description: "Login page",
};
export default function Layout({ children }: { children: ReactNode }) {
  return <RootProvider>{children}</RootProvider>;
}
