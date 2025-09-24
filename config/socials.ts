import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "GitHub",
    username: "@shivengoomer",
    icon: Icons.gitHub,
    link: "https://github.com/shivengoomer",
  },
  {
    name: "LinkedIn",
    username: "Shiven Goomer",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/shiven-goomer/",
  },
  {
    name: "Gmail",
    username: "shivengoomer",
    icon: Icons.gmail,
    link: "mailto:shivengoomer@gmail.com",
  },
];
