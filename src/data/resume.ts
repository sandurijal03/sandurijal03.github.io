// Shared resume/CV data
export interface Experience {
  id: string
  title: string
  company: string
  location?: string
  duration: string
  description: string
  technologies?: string
  type: 'work' | 'education'
  startDate: string
  endDate: string
}

export interface Skill {
  name: string
  level: number // 1-100
  category: string
  isPrimary?: boolean
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  duration: string
  description: string
  type: 'education'
}

// Personal Information
export const personalInfo = {
  name: 'Sandip Rijal',
  title: 'Senior Software Engineer & Technical Consultant',
  tagline: 'Fullstack Developer and aspiring Data Science and ML Engineer',
  email: 'sandurijal03@hotmail.com',
  location: 'Kathmandu, Nepal',
  github: 'github.com/sandurijal03',
  linkedin: 'linkedin.com/in/sandurijal03',
  website: 'sandurijal03.github.io/portfolio',
}

// Work Experience
export const workExperience: Experience[] = [
  {
    id: 'norbrik-2022',
    title: 'Senior Software Engineer',
    company: 'Norbrik',
    location: 'North Sydney, New South Wales, Australia - Remote',
    duration: 'Mar 2022 - Present',
    startDate: '2022-03',
    endDate: 'Present',
    description:
      'Developing enterprise web applications using .NET Core APIs and React.js frontend. Building SharePoint web parts and components, implementing cloud storage solutions, and working with Azure SQL databases. Leading development of modern web applications with TypeScript and styled-components.',
    technologies:
      'C#, .NET Core, .NET Framework, TypeScript, React.js, Redux.js, SharePoint, Azure SQL, HTML5, styled-components, Bootstrap, Webpack, Cloud Storage',
    type: 'work',
  },
  {
    id: 'ibriz-2021',
    title: 'Blockchain Intern',
    company: 'iBriz.ai',
    location: 'Kathmandu',
    duration: 'Dec 2021 - Feb 2022',
    startDate: '2021-12',
    endDate: '2022-02',
    description:
      'Studied Rust programming from scratch and developed blockchain applications. Built smart contracts using Solana and Anchor framework, created CLI tools for blockchain interaction, and explored Ethereum development. Completed multiple coding challenges and built decentralized applications.',
    technologies:
      'Rust, Solana, Anchor Framework, Smart Contracts, Ethereum, CLI Development, Bash, Blockchain',
    type: 'work',
  },
  {
    id: 'unilink-2021',
    title: 'Full-stack Developer',
    company: 'Unilink Software Pvt. Ltd.',
    location: 'Kathmandu, Bagmati, Nepal',
    duration: 'Jun 2021 - Sep 2021',
    startDate: '2021-06',
    endDate: '2021-09',
    description:
      'Developed full-stack web applications using Node.js with Express.js framework for backend APIs. Built RESTful and GraphQL APIs, implemented frontend using React.js with Redux for state management and Apollo Client for GraphQL integration. Worked with SQL and MongoDB databases.',
    technologies:
      'Node.js, Express.js, React.js, GraphQL, Apollo GraphQL, Redux.js, MongoDB, SQL',
    type: 'work',
  },
  {
    id: 'freelance-2019',
    title: 'Freelance Software Developer',
    company: 'Self-employed',
    location: 'Kathmandu, Bagmati, Nepal',
    duration: 'Apr 2019 - Jun 2021',
    startDate: '2019-04',
    endDate: '2021-06',
    description:
      'Built several fullstack MERN applications with GraphQL APIs. Developed custom solutions for various clients including e-commerce platforms, content management systems, and business automation tools.',
    technologies: 'CLI, Apollo GraphQL, Node.js, React.js, MongoDB, Express.js',
    type: 'work',
  },
  {
    id: 'subisu-2017',
    title: 'Senior Technical Support Assistant',
    company: 'Subisu Cablenet Pvt Ltd',
    location: 'Baluwater, Kathmandu',
    duration: 'Jun 2017 - Apr 2019',
    startDate: '2017-06',
    endDate: '2019-04',
    description:
      'Provided technical support for network infrastructure and customer service. Recognized as Best Employee of the Month - Evening Shift in IP Engineering Department (Bhadra 2074). Helped clients troubleshoot network problems and maintained network infrastructure.',
    technologies: 'Computer Networking, Technical Support, Customer Service',
    type: 'work',
  },
]

// Education
export const education: Education[] = [
  {
    id: 'tu-2016',
    degree: 'Computer Science',
    institution: 'Tribhuwan University',
    location: 'Nepal',
    duration: '2016 - 2022',
    description:
      'Studied C programming, C++ programming, Java programming, SQL, advanced database, cryptography, data structures, algorithms, software engineering, and computer networks.',
    type: 'education',
  },
  {
    id: 'kanchanjunga-2014',
    degree: 'High School',
    institution: 'Kanchanjunga English High School',
    location: 'Nepal',
    duration: '2014 - 2015',
    description:
      'Studied Physics, Chemistry, Math, Biology, English, Nepali. Completed higher secondary education with focus on science subjects.',
    type: 'education',
  },
]

