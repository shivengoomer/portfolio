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
  category?: "Engineering" | "Community";
}

export const experiences: ExperienceInterface[] = [
  {
    id: "panscience",
    position: "Quantitative Finance Intern",
    company: "PanScience Innovations",
    location: "Delhi, India",
    startDate: new Date("2026-08-01"),
    endDate: "Present",
    category: "Engineering",
    companyUrl: "https://www.linkedin.com/company/panscience-innovations/",
    logo: "/experience/panscience.png",
    description: [
      "Working on a GenAI-powered Legal Case Law Retrieval (LCLR) system for a power/utilities sector client, aggregating regulatory orders, judgements, and petitions for automated retrieval and summarization.",
      "Contributing to PSI-Quant, an AI-native quant research and trading platform (Next.js trader terminal, Python quant libraries, Go/Rust services) with backtesting, risk, and an LLM-driven trading agent."
    ],
    achievements: [
      "Engineered GenAI-powered Legal Case Law Retrieval (LCLR) system for automated retrieval and summarization of regulatory orders, judgements, and petitions.",
      "Contributed to PSI-Quant platform spanning Next.js trader terminal, Python quant libraries, and Go/Rust services.",
      "Implemented backtesting algorithms, risk modeling, and an LLM-driven autonomous trading agent.",
      "Designed retrieval and aggregation workflows tailored to power and utilities sector client compliance requirements."
    ],
    skills: [
      "Python",
      "GenAI",
      "LLMs",
      "Next.js",
      "FastAPI",
      "Go",
      "Rust",
      "Quantitative Finance",
      "Docker"
    ],
    pinned: true,
  },
  {
    id: "houseofcouton",
    position: "Web Development Intern",
    company: "House of Couton",
    location: "Remote",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2026-08-31"),
    category: "Engineering",
    description: [
      "Engineered FastAPI and Express.js backends with 10+ RESTful API endpoints, JWT-based role authentication, and PostgreSQL + MongoDB data stores, supporting multi-role workflows across 5+ client prototype deployments.",
      "Built Python web scrapers for automated institutional and club data acquisition, feeding structured pipelines into PostgreSQL and MongoDB and eliminating manual client data collection overhead.",
      "Implemented client-specified algorithms for ranking, filtering, and data processing logic tailored to individual product prototype requirements across multiple project verticals.",
      "Integrated Groq AI inference (Llama 3) with prompt-optimized, low-token requests and retry-safe async pipelines, achieving 99%+ API reliability under concurrent load across client-facing AI features."
    ],
    achievements: [
      "Engineered FastAPI and Express.js backends with 10+ RESTful API endpoints and JWT role-based authentication across 5+ client deployments.",
      "Built automated Python web scrapers feeding structured data pipelines into PostgreSQL and MongoDB, eliminating manual overhead.",
      "Implemented custom ranking, filtering, and processing algorithms for multi-vertical product prototypes.",
      "Integrated Groq AI (Llama 3) inference with prompt-optimized requests and retry-safe async pipelines, achieving 99%+ API reliability under concurrent load."
    ],
    skills: [
      "FastAPI",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Python",
      "Groq",
      "Llama 3",
      "REST APIs",
      "JWT Authentication",
      "Web Scraping"
    ],
    companyUrl: "",
    logo: "/experience/hoc.png",
    pinned: true,
  },
  {
    id: "gncipl",
    position: "Full Stack Web Development Intern",
    company: "Global Next Consulting India Pvt. Ltd. (GNCIPL)",
    location: "India",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-08-31"),
    category: "Engineering",
    description: [
      "Developed and deployed full-stack web features (React.js, Node.js, MongoDB) for client-facing applications.",
      "Enhanced workflows and ensured secure, reliable performance of applications.",
      "Collaborated with clients and engineering leads to deliver final project reports and production-ready codebases.",
    ],
    achievements: [
      "Successfully delivered 6 mini-projects during the internship, all production-ready and adhering to strict confidentiality policies.",
      "Improved client workflows and system performance with full-stack features.",
      "Presented final project reports and deployed working applications to clients with positive feedback.",
      "Gained hands-on experience with Docker-based deployments and workflow automation.",
      "Maintained high professional standards and client communication throughout the internship.",
      "Received recognition from engineering leads for quality, reliability, and adherence to deadlines.",
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
    location: "MSIT, Delhi",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2026-03-01"),
    category: "Community",
    description: [
      "Conducted workshops on Docker, Linux, and deployment workflows for 75+ students.",
      "Built a Flask-based bulk email system used for 500+ institutional emails."
    ],
    achievements: [
      "Conducted technical workshops on Docker, Linux, and modern deployment workflows for 75+ students.",
      "Developed and deployed a Flask-based bulk email delivery platform used for 500+ institutional emails across departments.",
      "Coordinated community tech initiatives, buildathons, and developer mentorship programs."
    ],
    skills: [
      "Docker",
      "Linux",
      "Flask",
      "Python",
      "Technical Mentorship",
      "Web Development"
    ],
    logo: "/experience/geekroom-logo.png",
    companyUrl: "https://www.linkedin.com/company/geek-room-msit/",
  },
  {
    id: "ieee",
    position: "Core Committee Member",
    company: "IEEE Student Branch",
    location: "MSIT, Delhi",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-11-01"),
    category: "Community",
    description: [
      "Organized inter/intra-college hackathons, buildathons, and CTF events, coordinating technical operations and participant management."
    ],
    achievements: [
      "Organized inter- and intra-college hackathons, buildathons, and CTF events.",
      "Coordinated technical operations and participant management for competitive technical events.",
      "Collaborated with cross-functional student teams to execute university-wide technical initiatives."
    ],
    skills: [
      "Hackathon Organization",
      "Event Operations",
      "Technical Mentorship",
      "Community Building"
    ],
    logo: "/experience/ieee-logo.png",
    companyUrl: "https://www.msit.in/society",
  },
];

