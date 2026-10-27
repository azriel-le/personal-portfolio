import leaveSystemImg from '../assets/images/admindashboard.png';
import gameZoneImg from '../assets/images/Game Zone.png';
import freelancerImg from '../assets/images/Freelancer.png';
import craftHubImg from '../assets/images/project_ethio_craft_hub.jpg';
import clearanceImg from '../assets/images/project_university_clearance.jpg';

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  features: string[];
  architecture: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: string; // e.g. "Core Expertise", "Proficient", "Active Growth"
    description: string;
    tag: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: 'education' | 'project' | 'milestone' | 'goal';
  description: string;
  achievements: string[];
  skills: string[];
}

export const PERSONAL_INFO = {
  name: "Zekarias Ali",
  title: "Software Engineer | Frontend Developer | Aspiring Backend Engineer",
  shortTitle: "Software Engineer & Creative Developer",
  education: "B.Sc. in Software Engineering, Wolkite University",
  university: "Wolkite University",
  location: "Ethiopia",
  availability: "Available for Full-time Roles & High-Impact Projects",
  email: "zekariasali4@gmail.com",
  phone: "0986925214",
  phoneFormatted: "+251 986 925 214",
  github: "https://github.com/azriel-le",
  linkedin: "https://www.linkedin.com/in/zekarias-ali/",
  bio: "Software Engineer with a strong foundation in modern web engineering, interactive frontend architecture, and robust system design. Graduated from Wolkite University with a B.Sc. in Software Engineering, passionate about engineering products that combine visual finesse with scalable architecture.",
  philosophy: [
    {
      title: "Architecture & Scalability First",
      description: "Clean code structure, modular component design, and predictable state management form the backbone of every project I engineer."
    },
    {
      title: "Motion with Purpose",
      description: "Animations shouldn't be frivolous eye candy. Motion serves as an intuitive feedback loop that guides focus and delights users."
    },
    {
      title: "Continuous Technical Mastery",
      description: "From deeply understanding browser rendering pipelines to building efficient backend APIs, engineering is a continuous craft."
    }
  ],
  stats: [
    { label: "Degree Earned", value: "B.Sc. Software Eng." },
    { label: "Core Expertise", value: "Full-Stack Web" },
    { label: "Primary Focus", value: "React & Node.js" },
    { label: "Location", value: "Ethiopia" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "leave-management",
    number: "01",
    title: "Employee Leave Management System",
    category: "Full-Stack Web Application",
    tagline: "Streamlined enterprise leave workflows, role-based governance & real-time analytics",
    description: "A comprehensive web application designed to digitize organizational leave requests, approvals, department balance tracking, and role-based administrative management.",
    longDescription: "The Employee Leave Management System resolves enterprise administrative bottlenecks by offering automated leave request routing, real-time quota calculations, multi-level manager approvals, and comprehensive PDF/CSV report generation. Built with a responsive React frontend and a structured RESTful backend architecture.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "REST API"],
    image: leaveSystemImg,
    features: [
      "Role-Based Access Control (Employee, Department Manager, HR Admin)",
      "Automated Leave Balance Deductions & Quotas",
      "Interactive Calendar Overview of Team Availability",
      "Approval & Rejection Workflows with Notification Trail",
      "Comprehensive Analytics Dashboard for HR Auditing"
    ],
    architecture: [
      "Modular React component structure with custom hooks for data fetching",
      "RESTful API design with JWT-based session security",
      "Normalized relational database schema with transactional integrity",
      "Optimized query handlers for fast time-range report generation"
    ],
    githubUrl: "https://github.com/azriel-le/leave-management-system",
    featured: true
  },
  {
    id: "game-zone",
    number: "02",
    title: "Game Zone Management System",
    category: "Native Android Mobile Application",
    tagline: "Real-time session tracking, automated billing & venue analytics built natively for Android",
    description: "A native Android mobile application built with Kotlin for gaming lounge operators to manage PlayStation console sessions, pool table bookings, automated billing, and multi-branch revenue tracking in real time.",
    longDescription: "Game Zone Management System is a native Android application engineered in Kotlin, designed to give gaming venue operators full control over their business operations from their mobile devices. The app delivers real-time console and pool table session monitoring with automated timer-based billing, dynamic pricing configurations, snack inventory management, and comprehensive daily revenue reporting across multiple branches — all through an intuitive Material Design 3 interface optimized for fast, one-handed operation.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM Architecture", "Room Database", "Coroutines & Flow", "Material Design 3", "Hilt DI"],
    image: gameZoneImg,
    features: [
      "Real-Time Session Monitoring for PlayStation Consoles & Pool Tables",
      "Automated Timer-Based Billing with Configurable Hourly Rates",
      "Multi-Branch Revenue Dashboard with Daily & Monthly Analytics",
      "Dynamic Pricing Rules for Peak Hours, Off-Peak & VIP Sections",
      "Snack & Beverage Inventory Tracking with Low-Stock Alerts"
    ],
    architecture: [
      "MVVM architecture with clean separation of UI, domain, and data layers",
      "Jetpack Compose declarative UI with Material Design 3 theming",
      "Room persistence library for offline-first local data storage",
      "Kotlin Coroutines & StateFlow for reactive, lifecycle-aware data streams"
    ],
    githubUrl: "https://github.com/azriel-le/game-zone-management",
    featured: true
  },
  {
    id: "freelancer-connect",
    number: "03",
    title: "Freelancer Connect Ethiopia",
    category: "Full-Stack Web Application",
    tagline: "Location-based freelance marketplace connecting Ethiopian clients with nearby professionals",
    description: "A location-based freelance marketplace connecting Ethiopian customers with nearby skilled professionals for reliable, convenient, and accessible local services.",
    longDescription: "Freelancer Connect Ethiopia bridges the gap between local service providers and clients through geolocation discovery, categorized service listings, transparent customer reviews, and direct client communication channels.",
    technologies: ["React", "TypeScript", "Next.js", "NestJS", "MySQL", "Prisma", "Tailwind CSS"],
    image: freelancerImg,
    features: [
      "Connected customers with nearby service providers based on location and service category",
      "Enabled users to discover professionals, communicate, and request services",
      "Designed a streamlined platform to improve access to local freelance services",
      "Location-aware search with real-time distance sorting and filtering",
      "Role-specific profiles with verified skills and client ratings"
    ],
    architecture: [
      "Next.js and React frontend with dynamic geolocation and search filtering",
      "NestJS backend architecture with modular dependency injection",
      "Prisma ORM data access layer with type-safe MySQL queries",
      "RESTful communication layer for user discovery and service bookings"
    ],
    githubUrl: "https://github.com/azriel-le/freelancer-connect-ethiopia",
    featured: true
  },
  {
    id: "ethio-craft-hub",
    number: "04",
    title: "Ethio Craft Hub",
    category: "Full-Stack Booking & E-Commerce Platform",
    tagline: "Cultural tourism festival bookings, travel stays & traditional craft marketplace",
    description: "A cultural tourism and e-commerce platform showcasing Ethiopia’s rich heritage through festival and tour bookings, accommodation reservations, and traditional cultural products.",
    longDescription: "Ethio Craft Hub unites heritage travel with cultural commerce. It provides tourists with centralized reservations for iconic celebrations like Timket and Irreecha, historic destination tours, hotel lodging, and an authentic artisan marketplace.",
    technologies: ["React", "TypeScript", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    image: craftHubImg,
    features: [
      "Enabled tourists to explore and book cultural festivals, tours, and heritage destinations, including Timket, Irreecha, and Lalibela",
      "Integrated accommodation booking for hotels and other travel stays",
      "Connected cultural experiences with an online marketplace for authentic Ethiopian crafts and traditional products",
      "Interactive itinerary schedule and cultural calendar exploration",
      "E-commerce cart, checkout flow, and artisan product catalog"
    ],
    architecture: [
      "Next.js App Router with server-side rendering for rich cultural content and SEO",
      "Document-oriented MongoDB database schema for heterogeneous crafts and tour packages",
      "RESTful booking engine handling tour reservation schedules and room availability",
      "Modular Tailwind CSS design system with Ethiopian aesthetic accents"
    ],
    githubUrl: "https://github.com/azriel-le/ethio-craft-hub",
    featured: true
  },
  {
    id: "university-clearance",
    number: "05",
    title: "University Clearance Management System",
    category: "Full-Stack Web Application",
    tagline: "Digital university student clearance workflows & multi-department approvals",
    description: "A web-based university clearance platform designed to streamline the student clearance process after completing an academic year or program by coordinating approvals across multiple university departments.",
    longDescription: "University Clearance Management System eliminates manual paper sign-offs by automating verification across library, dormitory, sports department, finance, and registrar offices with real-time clearance status tracking.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "REST API"],
    image: clearanceImg,
    features: [
      "Digitized student clearance requests and departmental approval workflows",
      "Enabled departments to review, verify, and update student clearance status",
      "Improved process transparency and tracking of outstanding clearance requirements",
      "Multi-department access portals for Library, Dormitory, Finance, and Registrar",
      "Instant certificate generation upon final administrative sign-off"
    ],
    architecture: [
      "React single-page application with responsive student and faculty dashboards",
      "Express.js RESTful API with departmental role authorization middleware",
      "Relational PostgreSQL schema with foreign-key constraints for student clearance stages",
      "Optimized query indexes ensuring sub-second workflow status lookups"
    ],
    githubUrl: "https://github.com/azriel-le/university-clearance-system",
    featured: true
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Engineering",
    description: "Crafting pixel-perfect, accessible, and high-performance user interfaces.",
    iconName: "Layout",
    skills: [
      { name: "React", level: "Core Expertise", description: "Hooks, custom state management, performance optimization, and modular architecture.", tag: "Primary" },
      { name: "Next.js", level: "Proficient", description: "App Router, SSR, SSG, route handlers, and SEO optimizations.", tag: "Framework" },
      { name: "TypeScript", level: "Core Expertise", description: "Strict typing, generic abstractions, interface design, and runtime safety.", tag: "Language" },
      { name: "JavaScript (ES6+)", level: "Core Expertise", description: "Asynchronous patterns, DOM APIs, event loop, and modern standards.", tag: "Language" },
      { name: "Tailwind CSS", level: "Core Expertise", description: "Utility-first architecture, custom design systems, responsive layouts, dark mode.", tag: "Styling" },
      { name: "HTML5 & CSS3", level: "Core Expertise", description: "Semantic markup, accessibility (a11y), flexbox, grid, CSS custom properties.", tag: "Standard" }
    ]
  },
  {
    category: "Backend & Systems",
    description: "Building secure, reliable, and scalable server-side services and APIs.",
    iconName: "Server",
    skills: [
      { name: "Node.js", level: "Proficient", description: "Event-driven runtime, core modules, stream processing, package management.", tag: "Runtime" },
      { name: "Express.js", level: "Proficient", description: "RESTful routing, middleware pipelines, error handling, session management.", tag: "Framework" },
      { name: "REST APIs", level: "Core Expertise", description: "Resource modeling, HTTP standards, authentication headers, JSON payloads.", tag: "Architecture" },
      { name: "Authentication & AuthZ", level: "Proficient", description: "JWT tokens, password hashing, session cookies, role-based permissions.", tag: "Security" }
    ]
  },
  {
    category: "Databases & Storage",
    description: "Designing normalized relational schemas and efficient database queries.",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL", level: "Proficient", description: "Relational schema design, indexed queries, foreign keys, transactions.", tag: "Relational" },
      { name: "MySQL", level: "Proficient", description: "Table structures, stored procedures, multi-table joins, performance tuning.", tag: "Relational" },
      { name: "Database Design", level: "Core Expertise", description: "ER modeling, 3NF normalization, relationship cardinality, indexing strategy.", tag: "Methodology" }
    ]
  },
  {
    category: "Tools & Ecosystem",
    description: "Modern development workflows, version control, and platform tooling.",
    iconName: "Wrench",
    skills: [
      { name: "Git & GitHub", level: "Core Expertise", description: "Branching strategies, pull requests, rebase workflows, code review.", tag: "VCS" },
      { name: "Vite & Build Tools", level: "Core Expertise", description: "Fast HMR configuration, module bundling, asset pipeline tuning.", tag: "Build" },
      { name: "Android Studio", level: "Familiar", description: "Mobile environment setup, Gradle builds, emulator testing, basic Kotlin.", tag: "Mobile" },
      { name: "Development Workflows", level: "Core Expertise", description: "Modular code organisation, DRY principles, linting, code documentation.", tag: "Workflow" }
    ]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "degree",
    period: "Graduated",
    title: "B.Sc. in Software Engineering",
    organization: "Wolkite University",
    location: "Ethiopia",
    type: "education",
    description: "Completed comprehensive software engineering curriculum covering algorithms, data structures, software architecture, object-oriented design, database management, web systems, and project management.",
    achievements: [
      "Solid foundation in computer science theory and practical software lifecycle",
      "Designed and developed full-stack capstone projects with team collaboration",
      "Focus on clean architecture, object-oriented principles, and software quality assurance"
    ],
    skills: ["Software Engineering", "Data Structures & Algorithms", "Database Design", "OOP"]
  },
  {
    id: "leave-system-project",
    period: "Featured Project",
    title: "Employee Leave Management System",
    organization: "Personal Engineering Portfolio",
    location: "Ethiopia",
    type: "project",
    description: "Architected and engineered a web-based corporate leave administration platform to automate employee time-off requests, balances, and managerial approval hierarchies.",
    achievements: [
      "Engineered role-based access control (RBAC) protecting sensitive HR data",
      "Built responsive analytical dashboard charts tracking department leave trends",
      "Implemented seamless RESTful API communication between React and Express"
    ],
    skills: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL"]
  },
  {
    id: "game-zone-project",
    period: "Featured Project",
    title: "Game Zone Management System",
    organization: "Business Solution Development",
    location: "Ethiopia",
    type: "project",
    description: "Developed a mobile-first operations and financial management application for entertainment lounges, enabling real-time timer tracking and revenue reporting.",
    achievements: [
      "Designed touch-friendly mobile interface for fast venue floor management",
      "Created automated billing algorithm calculating precise hourly match usage",
      "Structured multi-branch database queries for daily financial reconciliation"
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "MySQL", "Express"]
  },
  {
    id: "backend-expansion",
    period: "Ongoing Journey",
    title: "Full-Stack Mastery & Aspiring Backend Engineer",
    organization: "Continuous Growth",
    location: "Ethiopia",
    type: "milestone",
    description: "Deepening technical expertise in high-concurrency backend architectures, microservices, database query optimization, and advanced distributed systems.",
    achievements: [
      "Mastering advanced PostgreSQL indexing, query planning, and ORM abstractions",
      "Studying cloud architecture patterns, microservice boundaries, and caching layers",
      "Building production-grade full-stack applications with Next.js and Node.js"
    ],
    skills: ["Backend Architecture", "PostgreSQL", "API Security", "System Scaling"]
  }
];
