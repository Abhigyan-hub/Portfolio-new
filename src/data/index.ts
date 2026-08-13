import { defaultExperience } from './experience'
import { defaultProjects } from './projects'
import { defaultResearch } from './research'
import { defaultSkills } from './skills'
import { siteConfig } from '@/config/site'
import type { PortfolioData } from '@/types'

export const defaultPortfolioData: PortfolioData = {
  version: siteConfig.portfolioVersion,
  projects: defaultProjects,
  skills: defaultSkills,
  experience: defaultExperience,
  research: defaultResearch,
}

export * from './projects'
export * from './skills'
export * from './experience'
export * from './research'