// Skills organized by category
export const skills: Record<string, Skill[]> = {
  'Programming Languages': [
    {
      name: 'C#',
      level: 85,
      category: 'Programming Languages',
      isPrimary: true,
    },
    {
      name: 'TypeScript',
      level: 90,
      category: 'Programming Languages',
      isPrimary: true,
    },
    {
      name: 'JavaScript',
      level: 95,
      category: 'Programming Languages',
      isPrimary: true,
    },
    {
      name: 'Rust',
      level: 75,
      category: 'Programming Languages',
      isPrimary: true,
    },
    {
      name: 'Python',
      level: 70,
      category: 'Programming Languages',
      isPrimary: true,
    },
    {
      name: 'Go',
      level: 65,
      category: 'Programming Languages',
      isPrimary: true,
    },
    { name: 'Bash', level: 60, category: 'Programming Languages' },
  ],
  'Frontend Technologies': [
    {
      name: 'React.js',
      level: 95,
      category: 'Frontend Technologies',
      isPrimary: true,
    },
    {
      name: 'Redux.js',
      level: 85,
      category: 'Frontend Technologies',
      isPrimary: true,
    },
    {
      name: 'HTML5',
      level: 95,
      category: 'Frontend Technologies',
      isPrimary: true,
    },
    { name: 'CSS3', level: 90, category: 'Frontend Technologies' },
    {
      name: 'Styled Components',
      level: 85,
      category: 'Frontend Technologies',
      isPrimary: true,
    },
    {
      name: 'Bootstrap',
      level: 80,
      category: 'Frontend Technologies',
      isPrimary: true,
    },
    { name: 'Webpack', level: 70, category: 'Frontend Technologies' },
    { name: 'Next.js', level: 75, category: 'Frontend Technologies' },
    { name: 'Material-UI', level: 80, category: 'Frontend Technologies' },
  ],
  'Backend & Cloud': [
    {
      name: '.NET Core',
      level: 85,
      category: 'Backend & Cloud',
      isPrimary: true,
    },
    {
      name: '.NET Framework',
      level: 80,
      category: 'Backend & Cloud',
      isPrimary: true,
    },
    {
      name: '.NET APIs',
      level: 85,
      category: 'Backend & Cloud',
      isPrimary: true,
    },
    {
      name: 'Node.js',
      level: 90,
      category: 'Backend & Cloud',
      isPrimary: true,
    },
    {
      name: 'Express.js',
      level: 85,
      category: 'Backend & Cloud',
      isPrimary: true,
    },
    { name: 'GraphQL', level: 85, category: 'Backend & Cloud' },
    { name: 'Cloud Storage', level: 70, category: 'Backend & Cloud' },
  ],
  Databases: [
    { name: 'Azure SQL', level: 80, category: 'Databases', isPrimary: true },
    { name: 'SQL', level: 85, category: 'Databases', isPrimary: true },
    { name: 'MongoDB', level: 80, category: 'Databases', isPrimary: true },
    { name: 'PostgreSQL', level: 70, category: 'Databases' },
  ],
  'Microsoft Technologies': [
    {
      name: 'SharePoint',
      level: 75,
      category: 'Microsoft Technologies',
      isPrimary: true,
    },
    {
      name: 'Azure SQL',
      level: 80,
      category: 'Microsoft Technologies',
      isPrimary: true,
    },
    {
      name: '.NET Core',
      level: 85,
      category: 'Microsoft Technologies',
      isPrimary: true,
    },
    {
      name: '.NET Framework',
      level: 80,
      category: 'Microsoft Technologies',
      isPrimary: true,
    },
  ],
  'Blockchain & Web3': [
    {
      name: 'Solana',
      level: 70,
      category: 'Blockchain & Web3',
      isPrimary: true,
    },
    { name: 'Rust', level: 75, category: 'Blockchain & Web3', isPrimary: true },
    {
      name: 'Anchor Framework',
      level: 70,
      category: 'Blockchain & Web3',
      isPrimary: true,
    },
    { name: 'Smart Contracts', level: 65, category: 'Blockchain & Web3' },
    { name: 'Ethereum', level: 60, category: 'Blockchain & Web3' },
    { name: 'CLI Development', level: 70, category: 'Blockchain & Web3' },
  ],
  'Tools & Others': [
    { name: 'Git', level: 85, category: 'Tools & Others' },
    { name: 'Webpack', level: 70, category: 'Tools & Others' },
    { name: 'npm', level: 80, category: 'Tools & Others' },
    { name: 'VS Code', level: 90, category: 'Tools & Others' },
    { name: 'Computer Networking', level: 75, category: 'Tools & Others' },
    { name: 'Technical Support', level: 85, category: 'Tools & Others' },
    { name: 'Customer Service', level: 80, category: 'Tools & Others' },
  ],
}

// Helper functions to get skills for the resume component (simplified view)
export const getSkillsForResume = (): Array<{
  name: string
  level: number
}> => {
  return [
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 90 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'React', level: 95 },
    { name: 'Node.js', level: 90 },
    { name: 'GraphQL', level: 85 },
    { name: 'Rust', level: 75 },
    { name: 'C#/.NET', level: 85 },
  ]
}

// Helper function to get simplified experience for resume component
export const getExperienceForResume = () => {
  return workExperience.map((exp) => ({
    year: exp.duration,
    title: exp.title,
    subtitle: exp.company,
    text: exp.description.split('.')[0], // First sentence only
  }))
}

// Helper function to get education for resume component
export const getEducationForResume = () => {
  return education.map((edu) => ({
    year: edu.duration,
    title: edu.degree,
    subtitle: edu.institution,
    text: edu.description.split('.')[0], // First sentence only
  }))
}
