import { extractHexFromGradient } from "@/helper/extractHexFromGradient";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WebsiteLinksWrapper from "./WebsiteLinkWrapper";
import SocialIconsWrapper from "./clientWrapper";

type PublicPageProps = {
  data: {
    profile: any;
    theme: any;
    social_links: any[];
    website_links: any[];
  };
};

export default function PublicPage({ data }: PublicPageProps) {
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
        <SocialIconsWrapper social_links={social_links} theme={theme} />
        <WebsiteLinksWrapper links={website_links} theme={theme} />
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
