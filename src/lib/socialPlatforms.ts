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
};

export const socialPlatforms: SocialPlatform[] = [
  { name: "Instagram", icon: faInstagram, baseUrl: "https://instagram.com/" },
  { name: "Facebook", icon: faFacebook, baseUrl: "https://facebook.com/" },
  { name: "X", icon: faXTwitter, baseUrl: "https://x.com/" },
  { name: "LinkedIn", icon: faLinkedin, baseUrl: "https://linkedin.com/in/" },
  { name: "Github", icon: faGithub, baseUrl: "https://github.com/" },
  { name: "Tiktok", icon: faTiktok, baseUrl: "https://www.tiktok.com/@" },
  { name: "Youtube", icon: faYoutube, baseUrl: "https://youtube.com/" },
  { name: "Snapchat", icon: faSnapchat, baseUrl: "https://snapchat.com/add/" },
  { name: "Discord", icon: faDiscord, baseUrl: "https://discord.com/users/" },
  { name: "Pinterest", icon: faPinterest, baseUrl: "https://pinterest.com/" },
  { name: "Reddit", icon: faReddit, baseUrl: "https://reddit.com/user/" },
  { name: "Threads", icon: faThreads, baseUrl: "https://www.threads.net/@" },
  {
    name: "Spotify",
    icon: faSpotify,
    baseUrl: "https://open.spotify.com/user/",
  },
];
