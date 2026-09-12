import type { Experience } from '@/types'

export const defaultExperience: Experience[] = [
  {
    id: 'exp-1',
    organization: 'AppDost IT Solutions',
    position: 'Full-Stack Developer',
    startDate: 'Feb 2026',
    endDate: 'May 2026',
    description:
      'Worked as a full-stack developer building and shipping web features across the frontend and backend, with a focus on clean interfaces, reliable APIs, and practical product delivery.',
    technologies: ['React', 'TypeScript', 'Python'],
    achievements: [
      'Built and iterated on full-stack product features with React and TypeScript',
      'Implemented and supported backend workflows in Python',
      'Collaborated on end-to-end delivery from UI through API integration',
    ],
    order: 1,
  },
]
