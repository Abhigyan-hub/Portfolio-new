import { Link } from 'react-router-dom'
import { ArrowUpRight, ImageOff } from 'lucide-react'
import type { Project } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(10,37,64,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_32px_rgba(10,37,64,0.08)]',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-elevated">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling
              if (fallback) fallback.classList.remove('hidden')
            }}
          />
        ) : null}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-bg-elevated to-surface',
            project.image ? 'hidden' : '',
          )}
        >
          <ImageOff className="text-text-muted" size={28} />
          <span className="text-xs font-medium text-text-muted">{project.category}</span>
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          {project.featured && <Badge>Featured</Badge>}
          <Badge className="bg-surface/90 text-text-muted">{project.status}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-text-muted">
              {project.year} · {project.category}
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-text">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </div>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-muted">
          {project.shortDescription}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs font-medium text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs font-medium text-text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
