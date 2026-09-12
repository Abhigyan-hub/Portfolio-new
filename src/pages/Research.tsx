import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/Motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ResearchPage() {
  usePageMeta('Research', 'Research portfolio featuring A* vs GCCP pathfinding experiments.')
  const { data } = usePortfolio()
  const entries = [...data.research].sort((a, b) => b.year - a.year)

  return (
    <div className="page-wash">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <FadeIn>
        <p className="text-sm font-semibold text-accent">Research</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Experiments with evidence
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
          Methodology, metrics, and findings — presented clearly, not as marketing fluff.
        </p>
      </FadeIn>

      {entries.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <p className="text-sm text-accent">No research entries yet</p>
          <p className="mt-2 text-sm text-text-muted">Add entries from the control room.</p>
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          {entries.map((entry, i) => (
            <FadeIn key={entry.id} delay={i * 0.05}>
              <article className="overflow-hidden rounded-2xl border border-border bg-surface soft-panel">
                <div className="border-b border-border bg-bg-elevated px-6 py-5 sm:px-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{entry.year}</Badge>
                    <Badge>Research</Badge>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{entry.title}</h2>
                  <p className="mt-3 max-w-3xl text-text-muted">{entry.objective}</p>
                  {entry.relatedProjectSlug && (
                    <Link to={`/projects/${entry.relatedProjectSlug}`} className="mt-4 inline-block">
                      <Button variant="secondary" size="sm">
                        Related project
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-2">
                  <section>
                    <h3 className="text-sm font-semibold text-accent">
                      Problem statement
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {entry.problemStatement}
                    </p>
                  </section>
                  <section>
                    <h3 className="text-sm font-semibold text-accent">
                      Methodology
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {entry.methodology}
                    </p>
                  </section>
                  <section className="lg:col-span-2">
                    <h3 className="text-sm font-semibold text-accent">
                      Experimental setup
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {entry.experimentalSetup}
                    </p>
                  </section>
                </div>

                <div className="border-t border-border px-6 py-8 sm:px-8">
                  <h3 className="text-sm font-semibold text-accent">Metrics</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {entry.metrics.map((m) => (
                      <div key={m.label} className="rounded-md border border-border bg-bg p-4">
                        <p className="font-medium text-text">{m.label}</p>
                        <p className="mt-1 text-xs text-text-muted">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-8 border-t border-border px-6 py-8 sm:px-8 lg:grid-cols-2">
                  <section>
                    <h3 className="text-sm font-semibold text-accent">
                      Findings
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-text-muted">
                      {entry.findings.map((f) => (
                        <li key={f}>· {f}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-sm font-semibold text-accent">
                      Future work
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-text-muted">
                      {entry.futureWork.map((f) => (
                        <li key={f}>· {f}</li>
                      ))}
                    </ul>
                  </section>
                  <section className="lg:col-span-2">
                    <h3 className="text-sm font-semibold text-accent">
                      Conclusions
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {entry.conclusions}
                    </p>
                    <div className="mt-6 rounded-md border border-dashed border-border bg-bg p-6 text-center">
                      <p className="text-xs text-text-muted">
                        Graphs / numeric result figures — attach via control room when ready
                      </p>
                    </div>
                  </section>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}
