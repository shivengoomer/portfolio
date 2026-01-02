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
  priority: number;
}

export const Projects: ProjectInterface[] = [
  {
    id: "matty",
    companyName: "Matty",
    type: "Professional",
    category: ["Full Stack", "Web Dev", "UI/UX"],
    shortDescription:
      "Matty — an AI-powered MERN platform that combines event planning and graphic design with modern UI, cloud storage, and scalable backend.",
    websiteLink: "",
    githubLink: "https://github.com/shivengoomer",
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
        "Built VibeStudio, a terminal-based AI productivity environment leveraging the Groq API for fast, context-aware language model execution. It supports modular plugin extensions to integrate AI workflows with shell commands and automation scripts.",
        "Designed with Docker for consistent, containerized deployments across environments.",
      ],
      bullets: [
        "Integrated Groq API for ultra-fast, low-latency LLM responses",
        "Interactive CLI using Inquirer prompts",
        "Plugin architecture for flexible AI extensions",
        "Shell command execution for automation",
        "Docker-based deployments",
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
    pagesInfoArr: [
      {
        title: "Chatbot Page",
        description:
          "Interactive chat interface supporting real-time LLM-based responses with typing indicators.",
        imgArr: ["/projects/chatbot/chatpage.png"],
      },
    ],
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
    pagesInfoArr: [
      {
        title: "Dashboard",
        description:
          "Displays donation statistics and user summaries in an organized layout.",
        imgArr: ["/projects/donation-tracker/dashboard.png"],
      },
      {
        title: "Analytics",
        description:
          "Shows donation trends via graphs and charts using Recharts.",
        imgArr: ["/projects/donation-tracker/analytics.png"],
      },
      {
        title: "Donation Table",
        description:
          "Tabular display of all donations with filter, sort, and pagination features.",
        imgArr: ["/projects/donation-tracker/table.png"],
      },
    ],
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
    priority: 4,
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
    pagesInfoArr: [
      {
        title: "Homepage & Recipe Discovery",
        description:
          "Homepage with trending recipes and AI recommendations via Gemini API.",
        imgArr: ["/projects/newnaanstop/homepage.png"],
      },
      {
        title: "Recipe Details & YouTube Integration",
        description:
          "Detailed recipe info with integrated YouTube cooking tutorials.",
        imgArr: ["/projects/newnaanstop/recipe-youtube.png"],
      },
      {
        title: "AI Chatbot for Recipe Suggestions",
        description:
          "Gemini-powered chatbot helps users find recipes based on ingredients.",
        imgArr: ["/projects/newnaanstop/chatbot.png"],
      },
    ],
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
          "Detects malicious links in real time using heuristics and reputation scoring.",
        imgArr: ["/projects/wpbot-news/phishing.png"],
      },
      {
        title: "Fake News Analysis",
        description:
          "NLP-based news source verification and similarity detection via FAISS.",
        imgArr: ["/projects/wpbot-news/fakenews.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Won a Hackathon for architecting an AI-powered WhatsApp assistant that keeps messaging secure and scam-free.",
      ],
      bullets: [
        "Deepfake detection using FaceForensics++",
        "Phishing link detection",
        "Fake news scoring via NLP and FAISS",
        "WhatsApp integration using Baileys",
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
    pagesInfoArr: [
      {
        title: "UI",
        description: "Simple and clean UI for creating and organizing snippets.",
        imgArr: ["/projects/snippetly/ui.png"],
      },
      {
        title: "Saved Tabs",
        description:
          "View and organize saved snippets with tags and quick navigation.",
        imgArr: ["/projects/snippetly/saved-tabs.png"],
      },
      {
        title: "Clipboard",
        description:
          "Copy snippets to clipboard instantly for faster coding workflow.",
        imgArr: ["/projects/snippetly/clipboard.png"],
      },
    ],
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
  shortDescription:
    "Pet adoption platform with location-based search, listings, and user profiles.",
  githubLink: "https://github.com/shivengoomer/adopt-me",
  techStack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  startDate: new Date("2024-03-01"),
  endDate: new Date("2024-04-01"),
  companyLogoImg: "/projects/adoptme/logo.png",
  pagesInfoArr: [
    {
      title: "Home Page",
      description:
        "Homepage featuring a clean UI with a location-based search bar to find pets nearby and featured adoption listings.",
      imgArr: ["/projects/adoptme/homepage.png"],
    },
    {
      title: "Pet Listings",
      description:
        "Displays detailed cards for available pets with filters for type, age, and location.",
      imgArr: ["/projects/adoptme/homepage.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "Built a full-stack pet adoption platform enabling users to browse, search, and connect with pet owners.",
      "Implemented a location-based search feature on the homepage, allowing users to find pets available for adoption nearby.",
      "Designed a responsive, user-friendly interface with intuitive navigation and quick pet detail previews.",
    ],
    bullets: [
      "Integrated location-based pet search on the homepage.",
      "User authentication and profile management.",
      "CRUD operations for pet listings and adoptions.",
      "Used MongoDB for storing user and pet data.",
      "Responsive UI built with Tailwind CSS and React.",
    ],
  },
  priority: 9,
}
,
  {
  id: "face-track-project",
  companyName: "Face Track",
  type: "Personal",
  category: ["Full Stack", "Web Dev"],
  shortDescription:
    "Real-time face detection and tracking web app using TensorFlow and OpenCV APIs.",
  githubLink: "https://github.com/shivengoomer/face-track-project",
  techStack: ["TensorFlow", "OpenCV", "Python", "Flask", "HTML", "JavaScript"],
  startDate: new Date("2024-06-01"),
  endDate: new Date("2024-07-01"),
  companyLogoImg: "/projects/face-track/logo.png",
  pagesInfoArr: [
    {
      title: "Face Track Page",
      description:
        "Web interface for real-time webcam-based face detection and tracking powered by TensorFlow and OpenCV APIs.",
      imgArr: ["/projects/face-track/facetrack.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "Developed a web-based face tracking app using TensorFlow and OpenCV APIs for real-time face detection through webcam input.",
      "Integrated Flask as a lightweight backend to serve video frames and process detection results in real-time.",
      "Designed a clean and responsive web UI to visualize bounding boxes and detected faces directly in the browser.",
    ],
    bullets: [
      "Used TensorFlow for face recognition and OpenCV for video frame processing.",
      "Built Flask-based backend to stream real-time video detection.",
      "Interactive web interface to view live bounding boxes.",
      "Lightweight deployment suitable for browser access.",
    ],
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
    pagesInfoArr: [
      {
        title: "Homepage",
        description:
          "Homepage featuring product listings, categories, and responsive search bar.",
        imgArr: ["/projects/amazon/homepage.png"],
      },
      {
        title: "Cart",
        description:
          "Shopping cart page to manage added items with quantity and price calculations.",
        imgArr: ["/projects/amazon/cart.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: ["Practiced building e-commerce layout and cart logic."],
      bullets: ["Product grid", "Cart logic", "Responsive design"],
    },
    priority: 11,
  },
  {
  id: "n8n-drive-whatsapp",
  companyName: "Drive to WhatsApp Automation",
  type: "Personal",
  category: ["Automation", "Backend", "n8n", ],
  shortDescription:
    "Automated workflow using n8n and Baileys to send Google Drive files directly to WhatsApp via webhook.",
  githubLink: "https://github.com/shivengoomer/n8n-drive-whatsapp", // add if uploaded
  techStack: ["n8n", "Baileys", "Node.js", "Google Drive API", "Webhook"],
  startDate: new Date("2025-10-01"),
  endDate: new Date("2025-10-05"),
  companyLogoImg: "/projects/n8n-drive/logo.png",
  pagesInfoArr: [
    {
      title: "Automation Flow",
      description:
        "Workflow built in n8n that connects Google Drive and WhatsApp using Baileys Webhook. It fetches Drive files and sends details directly to WhatsApp chats.",
      imgArr: ["/projects/n8n-drive/flow.png"],
    },
    {
      title: "WhatsApp Integration",
      description:
        "Messages and Drive file links are automatically sent to users or groups through the Baileys WhatsApp API, with status logs visible in n8n.",
      imgArr: ["/projects/n8n-drive/whatsapp.png"],
    },
  ],
  descriptionDetails: {
    paragraphs: [
      "Developed an automation workflow in n8n that integrates Google Drive with WhatsApp using the Baileys library and webhook triggers.",
      "The system checks Drive for files or folders and sends the details, including file links, directly to WhatsApp chats through Baileys.",
      "This setup enables seamless communication and file sharing without manual intervention, enhancing productivity and real-time access.",
    ],
    bullets: [
      "Integrated Google Drive API and Baileys WhatsApp library.",
      "Automated message delivery using n8n webhook triggers.",
      "Dynamic file search and sharing workflow.",
      "Custom logic for file type detection and smart responses.",
    ],
  },
  priority: 3,
},
];

export const featuredProjects = Projects.sort(
  (a, b) => a.priority - b.priority
).slice(0, 3);
