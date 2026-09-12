import type { SiteConfig } from '@/types'
import { SITE_ORIGIN } from '@/config/seo'

export const siteConfig: SiteConfig = {
  name: 'Abhigyan Varma',
  shortName: 'AV',
  tagline: 'Building software that crosses the boundary between code and the real world.',
  role: 'Software Developer · Backend & Full-Stack Engineer',
  email: 'mozart.developerr@gmail.com',
  github: 'https://github.com/Abhigyan-hub/',
  linkedin: 'https://www.linkedin.com/in/abhigyan-varma-42686b32a/',
  resumeUrl: '',
  currentlyBuilding: 'Backend systems, full-stack products, and scalable applications',
  currentlyLearning: 'Distributed systems & research methodology',
  currentFocus: 'Backend engineering, full-stack development, and systems design',
  vercelAnalyticsUrl: 'https://vercel.com/dashboard',
  portfolioVersion: '1.0.0',
  siteUrl: SITE_ORIGIN,
}

export const brandName = 'Mozart Dev'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/research', label: 'Research' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
] as const

export const STORAGE_KEY = 'portfolio-content-v2'
export const THEME_KEY = 'portfolio-theme'
