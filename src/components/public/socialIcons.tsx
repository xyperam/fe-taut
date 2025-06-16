"use client";
import { socialPlatforms } from "@/lib/socialPlatforms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialIcons({ social_links, theme }: any) {
  return (
    <div
      className="flex flex-row gap-3 mt-4 mb-6 text-xl"
      style={{ color: theme?.textColor }}
    >
      {social_links
        ?.filter((link: any) => link.active)
        .map((link: any, idx: number) => {
          const platform = socialPlatforms.find(
            (p) => p.platform.toLowerCase() === link.platform?.toLowerCase()
          );
          if (!platform) return null;
          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <FontAwesomeIcon icon={platform.icon} className="w-4 h-4" />
            </a>
          );
        })}
    </div>
  );
}
