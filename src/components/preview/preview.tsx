import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { usePreviewData } from "@/hooks/usePreviewData";
import { socialPlatforms } from "@/lib/socialPlatforms";
export default function Preview() {
  const { theme, loading, error } = useTheme();
  const { profile, socialLinks, linkButtons } = usePreviewData();
  return (
    <div
      className="w-[300px] h-[600px] rounded-[2.5rem] border-8 border-black shadow-xl overflow-hidden flex flex-col items-center"
      style={{
        backgroundColor: theme?.background,
        fontFamily: theme?.fontFamily || "inherit",
        backgroundImage:
          theme?.useBackgroundImage === true && theme.backgroundImageUrl
            ? `url(${theme.backgroundImageUrl})`
            : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* "Layar" handphone */}
      <div className="w-full h-full overflow-y-auto p-4">
        <div className="flex min-h-full">
          <div className="flex flex-col items-center px-4 py-6 w-full">
            {/* Avatar */}
            <Image
              src={profile?.profilePicture || "/default-avatar.png"}
              width={96}
              height={96}
              alt="foto-profile"
              className="rounded-full"
            />

            {/* Nama & Bio */}
            <h1
              className="mt-4 text-2xl font-bold"
              style={{ color: theme?.textColor }}
            >
              {profile?.displayname}
            </h1>
            <h2
              className="text-sm text-muted-foreground"
              style={{ color: theme?.textColor }}
            >
              {profile?.bio}
            </h2>

            {/* Social Icons */}
            <div
              className="flex flex-row gap-3 mt-4 mb-6 text-xl"
              style={{ color: theme?.textColor }}
            >
              {socialLinks
                .filter((link) => link.active)
                .map((link, idx) => {
                  const platform = socialPlatforms.find(
                    (p) =>
                      p.platform.toLowerCase() === link.platform?.toLowerCase()
                  );
                  if (!platform) return null;
                  return (
                    <a
                      key={idx}
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <FontAwesomeIcon
                        icon={platform.icon}
                        className="w-4 h-4"
                      />
                    </a>
                  );
                })}
            </div>

            {/* Links Hardcoded */}
            <div className="flex flex-col gap-3 w-full">
              {linkButtons.map((link, i) => (
                <Button
                  key={i}
                  className="w-full min-h-[48px] p-0"
                  style={{
                    backgroundColor: theme?.buttonColor,
                    color: theme?.textColor,
                    borderColor: theme?.buttonBorderColor || "transparent",
                    borderWidth: theme?.buttonBorderColor ? 1 : 0,
                    borderStyle: "solid",
                    borderRadius:
                      theme?.buttonShape === "pill"
                        ? "9999px"
                        : theme?.buttonShape === "rounded"
                        ? "0.5rem"
                        : "0",
                  }}
                  onClick={() => window.open(link.url, "_blank")} // ganti onClick jika pakai button bukan link
                >
                  <div
                    className={`flex w-full px-4 py-3 gap-3 items-center ${
                      link.imageUrl
                        ? "justify-start"
                        : "justify-center text-center"
                    }`}
                  >
                    {link.imageUrl && (
                      <Image
                        src={link.imageUrl}
                        alt="icon"
                        width={20}
                        height={20}
                        className="object-contain shrink-0 mt-[2px]"
                      />
                    )}
                    <span className="whitespace-normal text-sm leading-snug break-words w-full overflow-hidden text-ellipsis line-clamp-2">
                      {link.title}
                    </span>
                  </div>
                </Button>
              ))}
            </div>

            {/* Footer */}
            <div
              className="mt-auto mb-8 opacity-70 text-sm"
              style={{ color: theme?.textColor }}
            >
              <p>Tautin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
