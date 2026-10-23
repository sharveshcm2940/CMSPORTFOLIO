export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  repoName: string;
  category: string;
  description: string;
  details: string[];
  technologies: string[];
  recognition?: string;
  featured?: boolean;
  hasLiveDashboard?: boolean;
  projectUrl?: string;
  sourceUrl: string;
  screenshotUrl?: string;
  systemOverview: {
    inputLayer: string;
    processingLayer: string;
    outputLayer: string;
  };
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface AchievementItem {
  title: string;
  distinction: string;
  description?: string;
}

export interface CertificationItem {
  issuer: string;
  subject: string;
}

export const PERSONAL_INFO = {
  name: 'C. M. Sharvesh',
  shortName: 'Sharvesh',
  roleLine: 'AI/ML ENGINEER · FULL-STACK DEVELOPER',
  headlineLine1: 'I build the systems',
  headlineLine2: 'that make businesses work.',
  heroIntro:
    "I'm Sharvesh, an Information Technology student exploring the intersection of machine learning, software engineering, and useful digital products.",
  location: 'Chennai, Tamil Nadu, India',
  locationShort: 'Based in Chennai, India',
  availability: 'Open to opportunities',
  showAvailability: true,
  email: 'sharveshcm29@gmail.com',
  phone: '+91 63835 53774',
  phoneHref: 'tel:+916383553774',
  linkedinUrl: 'https://linkedin.com/in/c-m-sharvesh-847066332',
  linkedinLabel: 'linkedin.com/in/c-m-sharvesh-847066332',
  githubUrl: 'https://github.com/sharveshcm2940',
  githubLabel: 'github.com/sharveshcm2940',
  existingPortfolioUrl: 'https://sharveshcm-portfolio.vercel.app',
  objective:
    'Seeking AI/ML engineering opportunities where I can combine machine learning, backend development, and product engineering to build useful real-world applications.',
};

export const SELECTED_PROJECTS: ProjectItem[] = [
  {
    id: 'hailmary',
    index: '01',
    name: 'HAILMARY',
    repoName: 'sharveshcm2940/HAILMARY-TB',
    category: 'AI / Machine Learning · Mobile Application',
    description:
      'An AI-powered tuberculosis screening application connecting a Flutter mobile interface with a PyTorch classification model through REST APIs.',
    details: [
      'Built a cross-platform Flutter application.',
      'Trained and integrated a PyTorch-based classification model.',
      'Connected the mobile interface to backend APIs for inference and prediction delivery.',
    ],
    technologies: ['PyTorch', 'Machine Learning', 'Flutter', 'REST APIs'],
    recognition: 'Runner-up · RotatechX Hackathon',
    featured: true,
    hasLiveDashboard: false,
    sourceUrl: 'https://github.com/sharveshcm2940/HAILMARY-TB',
    systemOverview: {
      inputLayer: 'Flutter mobile interface for structured screening input and image submission',
      processingLayer: 'REST API layer handling request serialization and PyTorch model inference',
      outputLayer: 'Structured classification response delivered back to the mobile client',
    },
  },
  {
    id: 'deal-flow-360',
    index: '02',
    name: 'Deal Flow 360',
    repoName: 'sharveshcm2940/ALS-CRM',
    category: 'Business Software · Monitoring Systems',
    description:
      'A centralized B2B monitoring system designed to organize business workflow data and make operational information easier to track.',
    details: [
      'Structured operational and business workflow records into a centralized tracking interface.',
      'Designed clear status views to reduce fragmentation across day-to-day B2B pipelines.',
      'Focused on data organization, readable hierarchies, and reliable system structure.',
    ],
    technologies: ['React', 'Express', 'MySQL', 'Data Monitoring', 'Software Systems Design'],
    hasLiveDashboard: true,
    sourceUrl: 'https://github.com/sharveshcm2940/ALS-CRM',
    systemOverview: {
      inputLayer: 'B2B workflow records, pipeline checkpoints, and operational updates',
      processingLayer: 'Centralized state organization and structured status indexing',
      outputLayer: 'Unified operational monitoring view for tracking active business workflows',
    },
  },
  {
    id: 'law-crm',
    index: '03',
    name: 'Law CRM',
    repoName: 'sharveshcm2940/LAW-CRM',
    category: 'Full-Stack Development · CRM',
    description:
      'A legal client and case management application designed to centralize client information, case records, documents, and everyday administrative workflows.',
    details: [
      'Modeled relational entities linking legal clients, active case files, and associated documents.',
      'Built administrative views for organizing case timelines, notes, and client communications.',
      'Streamlined routine record lookup and status updates within a single web application.',
    ],
    technologies: ['React', 'Node.js', 'Relational Data Modeling', 'REST APIs'],
    hasLiveDashboard: true,
    sourceUrl: 'https://github.com/sharveshcm2940/LAW-CRM',
    systemOverview: {
      inputLayer: 'Client intake profiles, legal case metadata, and document records',
      processingLayer: 'Relational schema mapping clients to cases, hearings, and administrative tasks',
      outputLayer: 'Centralized workspace for legal case lookup and administrative management',
    },
  },
  {
    id: 'scholarhive',
    index: '04',
    name: 'ScholarHive',
    repoName: 'sharveshcm2940/ScholarHive',
    category: 'Web Development · Education',
    description:
      'A Flask and SQLite-based notes-sharing platform that helps students upload, organize, and browse academic notes by subject.',
    details: [
      'Developed backend routes and request handlers using Python and Flask.',
      'Designed a SQLite relational schema to index uploaded study materials by subject and topic.',
      'Built clean HTML and CSS interfaces for browsing, filtering, and accessing shared notes.',
    ],
    technologies: ['Flask', 'SQLite', 'HTML', 'CSS', 'API Routing'],
    hasLiveDashboard: true,
    sourceUrl: 'https://github.com/sharveshcm2940/ScholarHive',
    systemOverview: {
      inputLayer: 'Student-uploaded academic notes categorized by course subject and semester',
      processingLayer: 'Flask application routes paired with SQLite relational indexing',
      outputLayer: 'Organized subject repository for browsing and retrieving study materials',
    },
  },
];

