"use client";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";

const profileData = {
  avatar: "https://github.com/shadcn.png",
  name: "Testtttt",
  bio: "Bio",
  links: [
    { label: "Instagram", url: "#" },
    { label: "YouTube", url: "#" },
    { label: "Toko", url: "#" },
  ],
  socialIcons: [faDiscord, faCircle],
  theme: {
    bg: "#FFFBEA",
    text: "#111827",
    button: "#F59E0B",
  },
};
export default function PublicPage() {
  const { avatar, name, bio, links, socialIcons, theme } = profileData;
  return (
    <>
      <main
        className="h-screen w-screen"
        style={{ backgroundColor: theme.bg, color: theme.text }}
      >
        <div className="flex min-h-full">
          <div className="flex flex-col items-center p-8 mx-auto w-full max-w-xl">
            {/* Avatar */}
            <Image
              src={avatar}
              width={96}
              height={96}
              alt="foto-profile"
              className="rounded-full"
            />

            {/* Nama & Bio */}
            <h1 className="mt-4 text-2xl font-bold">{name}</h1>
            <h2 className="text-sm text-muted-foreground">{bio}</h2>

            {/* Social Icons */}
            <div className="flex flex-row gap-3 mt-4 mb-6">
              {socialIcons.map((icon, i) => (
                <FontAwesomeIcon icon={icon} key={i} className="text-xl" />
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3 w-full">
              {links.map((link, i) => (
                <Button
                  key={i}
                  className="w-full"
                  style={{
                    backgroundColor: theme.button,
                    color: "#fff",
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto mb-8 opacity-70 text-sm">
              <p>Tautin</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
