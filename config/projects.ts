import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  // ----------------------- PROFESSIONAL -----------------------
  {
    id: "matty",
    companyName: "Matty",
    type: "Professional",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription:
      "Worked on Matty — an AI-powered web platform helping users plan and manage events with modern UI and scalable backend.",
    websiteLink: "https://matty.ai",
    githubLink: "https://github.com/shivengoomer/matty", // if repo exists, else remove
    techStack: ["Next.js", "React", "Typescript", "Node.js", "MongoDB", "Tailwind CSS"],
    startDate: new Date("2024-08-01"),
    endDate: new Date("2025-01-01"),
    companyLogoImg: "/projects/matty/logo.png",
    pagesInfoArr: [
      {
        title: "Dashboard",
        description: "Event management dashboard with analytics and AI features",
        imgArr: ["/projects/matty/dashboard_1.png"],
      },
      {
        title: "AI Event Planner",
        description: "Helps users create and manage events with AI suggestions",
        imgArr: ["/projects/matty/ai_planner.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "At Matty, I contributed as a full-stack developer to build an AI-powered event management platform. I worked on both the front-end and back-end, ensuring seamless user experience and scalable architecture.",
        "Key responsibilities included integrating AI-based recommendations, implementing secure authentication, and designing clean and responsive UI components using Tailwind CSS.",
      ],
      bullets: [
        "Developed AI-powered event planning features using Node.js and Next.js.",
        "Designed modern, responsive UI with Tailwind CSS and React.",
        "Implemented secure authentication & user dashboards.",
        "Worked closely with the design team to ensure consistent UX.",
      ],
    },
  },

  // ----------------------- PERSONAL (MAIN REPOS) -----------------------
  {
    id: "vibeStudio",
    companyName: "VibeStudio",
    type: "Personal",
    category: ["Full Stack", "Web Dev"],
    shortDescription:
      "Terminal-based AI productivity tool using Groq API with modular plugin architecture and Docker support.",
    githubLink: "https://github.com/shivengoomer/vibeStudio",
    techStack: ["Node.js", "Typescript", "Docker", "Javascript"],
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-07-01"),
    companyLogoImg: "/projects/vibeStudio/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Built VibeStudio — a terminal-based AI productivity tool powered by the Groq API.",
        "Supports modular plugin architecture, shell command execution, and containerized deployment with Docker.",
      ],
      bullets: [
        "Integrated Groq API for fast LLM responses.",
        "Interactive CLI with Inquirer prompts.",
        "Shell execution & modular plugin system.",
        "Dockerized for easy deployment.",
      ],
    },
  },
  {
    id: "chatbot",
    companyName: "AI Chatbot",
    type: "Personal",
    category: ["Full Stack", "Web Dev"],
    shortDescription:
      "AI-powered chatbot web app with real-time conversation support.",
    githubLink: "https://github.com/shivengoomer/chatbot",
    techStack: ["Node.js", "Express", "React", "Socket.io"],
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-01"),
    companyLogoImg: "/projects/chatbot/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Developed a real-time chatbot with Node.js, Express, and Socket.io.",
        "Integrated LLM API for intelligent conversation handling.",
      ],
      bullets: ["Socket.io real-time chat", "AI-based responses", "Responsive chat UI"],
    },
  },
  {
    id: "donation-tracker",
    companyName: "Donation Tracker",
    type: "Personal",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription:
      "Donation tracking dashboard with analytics, user management, and reporting.",
    githubLink: "https://github.com/shivengoomer/donation-tracker",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Recharts"],
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-09-01"),
    companyLogoImg: "/projects/donation-tracker/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Created an admin dashboard to track donations and users.",
        "Visualized analytics using Recharts and enabled report downloads.",
      ],
      bullets: [
        "Donation and user management.",
        "Graphs & analytics with Recharts.",
        "Print-ready reports (separate pages).",
      ],
    },
  },
  {
    id: "face-track-project",
    companyName: "Face Track",
    type: "Personal",
    category: ["Frontend", "Web Dev"],
    shortDescription: "Face detection and tracking using OpenCV and Python.",
    githubLink: "https://github.com/shivengoomer/face-track-project",
    techStack: ["Python", "OpenCV"],
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-07-01"),
    companyLogoImg: "/projects/face-track/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Developed a face tracking application using OpenCV for real-time webcam detection.",
      ],
      bullets: ["Real-time video feed", "Face detection & bounding boxes"],
    },
  },
  {
    id: "fake_news_detector",
    companyName: "Fake News Detector",
    type: "Personal",
    category: ["Full Stack", "Web Dev"],
    shortDescription:
      "Fake news detection web app with NLP pipeline for classification.",
    githubLink: "https://github.com/shivengoomer/fake_news_detector",
    techStack: ["Python", "Flask"],
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-06-01"),
    companyLogoImg: "/projects/fake_news/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Built a fake news detection pipeline using NLP models.",
        "Deployed with Flask web interface.",
      ],
      bullets: ["Text preprocessing", "ML classification", "Flask API"],
    },
  },
  {
    id: "adopt-me",
    companyName: "Adopt Me",
    type: "Personal",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription: "Pet adoption platform with listings and user profiles.",
    githubLink: "https://github.com/shivengoomer/adopt-me",
    techStack: ["React", "Node.js", "express.js", "MongoDB"],
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-01"),
    companyLogoImg: "/projects/adoptme/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["Created an adoption portal where users can list and adopt pets."],
      bullets: ["User auth", "Pet listings", "Contact owners"],
    },
  },
  {
    id: "wpbot-news",
    companyName: "WPBot News",
    type: "Personal",
    category: ["Backend", "Web Dev"],
    shortDescription:
      "WhatsApp/WordPress integrated news bot to fetch and send latest news.",
    githubLink: "https://github.com/shivengoomer/wpbot-news",
    techStack: ["Node.js", "Javascript"],
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-01"),
    companyLogoImg: "/projects/wpbot-news/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["Bot fetching news and delivering through chat channels."],
      bullets: ["API fetch", "WhatsApp integration", "News delivery"],
    },
  },
  {
    id: "snippetly",
    companyName: "Snippetly",
    type: "Personal",
    category: ["Full Stack", "Web Dev"],
    shortDescription: "Snippet manager for saving and organizing code snippets.",
    githubLink: "https://github.com/shivengoomer/snippetly",
    techStack: ["React", "Javascript"],
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-08-01"),
    companyLogoImg: "/projects/snippetly/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["Web tool to save and organize code snippets."],
      bullets: ["CRUD operations", "Syntax highlight", "Search & filter"],
    },
  },
  {
    id: "newnaanstop",
    companyName: "NewNaanStop",
    type: "Personal",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription:
      "AI-powered recipe & cooking platform with Gemini API recommendations.",
    githubLink: "https://github.com/shivengoomer/newnaanstop",
    techStack: ["React", "Node.js", "Tailwind CSS"],
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-01"),
    companyLogoImg: "/projects/newnaanstop/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Created NewNaanStop, a recipe app with AI suggestions using Gemini API and Foodish images.",
      ],
      bullets: ["Recipe AI", "YouTube integration", "Tailwind UI"],
    },
  },

  // ----------------------- BASIC HTML/CSS/JS PRACTICE -----------------------
  {
    id: "amazon-clone",
    companyName: "Amazon Clone",
    type: "Personal",
    category: ["Frontend", "Web Dev"],
    shortDescription:
      "Amazon UI clone with product listing, cart, and responsive design.",
    githubLink: "https://github.com/shivengoomer/amazon-clone",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-01-01"),
    endDate: new Date("2022-01-20"),
    companyLogoImg: "/projects/amazon/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["Practiced building e-commerce style layout and cart logic."],
      bullets: ["Product grid", "Cart logic", "Responsive design"],
    },
  },
  {
    id: "yt-clone",
    companyName: "YouTube Clone",
    type: "Personal",
    category: ["Frontend", "Web Dev"],
    shortDescription:
      "YouTube UI clone with video grid and player page using mock data.",
    githubLink: "https://github.com/shivengoomer/YT-CLONE",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-02-01"),
    endDate: new Date("2022-02-20"),
    companyLogoImg: "/projects/ytclone/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["UI recreation of YouTube home and watch pages."],
      bullets: ["Grid layout", "Sidebar filters", "Responsive player page"],
    },
  },
  {
    id: "todo-list",
    companyName: "To-Do List",
    type: "Personal",
    category: ["Frontend", "Web Dev"],
    shortDescription:
      "To-Do List app with add, delete, mark complete and local storage.",
    githubLink: "https://github.com/shivengoomer/ToDo-List",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-03-10"),
    companyLogoImg: "/projects/todo/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["Simple task manager to practice DOM and storage."],
      bullets: ["Add/delete tasks", "LocalStorage persistence", "Responsive"],
    },
  },
  {
    id: "qrcode-generator",
    companyName: "QR Code Generator",
    type: "Personal",
    category: ["Frontend", "Web Dev"],
    shortDescription:
      "QR Code generator from user input with PNG download feature.",
    githubLink: "https://github.com/shivengoomer/QrCode-Genrator",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-04-01"),
    endDate: new Date("2022-04-10"),
    companyLogoImg: "/projects/qrcode/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["Practice with JS libraries and canvas download."],
      bullets: ["QR generation", "Download as PNG"],
    },
  },
  {
    id: "calculator",
    companyName: "Calculator",
    type: "Personal",
    category: ["Frontend", "Web Dev"],
    shortDescription: "Basic Calculator with JS operations.",
    githubLink: "https://github.com/shivengoomer/calculator",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-05-05"),
    companyLogoImg: "/projects/calculator/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["Built to practice JavaScript DOM events and math ops."],
      bullets: ["Basic math ops", "Keyboard input", "Responsive"],
    },
  },
  {
    id: "landing-page",
    companyName: "Landing Page",
    type: "Personal",
    category: ["Frontend", "Web Dev", "UI/UX"],
    shortDescription: "Modern landing page with flexbox & animations.",
    githubLink: "https://github.com/shivengoomer/landing-page",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-06-01"),
    endDate: new Date("2022-06-05"),
    companyLogoImg: "/projects/landing/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: ["Experimented with hero sections, CSS animations."],
      bullets: ["Responsive hero", "Scroll animations", "Contact section"],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
