import { SkillsBoard } from '@/components/skills/SkillsBoard'
import { FadeIn } from '@/components/ui/Motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'

export function SkillsPage() {
  usePageMeta('Skills', 'Languages, frontend, backend, databases, cloud, computer vision, and hardware.')
  const { data } = usePortfolio()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Skills</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Stack across layers
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted">
          From languages and frontend to vision pipelines and hardware — organized by the systems
          they serve.
        </p>
      </FadeIn>
      <div className="mt-10">
        <SkillsBoard skills={data.skills} />
      </div>
    </div>
  )
}
