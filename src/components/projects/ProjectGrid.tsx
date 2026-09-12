import { useMemo, useState } from 'react'
import type { Project, ProjectCategory } from '@/types'
import { ProjectCard } from './ProjectCard'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const CATEGORIES: Array<ProjectCategory | 'All'> = [
  'All',
  'Full Stack',
  'Mobile',
  'Computer Vision',
  'Research',
  'Robotics',
  'IoT',
  'Hardware',
  'Systems',
]

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All')
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...projects]
      .sort((a, b) => a.order - b.order)
      .filter((p) => (category === 'All' ? true : p.category === category))
      .filter((p) => (featuredOnly ? p.featured : true))
      .filter((p) => {
        if (!q) return true
        return (
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
        )
      })
  }, [projects, query, category, featuredOnly])

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Input
            id="project-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tech, or description…"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProjectCategory | 'All')}
            aria-label="Filter by category"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <Button
          variant={featuredOnly ? 'primary' : 'secondary'}
          onClick={() => setFeaturedOnly((v) => !v)}
        >
          Featured
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <p className="text-base font-semibold text-accent">No matching projects</p>
          <p className="mt-2 text-sm text-text-muted">
            Try another search term or clear the category filter.
          </p>
          <Button
            className="mt-4"
            variant="secondary"
            onClick={() => {
              setQuery('')
              setCategory('All')
              setFeaturedOnly(false)
            }}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
