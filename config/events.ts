export interface EventItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  tag: string;
  category: "organized" | "competitions";
  date: string;
  location: string;
  organization: string;
  description: string;
}

/**
 * Authentic hackathons, tech events organized, and competitive credentials for Shiven Goomer.
 */
export const hackathonEvents: EventItem[] = [
  {
    src: "/events/lean-in-hacks-mentor.jpg",
    alt: "Lean In Hacks Official Mentor - Shiven Goomer",
    title: "Lean In Hacks",
    subtitle: "Official Hackathon Mentor · IGDTUW",
    tag: "Mentor",
    category: "organized",
    date: "2025",
    location: "IGDTUW, Delhi",
    organization: "Lean In IGDTUW",
    description:
      "Invited as Official Hackathon Mentor for Lean In Hacks at IGDTUW, mentoring teams on system architecture, rapid prototyping, and product pitching.",
  },
  {
    src: "/events/build-up-ideathon.jpg",
    alt: "The Build-Up Ideathon Certificate of Appreciation",
    title: "The Build-Up Ideathon",
    subtitle: "Lead Organizer · Geek Room & GDG MSIT",
    tag: "Lead Organizer",
    category: "organized",
    date: "7 Nov 2025",
    location: "MSIT, New Delhi",
    organization: "Geek Room MSIT, GDG-MSIT, ISTE & Unstop",
    description:
      "Certificate of Appreciation presented to Shiven Goomer for valuable contribution and dedicated efforts in organizing The BUILD-UP IDEATHON.",
  },
  {
    src: "/events/digital-cyberhunt-ctf.jpg",
    alt: "Digital Cyberhunt CTF Certificate of Appreciation",
    title: "Digital Cyberhunt CTF",
    subtitle: "Lead Organizer · Google Developer Group on Campus",
    tag: "Lead Organizer",
    category: "organized",
    date: "1 & 7 Feb 2026",
    location: "IILM University, Delhi NCR",
    organization: "Google Developer Group on Campus & Tech Club",
    description:
      "Certificate of Appreciation presented to Shiven Goomer for being an Organizer and contributing actively in Digital Cyberhunt CTF, ensuring smooth execution throughout.",
  },
  {
    src: "/events/geekroom-tenure-letter.png",
    alt: "Geek Room Tenure Award - Letter of Appreciation",
    title: "Geek Room Tenure Award",
    subtitle: "Letter of Appreciation · 1-Year Leadership",
    tag: "Tenure Award",
    category: "organized",
    date: "20 Aug 2025",
    location: "MSIT, New Delhi",
    organization: "Geek Room MSIT",
    description:
      "Letter of Appreciation marking completion of one-year tenure (2024-25) in Geek Room MSIT, celebrating exceptional service and vital community leadership.",
  },
  {
    src: "/events/azinhack-finalist.jpg",
    alt: "AzinHack of Elysian'25 Finalist Certificate",
    title: "AzinHack of Elysian'25",
    subtitle: "Hackathon Finalist · Team Haddi Todh Coders",
    tag: "Finalist",
    category: "competitions",
    date: "27 Oct 2025",
    location: "IoSC, New Delhi",
    organization: "IoSC & Elysian'25",
    description:
      "Finalist standing and Certificate of Participation awarded to Shiven Goomer as part of Team Haddi Todh Coders in AzinHack.",
  },
  {
    src: "/events/hackwie-certificate.jpg",
    alt: "HackWie 3.0 Certificate of Participation",
    title: "HackWie 3.0",
    subtitle: "24-Hour Hybrid Hackathon · IEEE MSIT",
    tag: "Hackathon",
    category: "competitions",
    date: "29 & 30 Jan 2025",
    location: "MSIT, New Delhi",
    organization: "IEEE MSIT & Avensis '25",
    description:
      "Certificate of Participation presented to Shiven Goomer for 24-hour hybrid hackathon HackWie 3.0 organized by IEEE MSIT.",
  },
  {
    src: "/events/code-slayer-nit-delhi.jpg",
    alt: "Code Slayer 2k25 NIT Delhi Certificate",
    title: "Code Slayer 2k25",
    subtitle: "National Institute of Technology (NIT), Delhi",
    tag: "NIT Delhi",
    category: "competitions",
    date: "31 Oct 2025",
    location: "NIT Delhi",
    organization: "National Institute of Technology (NIT), Delhi & Unstop",
    description:
      "Certificate of Participation presented to Shiven Goomer from MSIT for competing in Code Slayer 2k25 organized by NIT Delhi.",
  },
  {
    src: "/events/hackwithmait.jpg",
    alt: "HackwithMAIT 6.0 Certificate",
    title: "HackwithMAIT 6.0",
    subtitle: "MAIT Delhi · Inter-College Hackathon",
    tag: "Hackathon",
    category: "competitions",
    date: "31 Oct 2025",
    location: "MAIT, New Delhi",
    organization: "Maharaja Agrasen Institute of Technology (MAIT) & Unstop",
    description:
      "Certificate of Participation presented to Shiven Goomer for participating in HackwithMAIT 6.0 hackathon.",
  },
];
