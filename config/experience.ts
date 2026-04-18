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
  pinned?: boolean | false;
}

export const experiences: ExperienceInterface[] = [

  {
    id: "houseofcotton",
    position: "Full Stack Developer",
    company: "House of Cotton Private Limited",
    location: "India",
    startDate: new Date("2025-08-01"),
    endDate: "Present",
    description: [
      "Working as a Part-time Full Stack Developer building scalable web applications using modern JavaScript frameworks.",
      "Developing and maintaining frontend interfaces with React while implementing backend APIs using Node.js.",
      "Collaborating with the product and design teams to deliver responsive, user-friendly, and performance-optimized features."
    ],
    achievements: [
      "Built and deployed multiple production-ready features improving platform usability and performance.",
      "Integrated backend APIs and database systems to support scalable application workflows.",
      "Contributed to improving code quality and maintainability through modular development practices.",
      "Worked in an agile environment delivering updates and features in iterative development cycles."
    ],
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "JavaScript",
      "TypeScript",
      "REST APIs",
      "Full Stack Development"
    ],
    companyUrl: "",
    logo: "/experience/hoc.jpg", pinned: true
  },
  {
    id: "gncipl",
    position: "Full Stack Web Development Intern",
    company: "Global Next Consulting India Pvt. Ltd. (GNCIPL)",
    location: "Delhi,India",
    startDate: new Date("2025-07-03"),
    endDate: new Date("2025-08-14"),
    description: [
      "Completed a six-week Full Stack Web Development Internship delivering client-facing applications using React.js, Node.js, and MongoDB.",
      "Implemented multiple mini-projects within the internship, each focusing on building production-ready features for client workflows.",
      "Worked closely with clients and technical leadership to ensure secure, reliable, and high-quality code delivery.",
    ],
    achievements: [
      "Successfully delivered 6 mini-projects during the internship, all production-ready and adhering to strict confidentiality policies.",
      "Improved client workflows and system performance with full-stack features.",
      "Presented final project reports and deployed working applications to clients with positive feedback.",
      "Gained hands-on experience with Docker-based deployments and workflow automation.",
      "Maintained high professional standards and client communication throughout the internship.",
      "Received recognition from technical leadership for quality, reliability, and adherence to deadlines.",
    ],
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "JavaScript",
      "TypeScript",
      "Docker",
      "Full Stack Development",
    ],
    companyUrl: "https://www.gncipl.com",
    logo: "/experience/gncipl-logo.png",
    pinned: true,
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
    companyUrl: "https://www.linkedin.com/company/geek-room-msit/",
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
    companyUrl: "https://www.msit.in/society",
  },
];
