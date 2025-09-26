export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: string[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "gncipl",
    position: "Full Stack Web Development Intern",
    company: "Global Next Consulting India Pvt. Ltd. (GNCIPL)",
    location: "India",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-08-01"),
    description: [
      "Developed and deployed full-stack web features (React.js, Node.js, MongoDB) for client-facing applications.",
      "Enhanced workflows and ensured secure, reliable performance of applications.",
      "Collaborated with clients and technical leadership to deliver a final project report & production-ready codebase.",
    ],
    achievements: [
      "Successfully delivered production-ready codebase adhering to strict confidentiality and ownership standards.",
      "Improved client workflows by building reliable and secure full-stack features.",
      "Presented a final project report to clients and technical leadership with positive feedback.",
    ],
    skills: ["React", "Node.js", "MongoDB", "Javascript", "Typescript"],
    logo: "/experience/gncipl-logo.png",
  },
  {
    id: "geekroom",
    position: "Head – Emerging Technology",
    company: "Geek Room",
    location: "India",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    description: [
      "Conducted sessions on Docker, Linux basics, and Web Development with a focus on real-world deployment.",
      "Built Flask backend for an inter-departmental bulk mail sender project.",
    ],
    achievements: [
      "Led knowledge-sharing sessions on Docker, Linux, and web development.",
      "Developed a Flask-based backend application for automated bulk mailing across departments.",
    ],
    skills: ["Docker", "Linux", "Flask", "Python", "Web-Dev"],
    logo: "/experience/geekroom-logo.png",
  },
  {
    id: "ieee",
    position: "Core Committee Member",
    company: "IEEE Student Branch",
    location: "India",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-12-31"),
    description: [
      "Managed event logistics and contributed to program planning & execution.",
    ],
    achievements: [
      "Coordinated and supported successful execution of multiple IEEE student branch events.",
      "Contributed to program design and logistics for student engagement initiatives.",
    ],
    skills: ["Event Management", "Leadership", "Collaboration", "Planning"],
    logo: "/experience/ieee-logo.png",
  },
];
