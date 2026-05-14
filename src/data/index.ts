// ─── Types ───────────────────────────────────────────────────────────────────

export interface NavLink {
  name: string;
  link: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface SkillItem {
  name: string;
  iconPath?: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface SocialLink {
  name: string;
  url: string;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { name: "Projects", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "rental-housing",
    title: "Rentiful",
    subtitle: "Full-Stack Cloud-Deployed Rental Marketplace",
    summary:
      "Built and deployed a full-stack rental platform on AWS supporting scalable property listing and user workflows, with a modern UI and server-side rendering via Next.js.",
    tags: ["Next.js", "Tailwind CSS", "AWS", "Shadcn UI", "Prisma", "Node.js", "Redux"],
    image: "/images/rentiful.png",
    imageAlt: "Rentiful rental housing platform",
    repoUrl: "https://github.com/kevjiang64/Rentiful",
  },
  {
    id: "travel-planner",
    title: "PlanForMe",
    subtitle: "AI-Powered Travel Itinerary Generator",
    summary:
      "Developed an AI-powered travel itinerary generator using the Gemini API to create personalized vacation plans, with real-time data and cloud hosting on GCP.",
    tags: ["React", "Firebase", "Tailwind CSS", "Gemini API", "GCP"],
    image: "/images/planforme.png",
    imageAlt: "PlanForMe AI travel planner",
    liveUrl: "https://plan-for-me.vercel.app",
    repoUrl: "https://github.com/kevjiang64/PlanForMe",
  },
  {
    id: "tennis-predictor",
    title: "Tennis Match Winner Predictor",
    subtitle: "Machine Learning & Big Data",
    summary:
      "Built a machine learning model using logistic regression and Markov chain analysis to predict tennis match outcomes, leveraging an 800 MB dataset of 2M+ matches processed with PySpark.",
    tags: ["Python", "Scikit-learn", "NumPy", "PySpark", "Pandas"],
    image: "/images/tennis-predictor.png",
    imageAlt: "Tennis Match Winner Predictor ML model",
    repoUrl: "https://github.com/kevjiang64/SOEN471",
  },
  {
    id: "chatty",
    title: "Chatty",
    subtitle: "Full-Stack Real-Time Chat Application",
    summary:
      "A full-stack chat platform with WebSocket-powered live messaging, online presence indicators, and a clean responsive UI. Built with JWT authentication and persistent message history.",
    tags: ["React", "TypeScript", "Node.js", "Socket.io", "TailwindCSS", "MongoDB"],
    image: "/images/chatty-new.png",
    imageAlt: "Chatty real-time chat application",
    liveUrl: "https://chatty-ze95.onrender.com/",
    repoUrl: "https://github.com/kevjiang64/Chatty",
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const expCards: Experience[] = [
  {
    id: "trinmax",
    company: "TriNmax",
    role: "Software Developer",
    period: "Oct 2023 – Dec 2023",
    responsibilities: [
      "Developed billing components and unit/integration test suites within an invoice processing solution integrated with IBM Maximo Application Suite, using Angular and Jest, reducing production load by 25%.",
      "Designed reusable Terraform infrastructure modules (IaC) to provision and manage Google Cloud Platform (GCP) and Dockerized resources, improving consistency and CI/CD deployment efficiency.",
    ],
  },
  {
    id: "broadsign",
    company: "Broadsign International",
    role: "Software Developer",
    period: "Jan 2022 – Apr 2023",
    responsibilities: [
      "Led end-to-end development of production-grade web dashboards using Vue.js and C# .NET REST API in a microservices architecture, implementing TDD and Docker containerization to deliver scalable solutions supporting 1,000+ active users.",
      "Engineered a custom GitHub Actions workflow to automate code quality gates and PR validations, reducing manual code review effort by 30% and accelerating CI/CD pipeline throughput for a cross-functional team of 10+ engineers.",
      "Designed unit/integrated automated testing suites using Jest, Playwright, and NUnit, delivering 90% test coverage and a 30% reduction in production bugs.",
      "Created comprehensive Datadog and Google Analytics dashboards to monitor frontend performance, user behavior, and application health, enabling real-time analytics that reduced MTTD by 20%.",
    ],
  },
  {
    id: "conova",
    company: "Conova Inc",
    role: "Cloud Developer",
    period: "Jan 2021 – Jan 2022",
    responsibilities: [
      "Managed a serverless GraphQL API architecture leveraging AWS AppSync, AWS Lambda, and AWS DynamoDB, optimizing data fetching patterns to improve data access speeds and reduce latency by 30%.",
      "Streamlined third-party authentication workflows and complex account merging logic by implementing custom Auth0 Actions, enhancing the user onboarding experience.",
      "Optimized platform security by engineering an IP blacklisting service via Amazon Web Application Firewall, mitigating malicious traffic and bot attacks by 20%.",
      "Standardized infrastructure deployment by building reusable AWS CloudFormation templates, ensuring consistent environment provisioning and reducing costs by $1k+ monthly.",
    ],
  },
  {
    id: "consoltec",
    company: "Consoltec",
    role: "Web Developer Intern",
    period: "May 2020 – Sep 2020",
    responsibilities: [
      "Optimized the user interface for a language translation tool using JavaScript, HTML, CSS, and Kendo UI, implementing performance improvements that reduced UI defects by 20%.",
      "Engineered a custom Windows URL protocol handler, enabling deep linking, parameterized launches, input validation, and improved user experience across integrated systems.",
    ],
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React",        iconPath: `${DI}/react/react-original.svg` },
      { name: "Vue.js",       iconPath: `${DI}/vuejs/vuejs-original.svg` },
      { name: "Angular",      iconPath: `${DI}/angularjs/angularjs-original.svg` },
      { name: "Next.js",      iconPath: `${DI}/nextjs/nextjs-original.svg` },
      { name: "Tailwind CSS", iconPath: `${DI}/tailwindcss/tailwindcss-original.svg` },
      { name: "TypeScript",   iconPath: `${DI}/typescript/typescript-original.svg` },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js",    iconPath: `${DI}/nodejs/nodejs-original.svg` },
      { name: "GraphQL",    iconPath: `${DI}/graphql/graphql-plain.svg` },
      { name: "MongoDB",    iconPath: `${DI}/mongodb/mongodb-original.svg` },
      { name: "PostgreSQL", iconPath: `${DI}/postgresql/postgresql-original.svg` },
      { name: "Prisma",     iconPath: `${DI}/prisma/prisma-original.svg` },
      { name: "C# / .NET",  iconPath: `${DI}/dotnetcore/dotnetcore-original.svg` },
    ],
  },
  {
    category: "Tooling & Cloud",
    items: [
      { name: "Git",       iconPath: `${DI}/git/git-original.svg` },
      { name: "Docker",    iconPath: `${DI}/docker/docker-original.svg` },
      { name: "AWS",       iconPath: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
      { name: "GCP",       iconPath: `${DI}/googlecloud/googlecloud-original.svg` },
      { name: "Terraform", iconPath: `${DI}/terraform/terraform-original.svg` },
      { name: "Firebase",  iconPath: `${DI}/firebase/firebase-original.svg` },
      { name: "GitHub",    iconPath: "https://cdn.simpleicons.org/github/d4d4d8" },
      { name: "Datadog",   iconPath: "https://cdn.simpleicons.org/datadog" },
    ],
  },
];

// ─── Social ───────────────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/kevjiang64" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/kevin-jiang-6009/" },
];
