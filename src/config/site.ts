import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Abhigyan Varma',
  shortName: 'AV',
  tagline: 'Building software that crosses the boundary between code and the real world.',
  role: 'Computer Science Engineer · Systems Builder',
  email: 'mozart.developerr@gmail.com',
  github: 'https://github.com/Abhigyan-hub/',
  linkedin: 'https://www.linkedin.com/in/abhigyan-varma-42686b32a/',
  resumeUrl: '',
  currentlyBuilding: 'Systems that connect software, vision, and hardware',
  currentlyLearning: 'Distributed systems & research methodology',
  currentFocus: 'Full-stack platforms, CV pipelines, and robotics',
  vercelAnalyticsUrl: 'https://vercel.com/dashboard',
  portfolioVersion: '1.0.0',
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/research', label: 'Research' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
] as const

export const STORAGE_KEY = 'portfolio-content-v1'
export const THEME_KEY = 'portfolio-theme'
