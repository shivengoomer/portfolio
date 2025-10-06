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
  priority: number; // 👈 added here
}

export const Projects: ProjectInterface[] = [
  {
    id: "matty",
    companyName: "Matty",
    type: "Professional",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription:
      "Matty — an AI-powered MERN platform that combines event planning and graphic design with modern UI, cloud storage, and scalable backend.",
    websiteLink: "https://matty.ai",
    githubLink: "https://github.com/shivengoomer/matty",
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
        "At Matty, I contributed as a full-stack developer to build an AI-powered platform that blends event management and graphic design.",
        "Key responsibilities included integrating AI-based recommendations, authentication, and a browser-native editor.",
        "Focused on scalable architecture, teamwork, and real-world practices.",
      ],
      bullets: [
        "AI-powered design and event features",
        "Built browser-native editor with Konva.js",
        "Secure authentication & dashboard",
        "Responsive UI with Tailwind CSS",
        "MongoDB-based persistence",
        "Optimized uploads via Cloudinary + jsPDF",
      ],
    },
    priority: 1,
  },
  {
    id: "vibeStudio",
    companyName: "VibeStudio",
    type: "Personal",
    category: ["Full Stack", "Web Dev"],
    shortDescription:
      "Terminal-based AI productivity tool powered by the Groq API — featuring modular plugins, shell automation, and Docker deployment.",
    githubLink: "https://github.com/shivengoomer/vibeStudio",
    techStack: ["Node.js", "Docker", "JavaScript"],
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-07-01"),
    companyLogoImg: "/projects/vibestudio/logo.png",
    pagesInfoArr: [
      {
        title: "CLI Interface & Workflow",
        description:
          "VibeStudio’s interactive terminal interface enables AI-powered workflows directly from the CLI. Users can create, manage, and execute AI-driven commands through an intuitive prompt system.",
        imgArr: ["/projects/vibestudio/cli.png"],
      },
      {
        title: "Pulling and Using Docker Image",
        description:
          "VibeStudio can be containerized using Docker for lightweight deployment. Users can pull the pre-built Docker image from the registry and run the CLI instantly without setup overhead.",
        imgArr: ["/projects/vibestudio/pull.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Built VibeStudio*, a terminal-based AI productivity environment that leverages the Groq API for fast, context-aware language model execution. The platform supports modular plugin extensions, enabling developers to integrate AI workflows with shell commands, automation scripts, and APIs.",
        "Designed with TypeScript and Docker, VibeStudio can run natively or in isolated containers, allowing for quick deployment and consistent performance across systems.",
      ],
      bullets: [
        "Integrated Groq API for ultra-fast, low-latency LLM responses.",
        "Built an interactive CLI using Inquirer prompts for intuitive user experience.",
        "Designed a modular plugin architecture enabling flexible AI-based extensions.",
        "Added shell command execution for task automation.",
        "Containerized the app using Docker for reproducible deployments.",
        "Supported image pulling from Docker Hub for seamless environment setup.",
      ],
    },
    priority: 2,
  },

  {
    id: "chatbot",
    companyName: "AI Chatbot",
    type: "Personal",
    category: ["Full Stack", "Web Dev"],
    shortDescription:
      "AI-powered chatbot web app with real-time LLM-based conversations and responsive interface.",
    githubLink: "https://github.com/shivengoomer/chatbot",
    techStack: [
      "Node.js",
      "Express",
      "React",
      "Socket.io",
      "Tailwind CSS",
      "LLM API (Groq/Gemini/OpenAI)",
    ],
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-01"),
    companyLogoImg: "/projects/chatbot/logo.png",
    pagesInfoArr: [],
    descriptionDetails: {
      paragraphs: [
        "Built a full-stack chatbot app with real-time LLM integration and scalable backend.",
      ],
      bullets: [
        "Socket-based real-time chat",
        "AI responses via LLM APIs",
        "Responsive UI with Tailwind",
      ],
    },
    priority: 5,
  },
  {
    id: "book-review",
    companyName: "Book Review Platform",
    type: "Personal",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription:
      "A MERN-based platform for users to sign up, add books, and post detailed reviews.",
    githubLink: "https://github.com/shivengoomer/book_review_assigment",
    techStack: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Tailwind CSS",
      "JWT Authentication",
    ],
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-10-01"),
    companyLogoImg: "/projects/bookreview/logo.png",
    pagesInfoArr: [
      {
        title: "Dashboard & Book List",
        description:
          "Displays all books with authors, ratings, and review counts.",
        imgArr: ["/projects/bookreview/dashboard.png"],
      },
      {
        title: "Review System",
        description:
          "Users can rate and review books with average rating display.",
        imgArr: ["/projects/bookreview/review.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Built a book review app with authentication and CRUD operations.",
      ],
      bullets: [
        "JWT-based authentication",
        "CRUD for books and reviews",
        "Rating and analytics",
        "Responsive Tailwind UI",
      ],
    },
    priority: 5,
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
        "Built admin dashboard for donation analytics and user tracking.",
      ],
      bullets: [
        "Graphs via Recharts",
        "Downloadable reports",
        "User and donation CRUD",
      ],
    },
    priority: 5,
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
        "Recipe app with AI suggestions using Gemini API and Foodish images.",
      ],
      bullets: ["Recipe AI", "YouTube integration", "Tailwind UI"],
    },
    priority: 3,
  },
  {
    id: "wpbot-news",
    companyName: "For Real | D-TOX (Hackathon Winner)",
    type: "Professional",
    category: ["Backend", "Web Dev"],
    shortDescription:
      "A WhatsApp-integrated assistant that detects fake news, phishing links, and deepfakes to keep messaging secure.",
    githubLink: "https://github.com/shivengoomer/fake_news_detector",
    techStack: [
      "Node.js",
      "JavaScript",
      "Baileys (WhatsApp Web API)",
      "FaceForensics++",
      "FAISS",
      "NLP",
    ],
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-01"),
    companyLogoImg: "/projects/wpbot-news/logo.png",
    pagesInfoArr: [
      {
        title: "Phishing Link Detection",
        description:
          "Real-time analysis of incoming links to identify phishing patterns and flag suspicious URLs before delivery.",
        imgArr: ["/projects/wpbot-news/phishing.png"],
      },
      {
        title: "Fake News Analysis",
        description:
          "NLP-based article/source analysis and similarity search (FAISS) to surface likely misinformation and provide a reliability score.",
        imgArr: ["/projects/wpbot-news/fakenews.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Won a Hackathon for architecting an AI-powered WhatsApp assistant that keeps messaging secure and scam-free.",
        "Engineered a real NLP pipeline for fake-news and phishing detection, cutting scam exposure by ~60% in test datasets.",
        "Integrated with Baileys (WhatsApp Web API) to provide an app-free, frictionless user experience for end users.",
        "Deployed 24/7 automated messaging and verification features to enhance communication safety and reliability.",
      ],
      bullets: [
        "Deepfake detection using FaceForensics++ for image/video forensics.",
        "Phishing link detection with URL heuristics, domain reputation checks, and pattern matching.",
        "Fake news scoring via NLP and FAISS similarity search against verified sources.",
        "Seamless WhatsApp delivery using Baileys — no separate app required.",
        "24/7 automated alerts and reports, reducing scam exposure by ~60% in validation tests.",
        "Scalable Node.js architecture with modular verification pipeline.",
      ],
    },
    priority: 2,
  },

  {
    id: "snippetly",
    companyName: "Snippetly",
    type: "Personal",
    category: ["Full Stack", "Web Dev"],
    shortDescription:
      "Snippet manager for saving and organizing code snippets.",
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
    priority: 4,
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
      paragraphs: ["Created a portal for listing and adopting pets."],
      bullets: ["User auth", "Pet listings", "Contact owners"],
    },
    priority: 9,
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
        "Developed a face tracking app using OpenCV for real-time webcam detection.",
      ],
      bullets: ["Real-time video feed", "Face detection & bounding boxes"],
    },
    priority: 4,
  },
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
      paragraphs: ["Practiced building e-commerce layout and cart logic."],
      bullets: ["Product grid", "Cart logic", "Responsive design"],
    },
    priority: 11,
  },
];

export const featuredProjects = Projects.sort(
  (a, b) => a.priority - b.priority
).slice(0, 3);
