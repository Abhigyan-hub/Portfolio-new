import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/hero/Hero'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { FadeIn } from '@/components/ui/Motion'
import { Button } from '@/components/ui/Button'
import { usePortfolio } from '@/hooks/usePortfolio'
import { usePageMeta } from '@/hooks/usePageMeta'

export function HomePage() {
  usePageMeta('Home', 'Systems builder spanning software, computer vision, robotics, and research.')
  const { data } = usePortfolio()
  const featured = [...data.projects]
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 4)

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Selected work</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Featured systems</h2>
              <p className="mt-2 max-w-xl text-text-muted">
                Platforms, vision pipelines, research, and hardware — not just UI demos.
              </p>
            </div>
            <Link to="/projects" className="hidden sm:block">
              <Button variant="secondary">
                All projects <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {featured.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.05}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link to="/projects">
            <Button variant="secondary" className="w-full">
              All projects <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              title: 'Software & systems',
              body: 'React, React Native, FastAPI, databases, auth, and cloud deployment.',
            },
            {
              title: 'Vision & hardware',
              body: 'OpenCV, OCR, QR/barcode pipelines, drones, sensors, and embedded stacks.',
            },
            {
              title: 'Research mindset',
              body: 'Controlled experiments, algorithm analysis, and evidence over anecdotes.',
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <p className="font-mono text-xs text-accent">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
