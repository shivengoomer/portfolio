import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "Docker",
    description:
      "Containerize apps for portability, easy deployment, and efficient scaling.",
    rating: 4,
    icon: Icons.docker,
  },
  {
    name: "AWS",
    description:
      "Utilize Amazon Web Services to build and deploy scalable, reliable, and secure applications.",
    rating: 4,
    icon: Icons.amazonaws,
  },
  {
    name: "Git ",
    description:
      "Version control and automate deployments with Git, pipelines, and CI/CD workflows.",
    rating: 4,
    icon: Icons.gitBranch,
  },
  {
    name: "Next.js",
    description:
      "Effortlessly build dynamic apps with routing, layouts, loading UI, and API routes.",
    rating: 5,
    icon: Icons.nextjs,
  },
  {
    name: "React",
    description:
      "Craft interactive user interfaces using components, state, props, and virtual DOM.",
    rating: 5,
    icon: Icons.react,
  },

  {
    name: "Node.js",
    description:
      "Run JavaScript on the server side, enabling dynamic and responsive applications.",
    rating: 5,
    icon: Icons.nodejs,
  },
  {
    name: "Express.js",
    description:
      "Build web applications and APIs quickly using a fast, unopinionated Node.js framework.",
    rating: 5,
    icon: Icons.express,
  },
  {
    name: "TypeScript",
    description:
      "Enhance JavaScript with static types, making code more understandable and reliable.",
    rating: 5,
    icon: Icons.typescript,
  },
  {
    name: "JavaScript",
    description:
      "Create interactive and dynamic web experiences with the versatile scripting language.",
    rating: 5,
    icon: Icons.javascript,
  },
  {
    name: "Python",
    description:
      "Write efficient scripts, automation tools, and data-driven apps with Python’s rich ecosystem.",
    rating: 4,
    icon: Icons.python // generic code/AI icon since no specific Python icon was imported
  },
  {
    name: "Java",
    description:
      "Develop reliable, object-oriented applications and backend systems with Java.",
    rating: 4,
    icon: Icons.java,
  },
  {
    name: "C++",
    description:
      "Implement high-performance applications and system-level solutions with C++.",
    rating: 3,
    icon: Icons.cpp,
  },
  {
    name: "C",
    description:
      "Understand low-level programming and build system-level applications using C.",
    rating: 3,
    icon: Icons.javascript,
  },
  {
    name: "PostgreSQL",
    description:
      "Design and query relational databases with advanced SQL features and reliability.",
    rating: 4,
    icon: Icons.postgres,
  },
  {
    name: "MongoDB",
    description:
      "Store and retrieve data seamlessly with a flexible and scalable NoSQL database.",
    rating: 5,
    icon: Icons.mongodb,
  },
  {
    name: "MySQL",
    description:
      "Manage and organize relational databases efficiently for data-driven applications.",
    rating: 3,
    icon: Icons.mysql,
  },
  {
    name: "Prisma ORM",
    description:
      "Model and access databases in a type-safe way with the modern Prisma ORM.",
    rating: 4,
    icon: Icons.pyramid,
  },
  {
    name: "Tailwind CSS",
    description:
      "Design beautiful, modern websites faster with a utility-first CSS framework.",
    rating: 5,
    icon: Icons.tailwindcss,
  },
  {
    name: "AI & APIs",
    description:
      "Integrate AI models and APIs such as Groq, Gemini, and Postman for advanced features.",
    rating: 4,
    icon: Icons.brain,
  },
  {
    name: "Flask",
    description:
      "Build lightweight backend services and APIs with the Python Flask microframework.",
    rating: 3,
    icon: Icons.flask,
  },
  {
    name: "Netlify",
    description:
      "Deploy modern frontend apps easily with automated builds and global CDN.",
    rating: 4,
    icon: Icons.netlify,
  },
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
