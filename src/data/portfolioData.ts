export interface ProjectItem {
  id: string
  title: string
  category: string
  purpose: string
  description: string
  technologies: string[]
  status: 'In Progress' | 'Academic Project' | 'Active Development' | 'Prototype'
  image?: string
  link?: string
  isExternal?: boolean
}

export interface SkillCategory {
  title: string
  skills: string[]
  note?: string
}

export interface AchievementItem {
  id: string
  title: string
  category: string
  description: string
  tag: string
}

export interface ProfileData {
  name: string
  headline: string
  supportingLabel: string
  education: {
    institution: string
    degree: string
    branch: string
    year: string
    location: string
  }
  bio: string[]
  skills: SkillCategory[]
  areasOfInterest: string[]
  projects: ProjectItem[]
  achievements: AchievementItem[]
  creatorMilestone: {
    title: string
    metric: string
    label: string
    subLabel: string
    note: string
  }
  contact: {
    email: string
    github: string
    instagram: string
  }
}

export const PORTFOLIO_DATA: ProfileData = {
  name: 'Jai Avivesh',
  headline: 'Engineering Intelligence. Designing Experiences.',
  supportingLabel: 'AI/ML Engineer in the Making · Developer · Creative Problem-Solver',
  education: {
    institution: 'JK Lakshmipat University',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering (AI/ML)',
    year: 'Second Year',
    location: 'Jaipur, India',
  },
  bio: [
    "I'm a second-year B.Tech student specializing in Computer Science and Artificial Intelligence & Machine Learning at JK Lakshmipat University in Jaipur. I'm passionate about bridging the gap between technology and design, combining programming logic with creative thinking to explore new ways of solving problems.",
    "My interests span artificial intelligence, web and app development, backend systems, and immersive 3D web experiences. Alongside programming in Python, C, C++, and Java, I explore frontend development with React and JavaScript and creative tools such as Figma, Adobe Premiere Pro, and After Effects.",
    "I'm currently strengthening my Python, machine learning, and data structures and algorithms foundations. My goal is to develop intelligent, user-centric solutions that combine technical depth with thoughtful visual design.",
  ],
  skills: [
    {
      title: 'Programming',
      skills: ['Python', 'C', 'C++', 'Java', 'JavaScript'],
    },
    {
      title: 'Web',
      skills: ['HTML', 'CSS', 'React', 'Git', 'GitHub'],
    },
    {
      title: 'AI / Data',
      skills: ['NumPy', 'Pandas'],
    },
    {
      title: 'Creative Tools',
      skills: ['Figma', 'Adobe Premiere Pro', 'Adobe After Effects'],
    },
  ],
  areasOfInterest: [
    'Artificial Intelligence & Machine Learning',
    'Web Development',
    'App Development',
    'Backend & Systems Architecture',
    'Immersive 3D Web',
    'Creative Coding & Robotics',
  ],
  projects: [
    {
      id: 'school-website',
      title: 'School Website',
      category: 'Institutional Web Architecture',
      purpose: 'Official digital platform and verified academic outcomes engine for Sri Chanakya School in Rajamahendravaram.',
      description: 'Developing a performant, accessible website architecture with verified Class 10 academic showcase, private admissions pipeline, WCAG 2.2 AA accessibility standards, and administrative notice publishing.',
      technologies: ['Astro', 'TypeScript', 'Tailwind CSS', 'Lenis', 'GSAP'],
      status: 'In Progress',
    },
    {
      id: 'railway-reservation',
      title: 'Railway Reservation System',
      category: 'Database Management Systems',
      purpose: 'Relational database academic system managing train schedules, passenger seat quotas, and transaction integrity.',
      description: 'Engineered an academic DBMS solution focusing on normalized relational schemas, multi-tier passenger seat allocation, concurrency constraint handling, and automated ticket cancellation workflows.',
      technologies: ['Python', 'MySQL', 'Relational Database', 'C++'],
      status: 'Academic Project',
    },
  ],
  achievements: [
    {
      id: 'cbse-chess',
      title: 'CBSE Chess Clusters South Zone 2',
      category: 'Strategic Leadership',
      description: 'Team leader in the CBSE Chess Clusters South Zone 2 tournament; team placed in the top 15.',
      tag: 'Top 15 Finish',
    },
    {
      id: 'sih-hackathon',
      title: 'Smart India Hackathon',
      category: 'Engineering & Innovation',
      description: 'Participated in Smart India Hackathon (SIH) in 2025 and 2026, developing technology solutions for national-scale problem statements.',
      tag: '2025 · 2026 Participant',
    },
  ],
  creatorMilestone: {
    title: 'FORMER YOUTUBE CREATOR',
    metric: '~2K',
    label: 'PEAK SUBSCRIBERS',
    subLabel: '~1.6K Following Inactive Period',
    note: 'Approximate, owner-reported past milestone from earlier YouTube channel content creation.',
  },
  contact: {
    email: 'jaiavivesh@gmail.com',
    github: 'https://github.com/Mysticjai',
    instagram: 'https://www.instagram.com/mystic_jai/?hl=en',
  },
}
