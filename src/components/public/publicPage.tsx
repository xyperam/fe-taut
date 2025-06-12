"use client";
import { useFetchPublic } from "@/hooks/useFetchPublic";
import { extractHexFromGradient } from "@/helper/extractHexFromGradient";
import { socialPlatforms } from "@/lib/socialPlatforms";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  params: {
    username: string;
  };
};

export default function PublicPage({ username }: { username: string }) {
  const { data, loading, error } = useFetchPublic(username);

  if (loading) return <div></div>;
  if (error || !data) return <div></div>;

  const { profile, theme, social_links, website_links } = data;

  const backgroundStyles = {
    fontFamily: theme?.fontFamily || "inherit",
    backgroundColor:
      theme?.backgroundType === "flat" ? theme.background : undefined,
    backgroundImage:
      theme?.useBackgroundImage && theme.backgroundImageUrl
        ? `url(${theme.backgroundImageUrl})`
        : theme?.backgroundType === "gradient"
        ? `linear-gradient(to bottom, ${extractHexFromGradient(
            theme.background
          )}, transparent)`
        : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="w-full h-screen overflow-y-auto p-4 scrollbar-hide"
      style={backgroundStyles}
    >
      <div className="flex flex-col items-center px-4 py-6 w-full">
        <ProfileAvatar profile={profile} theme={theme} />
        <ProfileInfo profile={profile} theme={theme} />
        <SocialIcons social_links={social_links} theme={theme} />
        <WebsiteLinks links={website_links} theme={theme} />
        <Footer theme={theme} />
      </div>
    </div>
  );
}

function ProfileAvatar({ profile, theme }: any) {
  const borderClass =
    theme?.avatarBorder === "circle" ? "rounded-full" : "rounded-lg";
  return (
    <Avatar className={`w-24 h-24 ${borderClass}`}>
      <AvatarImage
        src={profile?.profile_picture || "https://github.com/shadcn.png"}
        alt="Profile Picture"
        className={borderClass}
      />
      <AvatarFallback className={borderClass}>
        {profile?.displayname?.[0] || "?"}
      </AvatarFallback>
    </Avatar>
  );
}

function ProfileInfo({ profile, theme }: any) {
  return (
    <>
      <h1
        className="mt-4 text-2xl font-bold"
        style={{ color: theme?.textColor }}
      >
        {profile?.display_name}
      </h1>
      <h2
        className="text-sm text-muted-foreground"
        style={{ color: theme?.textColor }}
      >
        {profile?.bio}
      </h2>
    </>
  );
}

function SocialIcons({ social_links, theme }: any) {
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

function WebsiteLinks({ links, theme }: any) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {links?.map((link: any, i: number) => {
        const borderRadius =
          theme?.buttonShape === "pill"
            ? "9999px"
            : theme?.buttonShape === "rounded"
            ? "0.5rem"
            : "0";

        return (
          <Button
            key={i}
            className="w-full min-h-[48px] max-w-md p-0"
            style={{
              backgroundColor: theme?.buttonColor,
              color: theme?.textColor,
              borderColor: theme?.buttonBorderColor || "transparent",
              borderWidth: theme?.buttonBorderColor ? 1 : 0,
              borderStyle: "solid",
              borderRadius,
            }}
            onClick={() => window.open(link.url, "_blank")}
          >
            <div className="flex items-center w-full px-2 py-3">
              {link.header_image_url && (
                <img
                  src={link.header_image_url}
                  alt="icon"
                  width={25}
                  height={25}
                  className={`object-contain shrink-0 ${
                    theme?.buttonShape === "pill"
                      ? "rounded-full"
                      : theme?.buttonShape === "rounded"
                      ? "rounded-sm"
                      : ""
                  }`}
                />
              )}
              <span className="flex-1 text-sm leading-snug text-center break-words">
                {link.title}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}

function Footer({ theme }: any) {
  return (
    <div
      className="mt-auto mb-8 opacity-70 text-sm"
      style={{ color: theme?.textColor }}
    >
      <p>Tautin</p>
    </div>
  );
}
