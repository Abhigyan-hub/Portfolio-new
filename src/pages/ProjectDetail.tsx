import { Link, useParams } from 'react-router-dom'
import { ExternalLink, ArrowLeft, ImageOff } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/Motion'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const { data } = usePortfolio()
  const project = data.projects.find((p) => p.slug === slug)

  usePageMeta(
    project ? project.title : 'Project not found',
    project
      ? `Explore ${project.title}, a ${project.category.toLowerCase()} project by Abhigyan Varma. ${project.shortDescription}`
      : 'This project page could not be found on Mozart Dev.',
    {
      path: project ? `/projects/${project.slug}` : undefined,
      noIndex: !project,
      type: project ? 'article' : 'website',
    },
  )

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="text-sm text-accent">404 · project</p>
        <h1 className="mt-3 text-3xl font-semibold">Project not found</h1>
        <p className="mt-3 text-text-muted">
          This slug isn&apos;t in the portfolio data. It may have been renamed or removed.
        </p>
        <Link to="/projects" className="mt-8 inline-block">
          <Button>Back to projects</Button>
        </Link>
      </div>
    )
  }

  const sections = [
    { title: 'Overview', body: project.detailedDescription },
    { title: 'Problem', body: project.problem },
    { title: 'Solution', body: project.solution },
    { title: 'Architecture', body: project.architecture },
    { title: 'Results', body: project.results },
  ].filter((s) => s.body)

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <FadeIn>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge>{project.category}</Badge>
          <Badge>{project.status}</Badge>
          <Badge>{project.year}</Badge>
          {project.featured && <Badge>Featured</Badge>}
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-text-muted">{project.shortDescription}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Button variant="secondary">
                <GithubIcon size={16} /> GitHub
              </Button>
            </a>
          ) : null}
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              <Button>
                <ExternalLink size={16} /> Live demo
              </Button>
            </a>
          ) : null}
        </div>
      </FadeIn>

      <FadeIn className="mt-10 overflow-hidden rounded-lg border border-border bg-bg-elevated">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="aspect-[21/9] w-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.replaceWith(
                Object.assign(document.createElement('div'), {
                  className:
                    'flex aspect-[21/9] w-full flex-col items-center justify-center gap-2 text-text-muted',
                  innerHTML:
                    '<span class="text-xs">Image unavailable</span>',
                }),
              )
            }}
          />
        ) : (
          <div className="flex aspect-[21/9] flex-col items-center justify-center gap-2 text-text-muted">
            <ImageOff size={32} />
            <span className="text-xs">Preview coming soon</span>
          </div>
        )}
      </FadeIn>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-10">
          {sections.map((section) => (
            <FadeIn key={section.title}>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-text-muted">{section.body}</p>
            </FadeIn>
          ))}

          <FadeIn>
            <h2 className="text-2xl font-semibold">Features</h2>
            <ul className="mt-4 space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {project.challenges && project.challenges.length > 0 && (
            <FadeIn>
              <h2 className="text-2xl font-semibold">Challenges</h2>
              <ul className="mt-4 space-y-2">
                {project.challenges.map((c) => (
                  <li key={c} className="text-text-muted">
                    · {c}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}

          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <FadeIn>
              <h2 className="text-2xl font-semibold">Future improvements</h2>
              <ul className="mt-4 space-y-2">
                {project.futureImprovements.map((f) => (
                  <li key={f} className="text-text-muted">
                    · {f}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-border bg-surface p-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-semibold text-accent">Technologies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded border border-border px-2 py-1 text-[11px] text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </article>
  )
}
