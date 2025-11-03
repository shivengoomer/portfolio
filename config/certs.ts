export interface certInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
  logo?: string;
  companyUrl?: string;
  // optional preview link (pdf or drive) used for in-app View modal
  previewLink?: string;
}

export const certsUnsorted: certInterface[] = [
  {
    repo: "Oracle Cloud Infrastructure 2025 Certified Multicloud Architect Professional",
    contibutionDescription: `Oracle
Issued Oct 2025 · Expires Oct 2027
Credential ID 3AC118585DFBD281758D791DD710892D48A2E3B3ED8D566288E5F6C0B4AB85A5
Skills: Cloud Computing`,
    repoOwner: "Oracle",
    link: "https://drive.google.com/file/d/1fHiYZAqgiOcdvelijFU_49Kd_VpqhYh9/view?usp=sharing",
    companyUrl: "https://www.oracle.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  },
  {
    repo: "Introduction to Generative AI",
    contibutionDescription: `Google
Issued Jan 2025
Credential ID 13614667
Skills: Generative AI`,
    repoOwner: "Google",
    link: "https://drive.google.com/file/d/1JO_SaL2f08l_BBE0oefEnj5Sev4vZpOY/view?usp=drive_link",
    companyUrl: "https://ai.google/education/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    repo: "CS50 Harvard Python Certificate",
    contibutionDescription: `CS50
Issued Dec 2024
Credential ID 2a7ac65b-2ef3-4ef9-8e1d-90c2656eb9ef
Skills: Python`,
    repoOwner: "CS50",
    link: "https://drive.google.com/file/d/1SPZIsrWSeq-TxZu7IAQ9_yLu5GV4e0nV/view?usp=sharing",
    companyUrl: "https://cs50.harvard.edu",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/2880px-Harvard_University_logo.svg.png",
  },
];
