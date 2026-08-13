import type { Skill } from '@/types'

export const defaultSkills: Skill[] = [
  // Languages
  { id: 'lang-python', name: 'Python', category: 'Languages', proficiency: 90, priority: 1 },
  { id: 'lang-js', name: 'JavaScript', category: 'Languages', proficiency: 88, priority: 2 },
  { id: 'lang-ts', name: 'TypeScript', category: 'Languages', proficiency: 88, priority: 3 },
  { id: 'lang-cpp', name: 'C++', category: 'Languages', proficiency: 75, priority: 4 },
  { id: 'lang-c', name: 'C', category: 'Languages', proficiency: 72, priority: 5 },
  { id: 'lang-sql', name: 'SQL', category: 'Languages', proficiency: 85, priority: 6 },
  { id: 'lang-html', name: 'HTML', category: 'Languages', proficiency: 90, priority: 7 },
  { id: 'lang-css', name: 'CSS', category: 'Languages', proficiency: 88, priority: 8 },

  // Frontend
  { id: 'fe-react', name: 'React', category: 'Frontend', proficiency: 90, priority: 1 },
  { id: 'fe-rn', name: 'React Native', category: 'Frontend', proficiency: 85, priority: 2 },
  { id: 'fe-vite', name: 'Vite', category: 'Frontend', proficiency: 85, priority: 3 },
  { id: 'fe-tr', name: 'TanStack Router', category: 'Frontend', proficiency: 80, priority: 4 },
  { id: 'fe-tq', name: 'TanStack Query', category: 'Frontend', proficiency: 80, priority: 5 },
  { id: 'fe-tw', name: 'Tailwind CSS', category: 'Frontend', proficiency: 88, priority: 6 },
  { id: 'fe-shadcn', name: 'Shadcn UI', category: 'Frontend', proficiency: 78, priority: 7 },
  { id: 'fe-mantine', name: 'Mantine', category: 'Frontend', proficiency: 70, priority: 8 },

  // Backend
  { id: 'be-fastapi', name: 'FastAPI', category: 'Backend', proficiency: 88, priority: 1 },
  { id: 'be-node', name: 'Node.js', category: 'Backend', proficiency: 82, priority: 2 },
  { id: 'be-rest', name: 'REST APIs', category: 'Backend', proficiency: 90, priority: 3 },
  { id: 'be-jwt', name: 'JWT', category: 'Backend', proficiency: 85, priority: 4 },
  { id: 'be-rbac', name: 'Role-based authorization', category: 'Backend', proficiency: 85, priority: 5 },

  // Databases
  { id: 'db-pg', name: 'PostgreSQL', category: 'Databases', proficiency: 85, priority: 1 },
  { id: 'db-mysql', name: 'MySQL', category: 'Databases', proficiency: 78, priority: 2 },
  { id: 'db-sql', name: 'SQL', category: 'Databases', proficiency: 88, priority: 3 },
  { id: 'db-redis', name: 'Redis', category: 'Databases', proficiency: 75, priority: 4 },
  { id: 'db-rds', name: 'AWS RDS', category: 'Databases', proficiency: 80, priority: 5 },
  { id: 'db-dyn', name: 'DynamoDB', category: 'Databases', proficiency: 70, priority: 6 },

  // Cloud / DevOps
  { id: 'cloud-ec2', name: 'AWS EC2', category: 'Cloud / DevOps', proficiency: 80, priority: 1 },
  { id: 'cloud-rds', name: 'AWS RDS', category: 'Cloud / DevOps', proficiency: 80, priority: 2 },
  { id: 'cloud-vercel', name: 'Vercel', category: 'Cloud / DevOps', proficiency: 85, priority: 3 },
  { id: 'cloud-nginx', name: 'Nginx', category: 'Cloud / DevOps', proficiency: 78, priority: 4 },
  { id: 'cloud-git', name: 'Git', category: 'Cloud / DevOps', proficiency: 90, priority: 5 },
  { id: 'cloud-gh', name: 'GitHub', category: 'Cloud / DevOps', proficiency: 90, priority: 6 },

  // Computer Vision
  { id: 'cv-opencv', name: 'OpenCV', category: 'Computer Vision', proficiency: 85, priority: 1 },
  { id: 'cv-tess', name: 'Tesseract OCR', category: 'Computer Vision', proficiency: 82, priority: 2 },
  { id: 'cv-qr', name: 'QR recognition', category: 'Computer Vision', proficiency: 85, priority: 3 },
  { id: 'cv-bc', name: 'Barcode recognition', category: 'Computer Vision', proficiency: 80, priority: 4 },
  { id: 'cv-img', name: 'Image processing', category: 'Computer Vision', proficiency: 85, priority: 5 },

  // Hardware
  { id: 'hw-arduino', name: 'Arduino', category: 'Hardware', proficiency: 80, priority: 1 },
  { id: 'hw-esp', name: 'ESP8266', category: 'Hardware', proficiency: 75, priority: 2 },
  { id: 'hw-rpi', name: 'Raspberry Pi', category: 'Hardware', proficiency: 78, priority: 3 },
  { id: 'hw-pix', name: 'Pixhawk', category: 'Hardware', proficiency: 75, priority: 4 },
  { id: 'hw-apm', name: 'APM', category: 'Hardware', proficiency: 72, priority: 5 },
  { id: 'hw-lidar', name: 'LiDAR', category: 'Hardware', proficiency: 65, priority: 6 },
  { id: 'hw-ultra', name: 'Ultrasonic sensors', category: 'Hardware', proficiency: 78, priority: 7 },
  { id: 'hw-drone', name: 'Drone systems', category: 'Hardware', proficiency: 80, priority: 8 },
]
