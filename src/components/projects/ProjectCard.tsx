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
        'group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_0_1px_var(--accent)]',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-elevated">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.nextElementSibling
              if (fallback) fallback.classList.remove('hidden')
            }}
          />
        ) : null}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,var(--bg-elevated),var(--surface))]',
            project.image ? 'hidden' : '',
          )}
        >
          <ImageOff className="text-text-muted" size={28} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {project.category}
          </span>
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          {project.featured && <Badge>Featured</Badge>}
          <Badge className="bg-bg/80">{project.status}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] text-text-muted">
              {project.year} · {project.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-text group-hover:text-accent">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
          {project.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
