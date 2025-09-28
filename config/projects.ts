import { ValidCategory, ValidExpType } from "./constants";

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
  techStack: string[];
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
    "Matty — an AI-powered MERN platform that combines event planning and graphic design with modern UI, cloud storage, and scalable backend.",
  websiteLink: "https://matty.ai",
  githubLink: "https://github.com/shivengoomer/matty", // remove if repo not available
  techStack: [
    "Next.js",
    "React",
    "Typescript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Cloudinary",
    "Konva.js",
    "jsPDF",
  ],
  startDate: new Date("2024-08-01"),
  endDate: new Date("2025-01-01"),
  companyLogoImg: "/projects/matty/logo.png",
  pagesInfoArr: [
    {
      title: "Canvas Editor",
      description:
        "Drag-and-drop graphic design editor with text, shapes, and images running natively in the browser.",
      imgArr: ["/projects/matty/editor.png"],
    },
    {
      title: "Design Management & Templates",
      description:
        "Save, edit, and reuse templates with cloud-based storage (MongoDB + Cloudinary) and real-time previews.",
      imgArr: ["/projects/matty/templates.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "At Matty, I contributed as a full-stack developer to build an AI-powered platform that blends event management and graphic design. I worked on both the front-end and back-end, ensuring seamless user experience, scalable architecture, and high-quality exports.",
      "Key responsibilities included integrating AI-based recommendations, implementing secure authentication, building a browser-native design editor, and optimizing image workflows with Cloudinary and Konva.",
      "The project emphasized scalability, teamwork, and industry-relevant practices while bridging the gap between academic knowledge and real-world development."
    ],
    bullets: [
      "Developed AI-powered event planning and design features using Node.js and Next.js.",
      "Built a lightweight, browser-native canvas editor with Konva.js.",
      "Integrated secure authentication & user dashboards.",
      "Designed responsive UI with Tailwind CSS and React.",
      "Implemented design persistence with MongoDB schemas.",
      "Optimized uploads and exports with Cloudinary + jsPDF.",
      "Collaborated with designers to deliver a consistent UX.",
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
    companyLogoImg: "/projects/vibestudio/logo.png",
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
    "An AI-powered chatbot web app with real-time conversation, LLM integration, and a modern, responsive interface.",
  githubLink: "https://github.com/shivengoomer/chatbot", // remove if repo not public
  techStack: [
    "Node.js",
    "Express",
    "React",
    "Socket.io",
    "Tailwind CSS",
    "LLM API (Groq/Gemini/OpenAI compatible)"
  ],
  startDate: new Date("2025-03-01"),
  endDate: new Date("2025-04-01"),
  companyLogoImg: "/projects/chatbot/logo.png",
  pagesInfoArr: [ 
  ],
  descriptionDetails: {
    paragraphs: [
      "I built an AI-powered chatbot web application that allows users to engage in real-time conversations with an intelligent assistant. Using Node.js, Express, and Socket.io on the backend and React on the frontend, I developed a scalable and responsive system for handling live chat sessions.",
      "The chatbot leverages an LLM API (Groq/Gemini/OpenAI compatible) to deliver natural, context-aware responses. On the UI side, I designed a clean and responsive chat interface with Tailwind CSS, ensuring a seamless user experience across devices.",
      "This project strengthened my skills in full-stack development, socket-based real-time communication, and integrating AI models into web applications.",
    ],
    bullets: [
      "Developed real-time chat backend using Node.js, Express, and Socket.io.",
      "Integrated LLM API for AI-driven, context-aware conversations.",
      "Built responsive chat UI with React and Tailwind CSS.",
      "Implemented typing indicators, timestamps, and message persistence.",
      "Created an admin dashboard for conversation management.",
      "Ensured scalability and low-latency communication with optimized socket handling.",
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
  companyName: "For Real (Hackathon Winner)",
  type: "Professional",
  category: ["Backend", "Web Dev"],
  shortDescription:
    "A WhatsApp integrated bot for detecting fake news, phishing links, and deepfakes.",
  githubLink: "https://github.com/shivengoomer/fake_news_detector",
  techStack: ["Node.js", "JavaScript", "WhatsApp API", "FaceForensics++", "FAISS"],
  startDate: new Date("2024-02-01"),
  endDate: new Date("2024-03-01"),
  companyLogoImg: "/projects/wpbot-news/logo.png",
  pagesInfoArr: [],
  descriptionDetails: {
    paragraphs: [
      "WPBot News is a Node.js-powered WhatsApp and WordPress bot built to tackle the rising problem of misinformation online. It detects and flags fake news articles, phishing links, and deepfake media before delivering information to end users.",
      "The project combined cybersecurity checks with automated content distribution, ensuring that only verified and safe content was shared. By leveraging APIs, FaceForensics++, and similarity search via FAISS, the bot provided users with a reliability score for any piece of content."
    ],
    bullets: [
      // Problem Statement
      "Problem: Users are constantly exposed to misinformation, phishing attacks, and deepfakes without simple verification tools integrated into their daily communication platforms.",

      // Workflow & Tech Stack
      "Workflow & Tech Stack: User Input → Node.js Verification Engine → FAISS Similarity Check & FaceForensics++ → Output Verdict → Delivered via WhatsApp/WordPress.",
      "Node.js backend orchestrates the verification pipeline.",
      "FaceForensics++ used for deepfake detection.",
      "FAISS indexing used for similarity and credibility scoring.",
      "WhatsApp API delivers instant reports; WordPress API enables secure publishing of verified content.",

      // Working & Testing
      "Working: User sends a news link, video, or text → Bot analyzes the source, checks for phishing patterns, compares media against forensic datasets, and returns a verdict (Real/Fake/Phishing).",
      "Testing: Validated against sample phishing datasets, deepfake test videos, and fake/real news articles to measure accuracy and reliability.",

      // Revenue / Use Case Model
      "Revenue Generation Model:",
      "• B2B: Offer verification as a service for media houses, educational institutions, and enterprises.",
      "• B2C: Subscription-based WhatsApp bot for individuals to verify links and news in real-time.",

      // Outcome
      "Outcome: Reduced exposure to misinformation, educated users about cybersecurity risks, and demonstrated integration of ML-based verification into chat workflows.",

    ],
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
    companyName: "TheNaanStop",
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
    }
  }
];

export const featuredProjects = Projects.slice(0, 3);
