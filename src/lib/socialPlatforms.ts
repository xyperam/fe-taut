import { Instagram, Facebook, Twitter, Github } from "lucide-react";
import {
  faInstagram,
  faFacebook,
  faXTwitter,
  faLinkedin,
  faGithub,
  faTiktok,
  faYoutube,
  faSnapchat,
  faDiscord,
  faPinterest,
  faReddit,
  faThreads,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
export type SocialPlatform = {
  name: string;
  icon: IconDefinition;
  baseUrl?: string;
  prefix?: string;
  platform: string;
  active?: boolean;
};

export const socialPlatforms = [
  {
    name: "Instagram",
    platform: "instagram",
    icon: faInstagram,
    baseUrl: "https://instagram.com/",
  },
  {
    name: "Facebook",
    platform: "facebook",
    icon: faFacebook,
    baseUrl: "https://facebook.com/",
  },
  {
    name: "X",
    platform: "x",
    icon: faXTwitter,
    baseUrl: "https://x.com/",
  },
  {
    name: "LinkedIn",
    platform: "linkedin",
    icon: faLinkedin,
    baseUrl: "https://linkedin.com/in/",
  },
  {
    name: "Github",
    platform: "github",
    icon: faGithub,
    baseUrl: "https://github.com/",
  },
  {
    name: "Tiktok",
    platform: "tiktok",
    icon: faTiktok,
    baseUrl: "https://www.tiktok.com/@",
  },
  {
    name: "Youtube",
    platform: "youtube",
    icon: faYoutube,
    baseUrl: "https://youtube.com/",
  },
  {
    name: "Snapchat",
    platform: "snapchat",
    icon: faSnapchat,
    baseUrl: "https://snapchat.com/add/",
  },
  {
    name: "Discord",
    platform: "discord",
    icon: faDiscord,
    baseUrl: "https://discord.com/users/",
  },
  {
    name: "Pinterest",
    platform: "pinterest",
    icon: faPinterest,
    baseUrl: "https://pinterest.com/",
  },
  {
    name: "Reddit",
    platform: "reddit",
    icon: faReddit,
    baseUrl: "https://reddit.com/user/",
  },
  {
    name: "Threads",
    platform: "threads",
    icon: faThreads,
    baseUrl: "https://www.threads.net/@",
  },
  {
    name: "Spotify",
    platform: "spotify",
    icon: faSpotify,
    baseUrl: "https://open.spotify.com/user/",
  },
];
