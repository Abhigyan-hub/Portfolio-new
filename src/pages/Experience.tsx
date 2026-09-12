import { FadeIn } from '@/components/ui/Motion'
import { Badge } from '@/components/ui/Badge'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ExperiencePage() {
  usePageMeta(
    'Experience',
    'Professional experience of Abhigyan Varma — software development roles, technologies, and contributions.',
  )
  const { data } = usePortfolio()
  const entries = [...data.experience].sort((a, b) => a.order - b.order)

  return (
    <div className="page-wash">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <p className="text-sm font-semibold text-accent">Experience</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Timeline</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
            Roles and contributions across software projects and product teams.
          </p>
        </FadeIn>

        {entries.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <p className="text-sm text-text-muted">Experience details will appear here soon.</p>
          </div>
        ) : (
          <ol className="relative mt-14 space-y-8 border-l border-border pl-8">
            {entries.map((entry, i) => (
              <FadeIn key={entry.id} delay={i * 0.05}>
                <li className="relative">
                  <span className="absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                  <article className="soft-panel rounded-2xl p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>
                        {entry.startDate} — {entry.endDate}
                      </Badge>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold">{entry.position}</h2>
                    <p className="mt-1 text-sm font-medium text-accent">{entry.organization}</p>
                    <p className="mt-4 text-sm leading-relaxed text-text-muted">{entry.description}</p>
                    {entry.achievements.length > 0 && (
                      <ul className="mt-4 space-y-1.5 text-sm text-text-muted">
                        {entry.achievements.map((a) => (
                          <li key={a}>· {a}</li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs font-medium text-text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              </FadeIn>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
