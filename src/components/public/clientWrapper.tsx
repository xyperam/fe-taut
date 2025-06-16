// components/SocialIconsWrapper.tsx
"use client";

import SocialIcons from "./socialIcons";

export default function SocialIconsWrapper({ social_links, theme }: any) {
  return <SocialIcons social_links={social_links} theme={theme} />;
}
