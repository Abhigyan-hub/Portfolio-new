import type { Experience } from '@/types'

/**
 * Placeholder experience entries — edit real organizations/titles in /control-room.
 * Do not invent employment claims here.
 */
export const defaultExperience: Experience[] = [
  {
    id: 'exp-1',
    organization: 'Add organization',
    position: 'Add role / title',
    startDate: 'YYYY-MM',
    endDate: 'Present',
    description:
      'Replace this placeholder with a real experience entry. Use the control room to edit organization, role, dates, technologies, and achievements.',
    technologies: ['React', 'TypeScript', 'Python'],
    achievements: [
      'Add a concrete achievement',
      'Add another measurable or technical contribution',
    ],
    order: 1,
  },
  {
    id: 'exp-2',
    organization: 'Add organization',
    position: 'Add role / title',
    startDate: 'YYYY-MM',
    endDate: 'YYYY-MM',
    description:
      'Second placeholder entry for timeline structure. Update or delete from the control room when real details are available.',
    technologies: ['FastAPI', 'PostgreSQL', 'AWS'],
    achievements: ['Add achievement details'],
    order: 2,
  },
]