export const SECONDARY_PROJECTS = [
  {
    id: 'apartment-management-system',
    index: '05',
    name: 'Apartment Management System',
    repoName: 'sharveshcm2940/Apartment-management',
    category: 'Web Application · Property Operations',
    description:
      'A web application for resident record management and maintenance-request tracking.',
    technologies: ['Web Development', 'Relational Databases', 'CRUD Workflows'],
    sourceUrl: 'https://github.com/sharveshcm2940/Apartment-management',
    hasLiveDashboard: true,
  },
];

export const ABOUT_PARAGRAPHS: string[] = [
  "I'm pursuing a B.Tech in Information Technology at Sri Venkateswara College of Engineering, Chennai. My work spans machine learning integration, backend APIs, and full-stack application development.",
  'I enjoy understanding how individual pieces of a system fit together — from a model producing an inference to an application turning that result into something useful.',
  "I'm continuing to develop my engineering fundamentals while building projects that connect technical learning with practical problems.",
];

export const TECHNICAL_SKILLS: SkillGroup[] = [
  {
    category: 'AI / ML',
    items: [
      'PyTorch',
      'Machine Learning',
      'Model Training and Integration',
      'Model Deployment through REST APIs',
    ],
  },
  {
    category: 'Programming',
    items: ['Python', 'Java', 'C', 'C++,', 'JavaScript', 'PHP'].map((s) => s.replace(',', '')),
  },
  {
    category: 'Web and APIs',
    items: ['React', 'Flask', 'HTML', 'CSS', 'REST APIs'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'SQLite'],
  },
  {
    category: 'Mobile',
    items: ['Flutter'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'PyCharm', 'Android Studio'],
  },
];

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    role: 'Web Developer Intern',
    company: 'JE Infonet',
    period: 'December 2025 – January 2026',
    location: 'Chennai, India',
    highlights: [
      'Built responsive web pages using HTML, CSS, and JavaScript.',
      'Integrated frontend components with a Flask backend.',
      'Performed functional testing and debugging.',
      'Collaborated with a development team using Git.',
    ],
  },
];

export const ACHIEVEMENTS_LIST: AchievementItem[] = [
  {
    title: 'RotatechX Hackathon',
    distinction: 'Runner-up',
    description:
      'Recognized for building and presenting an AI-powered tuberculosis screening application.',
  },
  {
    title: 'Odoo National Hackathon',
    distinction: 'Finalist',
  },
];

export const EDUCATION_INFO = {
  institution: 'Sri Venkateswara College of Engineering, Chennai',
  degree: 'B.Tech, Information Technology',
  period: '2024–2028',
  semester: 'V',
  cgpa: '7.07 / 10.0',
};

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    issuer: 'Infosys Springboard',
    subject: 'C, C++, MySQL',
  },
  {
    issuer: 'HackerRank',
    subject: 'Java (Basic)',
  },
];
