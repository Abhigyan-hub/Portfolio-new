export type ProjectCategory =
  | 'Full Stack'
  | 'Mobile'
  | 'Computer Vision'
  | 'Research'
  | 'Robotics'
  | 'IoT'
  | 'Hardware'
  | 'Systems'

export type ProjectStatus = 'Completed' | 'In Progress' | 'Concept' | 'Research'

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  detailedDescription: string
  technologies: string[]
  category: ProjectCategory
  status: ProjectStatus
  year: number
  githubUrl?: string
  demoUrl?: string
  featured: boolean
  image?: string
  features: string[]
  problem?: string
  solution?: string
  architecture?: string
  challenges?: string[]
  results?: string
  futureImprovements?: string[]
  order: number
}

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Cloud / DevOps'
  | 'Computer Vision'
  | 'Hardware'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  proficiency: number
  priority: number
}

export interface Experience {
  id: string
  organization: string
  position: string
  startDate: string
  endDate: string
  description: string
  technologies: string[]
  achievements: string[]
  order: number
}

export interface ResearchMetric {
  label: string
  description: string
}

export interface ResearchEntry {
  id: string
  slug: string
  title: string
  objective: string
  problemStatement: string
  methodology: string
  experimentalSetup: string
  metrics: ResearchMetric[]
  findings: string[]
  conclusions: string
  futureWork: string[]
  year: number
  relatedProjectSlug?: string
}

export interface PortfolioData {
  version: string
  projects: Project[]
  skills: Skill[]
  experience: Experience[]
  research: ResearchEntry[]
}

export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  role: string
  email: string
  github: string
  linkedin: string
  resumeUrl: string
  currentlyBuilding: string
  currentlyLearning: string
  currentFocus: string
  vercelAnalyticsUrl: string
  portfolioVersion: string
}
