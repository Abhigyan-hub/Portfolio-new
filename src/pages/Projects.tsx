import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { FadeIn } from '@/components/ui/Motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ProjectsPage() {
  usePageMeta('Projects', 'Searchable project showcase across full-stack, vision, robotics, and research.')
  const { data } = usePortfolio()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Projects</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Built systems</h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          Filter by domain, search by stack, and open a case study for architecture, features, and
          next steps.
        </p>
      </FadeIn>
      <div className="mt-10">
        <ProjectGrid projects={data.projects} />
      </div>
    </div>
  )
}
