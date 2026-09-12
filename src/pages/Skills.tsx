import { Layers } from 'lucide-react'
import { SkillsBoard } from '@/components/skills/SkillsBoard'
import { FadeIn } from '@/components/ui/Motion'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'

export function SkillsPage() {
  usePageMeta('Skills', 'Languages, frontend, backend, databases, cloud, computer vision, and hardware.')
  const { data } = usePortfolio()

  return (
    <div className="page-wash">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-accent" aria-hidden />
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              Skills
            </p>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Technical <span className="text-accent">Toolkit</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
            Grouped by layer — with clear proficiency labels instead of arbitrary percentages.
          </p>
        </FadeIn>
        <div className="mt-10">
          <SkillsBoard skills={data.skills} />
        </div>
      </div>
    </div>
  )
}
