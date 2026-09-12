import type { SkillCategory } from '@/types'

export type SkillLevel = 'Beginner' | 'Familiar' | 'Developing' | 'Strong'

export function proficiencyToLevel(proficiency: number): SkillLevel {
  if (proficiency >= 85) return 'Strong'
  if (proficiency >= 75) return 'Familiar'
  if (proficiency >= 65) return 'Developing'
  return 'Beginner'
}

/** Soft Stripe-style color tokens per category (works in light + dark). */
export const categoryTone: Record<
  SkillCategory,
  { pill: string; label: string; dot: string }
> = {
  Languages: {
    pill: 'border-amber-300/80 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200',
    label: 'text-amber-600/80 dark:text-amber-300/80',
    dot: 'bg-amber-500',
  },
  Frontend: {
    pill: 'border-blue-300/80 bg-blue-50 text-blue-800 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-200',
    label: 'text-blue-600/80 dark:text-blue-300/80',
    dot: 'bg-blue-500',
  },
  Backend: {
    pill: 'border-violet-300/80 bg-violet-50 text-violet-800 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200',
    label: 'text-violet-600/80 dark:text-violet-300/80',
    dot: 'bg-violet-500',
  },
  Databases: {
    pill: 'border-teal-300/80 bg-teal-50 text-teal-800 dark:border-teal-500/40 dark:bg-teal-500/10 dark:text-teal-200',
    label: 'text-teal-600/80 dark:text-teal-300/80',
    dot: 'bg-teal-500',
  },
  'Cloud / DevOps': {
    pill: 'border-sky-300/80 bg-sky-50 text-sky-800 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200',
    label: 'text-sky-600/80 dark:text-sky-300/80',
    dot: 'bg-sky-500',
  },
  'Computer Vision': {
    pill: 'border-fuchsia-300/80 bg-fuchsia-50 text-fuchsia-800 dark:border-fuchsia-500/40 dark:bg-fuchsia-500/10 dark:text-fuchsia-200',
    label: 'text-fuchsia-600/80 dark:text-fuchsia-300/80',
    dot: 'bg-fuchsia-500',
  },
  Hardware: {
    pill: 'border-cyan-300/80 bg-cyan-50 text-cyan-800 dark:border-cyan-500/40 dark:bg-cyan-500/10 dark:text-cyan-200',
    label: 'text-cyan-600/80 dark:text-cyan-300/80',
    dot: 'bg-cyan-500',
  },
}
